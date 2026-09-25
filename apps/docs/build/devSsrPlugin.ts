import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import type { RenderResult } from '../src/types.ts'

interface ServerEntry {
  render(url: string): Promise<RenderResult>
}

export function docsDevSsrPlugin(): Plugin {
  return {
    name: 'lulu-docs-dev-ssr',
    apply: 'serve',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (request, response, next) => {
          if (request.method !== 'GET' || !request.headers.accept?.includes('text/html')) {
            next()
            return
          }

          const url = request.originalUrl ?? request.url ?? '/'

          try {
            const rawTemplate = await readFile(resolve(server.config.root, 'index.html'), 'utf8')
            const template = await server.transformIndexHtml(url, rawTemplate)
            const entry = await server.ssrLoadModule('/src/entry-server.ts') as ServerEntry
            const result = await entry.render(url)
            const html = template
              .replace('<html lang="en">', `<html lang="${result.locale}">`)
              .replace('<!--app-head-->', result.headHtml)
              .replace('<!--app-html-->', result.appHtml)

            response.statusCode = result.statusCode
            response.setHeader('Content-Type', 'text/html; charset=utf-8')
            response.end(html)
          } catch (error: unknown) {
            if (error instanceof Error) {
              server.ssrFixStacktrace(error)
            }
            next(error)
          }
        })
      }
    },
  }
}
