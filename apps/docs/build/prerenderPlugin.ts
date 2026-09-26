import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { Plugin } from 'vite'
import type { RenderResult } from '../src/types.ts'

type SsrManifest = Record<string, string[]>

interface ServerBundle {
  routes: readonly string[]
  render(url: string): Promise<RenderResult>
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
  return {
    name: 'lulu-docs-prerender',
    apply: 'build',
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

      await Promise.all([...serverBundle.routes, '/404/'].map(async (path) => {
        const result = await serverBundle.render(path)
        const assetLinks = renderAssetLinks(result.modules, manifest)
        const html = template
          .replace('<html lang="en">', `<html lang="${result.locale}">`)
          .replace('<!--app-head-->', [result.headHtml, assetLinks].filter(Boolean).join('\n'))
          .replace('<!--app-html-->', result.appHtml)
        if (path === '/404/') {
          await writeFile(resolve(clientDirectory, '404.html'), html)
          return
        }
        const outputDirectory = resolve(clientDirectory, path.slice(1))

        await mkdir(outputDirectory, { recursive: true })
        await writeFile(resolve(outputDirectory, 'index.html'), html)
      }))

      const siteUrl = process.env.VITE_SITE_URL
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
