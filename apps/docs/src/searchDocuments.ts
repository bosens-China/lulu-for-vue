import { parseDocumentPath, parseGuidePath } from './content'

export interface MarkdownDocument {
  markdown: string
  path: string
  searchText: string
}

const componentSources = import.meta.glob<string>([
  '../../../packages/ui/src/components/**/readme/README.md',
], { eager: true, import: 'default', query: '?raw' })
const guideSources = import.meta.glob<string>('./guides/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})
const demoSources = import.meta.glob<string>([
  '../../../packages/ui/src/components/**/demos/*.vue',
], { eager: true, import: 'default', query: '?raw' })
const demoSearchTextByPath = new Map<string, string>()

for (const [sourcePath, source] of Object.entries(demoSources)) {
  const slug = sourcePath.replaceAll('\\', '/').match(/\/components\/(?:[^/]+\/)*([^/]+)\/demos\/[^/]+\.vue$/)?.[1]
  if (!slug) throw new Error(`[docs] 无法从 Demo 路径生成搜索索引：${sourcePath}`)
  const path = `/components/${slug}/`
  demoSearchTextByPath.set(path, `${demoSearchTextByPath.get(path) ?? ''}\n${source}`.toLocaleLowerCase())
}

function createDocument(path: string, markdown: string): MarkdownDocument {
  return {
    markdown,
    path,
    searchText: `${markdown.toLocaleLowerCase()}\n${demoSearchTextByPath.get(path) ?? ''}`,
  }
}

export const markdownDocuments: readonly MarkdownDocument[] = [
  ...Object.entries(componentSources).map(([sourcePath, markdown]) =>
    createDocument(`/components/${parseDocumentPath(sourcePath)}/`, markdown)),
  ...Object.entries(guideSources).map(([sourcePath, markdown]) =>
    createDocument(`/guide/${parseGuidePath(sourcePath)}/`, markdown)),
].sort((left, right) => left.path.localeCompare(right.path))
