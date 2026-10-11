import { readFile } from 'node:fs/promises'
import Markdown from 'unplugin-vue-markdown/vite'
import type { Plugin } from 'vite'

const prefix = '\0docs-metadata:'

export function pageMetadataPlugin(): Plugin {
  return {
    name: 'lulu-docs-page-metadata',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!source.endsWith('?docs-meta')) return
      const resolved = await this.resolve(source.slice(0, -10), importer, { skipSelf: true })
      if (resolved) return `${prefix}${resolved.id}.js`
    },
    async load(id) {
      if (!id.startsWith(prefix)) return
      const file = id.slice(prefix.length, -3)
      this.addWatchFile(file)
      return readFile(file, 'utf8')
    },
    handleHotUpdate({ file, modules, server }) {
      const metadata = server.moduleGraph.getModuleById(`${prefix}${file.replaceAll('\\', '/')}.js`)
      if (metadata) return [...modules, metadata]
    },
    async transform(source, id) {
      if (!id.startsWith(prefix)) return
      let metadata: Record<string, unknown> = {}
      // 复用文档编译器的 YAML 解析，只编译头部，避免导航元数据引入 Demo。
      const compiler = Markdown({
        headEnabled: false,
        frontmatterPreprocess(frontmatter) {
          metadata = frontmatter
          return { frontmatter, head: {} }
        },
      })
      const transform = compiler.transform
      const handler = typeof transform === 'function' ? transform : transform?.handler
      if (!handler) throw new Error('[docs] Markdown 编译器缺少 transform。')
      const frontmatter = source.trimStart().match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/)?.[0] ?? ''
      await handler.call(this, frontmatter, id.slice(prefix.length, -3))
      return { code: `export default ${JSON.stringify(metadata)}`, map: null }
    },
  }
}
