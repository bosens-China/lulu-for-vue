import { createDocsRoutes, createGuideRoutes } from './content'
import type { MarkdownPageModule } from './content'
import HomePage from './components/HomePage.vue'
import type { DocsPage } from './types'
import { withoutBase } from './siteUrl'

const documentModules = import.meta.glob<MarkdownPageModule>([
  '../../../packages/ui/src/components/**/readme/README.md',
], { eager: true })

const pages = createDocsRoutes(documentModules)
const guideModules = import.meta.glob<MarkdownPageModule>('./guides/*.md', { eager: true })
export const guideRoutes = createGuideRoutes(guideModules)

const homePage: DocsPage = {
  path: '/',
  title: 'LuLu UI Vue - 简洁、可靠的 Vue 3 组件库',
  description: 'LuLu UI Vue 是一个简洁、可靠、类型友好的 Vue 3 组件库。',
  heading: 'LuLu UI Vue',
  component: HomePage,
  seo: {
    description: null,
    image: null,
    keywords: ['Vue 3', 'Vue 组件库', 'LuLu UI'],
    title: null,
  },
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
    statusCode: 404,
  }
}
