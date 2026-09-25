import { access } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { container } from '@mdit/plugin-container'
import type { MarkdownItContainerOptions } from '@mdit/plugin-container'
import Prism from 'prismjs'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-markup'
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
        const grammarName = { vue: 'markup', html: 'markup', ts: 'typescript', js: 'javascript' }[language] ?? language
        const grammar = Prism.languages[grammarName]
        return grammar ? Prism.highlight(code, grammar, grammarName) : ''
      }
      const compatibleContainer = container as unknown as MarkdownExitPlugin<MarkdownItContainerOptions>
      markdown.use(compatibleContainer, demoContainerOptions)
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
