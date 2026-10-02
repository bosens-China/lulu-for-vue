import { access } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { container } from '@mdit/plugin-container'
import type { MarkdownItContainerOptions } from '@mdit/plugin-container'
import Prism from '../src/prism.ts'
import type { MarkdownEnv, MarkdownExit, Options } from 'unplugin-vue-markdown/types'

interface DemoReference {
  componentName: string
  fileName: string
  id: string
  sourceName: string
}

const demosByDocument = new Map<string, DemoReference[]>()
const demoIdPattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/
type MarkdownExitPlugin<T> = (markdown: MarkdownExit, options?: T) => void
type CalloutType = 'note' | 'tip' | 'important' | 'info' | 'warning' | 'danger' | 'details'

const calloutTitles: Record<CalloutType, string> = {
  danger: '危险',
  details: '详情',
  important: '重要',
  info: '信息',
  note: '注意',
  tip: '提示',
  warning: '警告',
}

export function wrapCodeBlock(html: string): string {
  return `<div class="docs-code-block"><button type="button" class="docs-code-copy" data-docs-copy data-copy-text="复制代码" data-copied-text="已复制" aria-label="复制代码" aria-live="polite">复制代码</button>${html}</div>`
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function renderCalloutOpen(type: CalloutType, info: string): string {
  const title = escapeHtml(info.trim().slice(type.length).trim() || calloutTitles[type])

  return type === 'details'
    ? `<details class="docs-callout docs-callout--details"><summary>${title}</summary>`
    : `<aside class="docs-callout docs-callout--${type}"><p class="docs-callout__title">${title}</p>`
}

export function createHeadingId(text: string, duplicateIndex = 0): string {
  const stem = text.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section'
  return duplicateIndex === 0 ? stem : `${stem}-${duplicateIndex + 1}`
}

function createCalloutOptions(type: CalloutType): MarkdownItContainerOptions {
  return {
    name: type,
    validate: params => params.trim().split(/\s+/, 1)[0] === type,
    openRender: (tokens, index) => renderCalloutOpen(type, tokens[index]?.info ?? ''),
    closeRender: () => type === 'details' ? '</details>' : '</aside>',
  }
}

export function parseDemoId(info: string, documentId: string): string {
  const [name, id, ...rest] = info.trim().split(/\s+/)

  if (name !== 'demo' || !id || rest.length > 0 || !demoIdPattern.test(id)) {
    throw new Error(`[docs] ${documentId}: Demo 必须使用“::: demo kebab-case-id”格式。`)
  }

  return id
}

export function toDemoFileName(id: string): string {
  const name = id
    .split('-')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('')

  return `${name}Demo.vue`
}

function getDocumentDemos(documentId: string): DemoReference[] {
  const demos = demosByDocument.get(documentId)

  if (!demos) {
    throw new Error(`[docs] ${documentId}: Demo 编译状态尚未初始化。`)
  }

  return demos
}

const demoContainerOptions: MarkdownItContainerOptions = {
  name: 'demo',
  validate: (params) => params.trim().split(/\s+/, 1)[0] === 'demo',
  openRender(tokens, index, _options, env) {
    const documentId = (env as MarkdownEnv).id
    const id = parseDemoId(tokens[index]?.info ?? '', documentId)
    const demos = getDocumentDemos(documentId)

    if (demos.some((demo) => demo.id === id)) {
      throw new Error(`[docs] ${documentId}: Demo “${id}”被重复引用。`)
    }

    const demoIndex = demos.length
    const reference = {
      componentName: `DocsDemo${demoIndex}`,
      fileName: toDemoFileName(id),
      id,
      sourceName: `docsDemoSource${demoIndex}`,
    }
    demos.push(reference)
    return [
      `<DemoBlock :source="${reference.sourceName}"`,
      ' source-label="查看源码"',
      ' copy-label="复制源码"',
      ' copied-label="已复制">',
      '<template #description>',
    ].join('')
  },
  closeRender(_tokens, _index, _options, env) {
    const documentId = (env as MarkdownEnv).id
    const reference = getDocumentDemos(documentId).at(-1)

    if (!reference) {
      throw new Error(`[docs] ${documentId}: Demo 容器缺少开始标记。`)
    }

    return `</template><${reference.componentName} /></DemoBlock>`
  },
}

async function createDemoImports(documentId: string): Promise<string[]> {
  const demos = getDocumentDemos(documentId)
  const documentPath = documentId.split('?', 1)[0] ?? documentId

  await Promise.all(demos.map(async (demo) => {
    const demoPath = resolve(dirname(documentPath), '..', 'demos', demo.fileName)

    try {
      await access(demoPath)
    } catch {
      throw new Error(`[docs] ${documentId}: Demo “${demo.id}”不存在，期望文件为 ${demoPath}。`)
    }
  }))

  return demos.flatMap((demo) => {
    const importPath = `../demos/${demo.fileName}`

    return [
      `import ${demo.componentName} from ${JSON.stringify(importPath)}`,
      `import ${demo.sourceName} from ${JSON.stringify(`${importPath}?raw`)}`,
    ]
  })
}

export function createMarkdownOptions(): Options {
  return {
    headEnabled: false,
    wrapperDiv: false,
    markdownSetup(markdown) {
      markdown.options.highlight = (code, language) => {
        const grammarName = { html: 'markup', ts: 'typescript', js: 'javascript' }[language] ?? language
        const grammar = Prism.languages[grammarName]
        return grammar ? Prism.highlight(code, grammar, grammarName) : ''
      }
      const fence = markdown.renderer.rules.fence
      if (fence) {
        markdown.renderer.rules.fence = (tokens, index, options, env, self) => {
          const rendered = fence(tokens, index, options, env, self)
          return typeof rendered === 'string' ? wrapCodeBlock(rendered) : rendered.then(wrapCodeBlock)
        }
      }
      const headingOpen = markdown.renderer.rules.heading_open
      markdown.renderer.rules.heading_open = (tokens, index, options, env, self) => {
        const headingEnv = env as MarkdownEnv & { docsHeadingIds?: Map<string, number> }
        const title = tokens[index + 1]?.content ?? ''
        const stem = createHeadingId(title)
        const duplicateIndex = headingEnv.docsHeadingIds?.get(stem) ?? 0
        headingEnv.docsHeadingIds ??= new Map()
        headingEnv.docsHeadingIds.set(stem, duplicateIndex + 1)
        tokens[index]?.attrSet('id', createHeadingId(title, duplicateIndex))
        return headingOpen
          ? headingOpen(tokens, index, options, env, self)
          : self.renderToken(tokens, index, options)
      }
      const compatibleContainer = container as unknown as MarkdownExitPlugin<MarkdownItContainerOptions>
      markdown.use(compatibleContainer, demoContainerOptions)
      for (const type of Object.keys(calloutTitles) as CalloutType[]) {
        markdown.use(compatibleContainer, createCalloutOptions(type))
      }
    },
    transforms: {
      before(code, id) {
        demosByDocument.set(id, [])
        return code
      },
      async extraScripts(_frontmatter, id) {
        try {
          return await createDemoImports(id)
        } finally {
          demosByDocument.delete(id)
        }
      },
    },
  }
}
