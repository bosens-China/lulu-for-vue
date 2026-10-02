import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { Plugin, ResolvedConfig } from 'vite'
import type { RenderResult } from '../src/types.ts'

type SsrManifest = Record<string, string[]>

interface ServerBundle {
  markdownPages: readonly MarkdownOutputPage[]
  routes: readonly string[]
  render(url: string): Promise<RenderResult>
}

interface MarkdownOutputPage {
  description: string
  markdown: string
  path: string
  title: string
}

export interface PrerenderedPage {
  html: string
  path: string
}

function normalizeRoute(path: string) {
  const route = `/${path.replace(/^\/+|\/+$/g, '')}`
  return route === '/' ? route : `${route}/`
}

function getIds(html: string) {
  return new Set([...html.matchAll(/\sid=(['"])(.*?)\1/g)].map(match => match[2]))
}

export function assertInternalLinks(pages: readonly PrerenderedPage[], base = '/') {
  const origin = 'https://docs.local'
  const routeIds = new Map(pages.map(page => [normalizeRoute(page.path), getIds(page.html)]))
  const failures: string[] = []

  for (const page of pages) {
    for (const match of page.html.matchAll(/\shref=(['"])(.*?)\1/g)) {
      const href = match[2]?.replaceAll('&amp;', '&') ?? ''
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) continue

      const url = new URL(href, `${origin}${normalizeRoute(page.path)}`)
      let pathname = url.pathname
      if (base !== '/' && pathname.startsWith(base)) pathname = `/${pathname.slice(base.length)}`
      if (/\.[^/]+$/.test(pathname)) continue

      const route = normalizeRoute(pathname)
      const ids = routeIds.get(route)
      const hash = url.hash ? decodeURIComponent(url.hash.slice(1)) : ''
      if (!ids || (hash && !ids.has(hash))) failures.push(`${page.path}: ${href}`)
    }
  }

  if (failures.length > 0) {
    throw new Error(`[docs] 检测到站内死链：\n${failures.join('\n')}`)
  }
}

export function renderLlmsText(
  pages: readonly MarkdownOutputPage[],
  base = '/',
  siteUrl?: string,
) {
  const link = (path: string) => {
    const markdownPath = `${path.replace(/^\//, '')}index.md`
    return siteUrl
      ? new URL(markdownPath, siteUrl.replace(/\/?$/, '/')).href
      : `${base}${markdownPath}`
  }
  const section = (title: string, entries: readonly MarkdownOutputPage[]) => [
    `## ${title}`,
    '',
    ...entries.map(page => `- [${page.title}](${link(page.path)}): ${page.description}`),
  ].join('\n')

  return [
    '# LuLu UI Vue',
    '',
    '> 简洁、可靠、类型友好的 Vue 3 组件库。',
    '',
    section('指南', pages.filter(page => page.path.startsWith('/guide/'))),
    '',
    section('组件', pages.filter(page => page.path.startsWith('/components/'))),
    '',
  ].join('\n')
}

function renderAssetLinks(modules: Set<string>, manifest: SsrManifest): string {
  const files = new Set([...modules].flatMap((moduleId) => manifest[moduleId] ?? []))

  return [...files].map((file) => {
    if (file.endsWith('.css')) {
      return `<link rel="stylesheet" href="/${file}">`
    }

    if (file.endsWith('.js')) {
      return `<link rel="modulepreload" href="/${file}">`
    }

    return ''
  }).filter(Boolean).join('\n')
}

export function prerenderPlugin(): Plugin {
  let base = '/'

  return {
    name: 'lulu-docs-prerender',
    apply: 'build',
    configResolved(config: ResolvedConfig) {
      base = config.base
    },
    async closeBundle() {
      const root = process.cwd()
      const clientDirectory = resolve(root, 'dist')
      const serverEntryUrl = pathToFileURL(
        resolve(root, 'node_modules/.cache/lulu-docs-server/entry-server.js'),
      ).href
      const [template, manifestSource, serverBundle] = await Promise.all([
        readFile(resolve(clientDirectory, 'index.html'), 'utf8'),
        readFile(resolve(clientDirectory, '.vite/ssr-manifest.json'), 'utf8'),
        import(serverEntryUrl) as Promise<ServerBundle>,
      ])
      const manifest = JSON.parse(manifestSource) as SsrManifest

      const pages = await Promise.all([...serverBundle.routes, '/404/'].map(async (path) => {
        const result = await serverBundle.render(path)
        const assetLinks = renderAssetLinks(result.modules, manifest)
        const html = template
          .replace('<html lang="en">', `<html lang="${result.locale}">`)
          .replace('<!--app-head-->', [result.headHtml, assetLinks].filter(Boolean).join('\n'))
          .replace('<!--app-html-->', result.appHtml)

        return { html, path }
      }))

      assertInternalLinks(pages, base)

      await Promise.all(pages.map(async ({ html, path }) => {
        if (path === '/404/') {
          await writeFile(resolve(clientDirectory, '404.html'), html)
          return
        }
        const outputDirectory = resolve(clientDirectory, path.slice(1))

        await mkdir(outputDirectory, { recursive: true })
        await writeFile(resolve(outputDirectory, 'index.html'), html)
      }))

      const siteUrl = process.env.VITE_SITE_URL
      await Promise.all(serverBundle.markdownPages.map(async (page) => {
        const outputDirectory = resolve(clientDirectory, page.path.slice(1))
        await mkdir(outputDirectory, { recursive: true })
        await writeFile(resolve(outputDirectory, 'index.md'), page.markdown)
      }))
      await writeFile(
        resolve(clientDirectory, 'llms.txt'),
        renderLlmsText(serverBundle.markdownPages, base, siteUrl),
      )

      if (siteUrl) {
        const base = siteUrl.replace(/\/?$/, '/')
        const sitemap = serverBundle.routes
          .map(path => `<url><loc>${new URL(path.slice(1), base).href}</loc></url>`)
          .join('')
        await writeFile(resolve(clientDirectory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`)
        await writeFile(resolve(clientDirectory, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', base).href}\n`)
      }
      await writeFile(resolve(clientDirectory, '.nojekyll'), '')

      await rm(resolve(clientDirectory, '.vite'), { force: true, recursive: true })
    },
  }
}
