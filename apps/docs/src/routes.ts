import { createDocsRoutes, createGuideRoutes, parseDocumentPath, parseGuidePath } from './content'
import type { MarkdownPageModule } from './content'
import type { DocsPage } from './types'
import { withoutBase } from './siteUrl'

const documentMetadata = import.meta.glob<Omit<MarkdownPageModule, 'default'>>([
  '../../../packages/ui/src/components/**/readme/README.md',
], { eager: true, query: '?docs-meta', import: 'default' })
const documentModules = import.meta.glob<MarkdownPageModule>([
  '../../../packages/ui/src/components/**/readme/README.md',
])
const guideMetadata = import.meta.glob<Omit<MarkdownPageModule, 'default'>>('./guides/*.md', {
  eager: true, query: '?docs-meta', import: 'default',
})
const guideModules = import.meta.glob<MarkdownPageModule>('./guides/*.md')

function metadataModules(metadata: Record<string, Omit<MarkdownPageModule, 'default'>>) {
  return Object.fromEntries(Object.entries(metadata).map(([path, data]) => [path, { ...data, default: null }]))
}

const pages = createDocsRoutes(metadataModules(documentMetadata))
export const guideRoutes = createGuideRoutes(metadataModules(guideMetadata))
const pageLoaders = new Map<string, () => Promise<MarkdownPageModule>>([
  ['/', () => import('./components/HomePage.vue')],
  ...Object.entries(documentModules).map(([source, load]) => [`/components/${parseDocumentPath(source)}/`, load] as const),
  ...Object.entries(guideModules).map(([source, load]) => [`/guide/${parseGuidePath(source)}/`, load] as const),
])

export async function loadPage(url: string): Promise<DocsPage> {
  const page = resolvePage(url)
  const load = pageLoaders.get(page.path)
  return load ? { ...page, component: (await load()).default } : page
}

const homePage: DocsPage = {
  path: '/',
  title: 'LuLu UI Vue - 简洁、可靠的 Vue 3 组件库',
  description: 'LuLu UI Vue 是一个简洁、可靠、类型友好的 Vue 3 组件库。',
  heading: 'LuLu UI Vue',
  component: null,
  seo: {
    description: null,
    image: null,
    keywords: ['Vue 3', 'Vue 组件库', 'LuLu UI'],
    title: null,
  },
  sourcePath: null,
  statusCode: 200,
}

export function normalizePath(url: string): string {
  const pathname = withoutBase(new URL(url, 'https://docs.local').pathname)
  return pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`
}

export const docsRoutes: readonly DocsPage[] = pages

export function resolvePage(url: string): DocsPage {
  const path = normalizePath(url)
  const directMatch = [...pages, ...guideRoutes].find((page) => page.path === path)

  if (directMatch) {
    return directMatch
  }

  if (path === '/') {
    return homePage
  }

  return {
    path,
    title: '页面不存在 - LuLu UI Vue',
    description: '请求的文档页面不存在。',
    heading: '页面不存在',
    component: null,
    seo: { description: null, image: null, keywords: [], title: null },
    sourcePath: null,
    statusCode: 404,
  }
}
