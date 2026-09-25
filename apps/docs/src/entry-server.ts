import { renderToString } from 'vue/server-renderer'
import { createDocsApp } from './createApp'
import { docsRoutes, guideRoutes } from './routes'
import type { RenderResult } from './types'
import { absolutePageUrl } from './siteUrl'

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

export const routes = ['/', ...guideRoutes.map(page => page.path), ...docsRoutes.map(page => page.path)]

export async function render(url: string): Promise<RenderResult> {
  const { app, page } = createDocsApp(url)
  const context: { modules?: Set<string> } = {}
  const appHtml = await renderToString(app, context)
  const canonical = absolutePageUrl(page.path)
  const headHtml = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}">`,
    page.seo.keywords.length > 0
      ? `<meta name="keywords" content="${escapeHtml(page.seo.keywords.join(', '))}">`
      : '',
    `<meta property="og:title" content="${escapeHtml(page.title)}">`,
    `<meta property="og:description" content="${escapeHtml(page.description)}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="LuLu UI Vue">',
    '<meta property="og:locale" content="zh_CN">',
    canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}">` : '',
    canonical ? `<meta property="og:url" content="${escapeHtml(canonical)}">` : '',
    page.seo.image ? `<meta property="og:image" content="${escapeHtml(page.seo.image)}">` : '',
  ].filter(Boolean).join('\n')

  return {
    appHtml,
    headHtml,
    locale: 'zh-CN',
    modules: context.modules ?? new Set<string>(),
    statusCode: page.statusCode,
  }
}
