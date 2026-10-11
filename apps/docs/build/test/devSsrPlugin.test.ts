// @vitest-environment node
import { resolve } from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createServer } from 'vite'
import type { ViteDevServer } from 'vite'

describe('开发 SSR 的首屏样式', () => {
  let server: ViteDevServer
  let origin: string

  beforeAll(async () => {
    const root = resolve(import.meta.dirname, '../..')
    server = await createServer({
      root,
      configFile: resolve(root, 'vite.config.ts'),
      base: '/ssg-check/',
      server: { host: '127.0.0.1', port: 0 },
    })
    await server.listen()
    origin = server.resolvedUrls!.local[0]!
  }, 30_000)

  afterAll(async () => { await server?.close() })

  it.each(['', 'components/button/'])('无需执行 JS 即可加载 %s 的布局和组件样式', async (path) => {
    const response = await fetch(new URL(path, origin), { headers: { Accept: 'text/html' } })
    expect(response.status).toBe(200)
    const html = await response.text()
    const head = html.slice(0, html.indexOf('</head>'))
    const links = [...head.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)]
    expect(links.map(match => match[1])).toEqual([
      '/ssg-check/__uno.css?direct', '/ssg-check/src/dev.css?direct',
    ])
    const styles = await Promise.all(links.map(async ([, href]) => {
      const css = await fetch(new URL(href!, origin))
      expect(css.status).toBe(200)
      expect(css.headers.get('content-type')).toContain('text/css')
      return css.text()
    }))
    expect(styles[0]).toMatch(/\.flex\s*\{\s*display:\s*flex/)
    expect(styles[1]).toContain('.lulu-button')
    expect(styles[1]).toContain('.docs-site')
    expect(styles[1]).not.toContain('__vite__updateStyle')
    expect(html).toContain(path ? 'Button 按钮' : '浏览全部组件')
  }, 30_000)

  it('导航元数据保留 SEO 字段，且不包含组件或 Demo 导入', async () => {
    const source = '../../../packages/ui/src/components/action/button/readme/README.md?docs-meta'
    const id = await server.environments.client.pluginContainer.resolveId(source, resolve(server.config.root, 'src/routes.ts'))
    const result = await server.transformRequest(id!.id)
    expect(result?.code).toContain('Vue Button 按钮组件 - LuLu UI Vue')
    expect(result?.code).not.toContain('import ')
    expect(result?.code).not.toContain('Demo.vue')
  })
})
