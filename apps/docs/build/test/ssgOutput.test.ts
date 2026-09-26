import { access, readFile, readdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const docsDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const outputDirectory = resolve(docsDirectory, 'dist')

describe('文档 SSG 产物', () => {
  it('把根路径和全部组件页输出为完整静态 HTML', async () => {
    const rootHtml = await readFile(resolve(outputDirectory, 'index.html'), 'utf8')
    const componentFiles = await readdir(resolve(outputDirectory, 'components'), { recursive: true })
    const componentPages = componentFiles.filter((file) => file.endsWith('index.html'))

    expect(componentPages).toHaveLength(36)
    expect(rootHtml).toContain('<html lang="zh-CN">')
    expect(rootHtml).toContain('<title>LuLu UI Vue - 简洁、可靠的 Vue 3 组件库</title>')
    expect(rootHtml).toContain('浏览全部组件')
    expect(rootHtml).not.toContain('<aside')
    expect(rootHtml).not.toContain('<!--app-html-->')
    const cssFile = rootHtml.match(/href="\/assets\/([^" ]+\.css)"/)?.[1]
    expect(cssFile).toBeTruthy()
    const css = await readFile(resolve(outputDirectory, 'assets', cssFile!), 'utf8')
    expect(css).toMatch(/\.flex\{display:flex\}/)
    const guideHtml = await readFile(resolve(outputDirectory, 'guide/quick-start/index.html'), 'utf8')
    expect(guideHtml).toContain('快速开始')
    expect(guideHtml).toContain('class="token tag"')
    await expect(access(resolve(outputDirectory, '.vite'))).rejects.toThrow()
  })

  it('输出可安全 hydration 的 Autocomplete 页面', async () => {
    const html = await readFile(
      resolve(outputDirectory, 'components/autocomplete/index.html'),
      'utf8',
    )

    expect(html).toContain('placeholder="输入城市"')
    expect(html).toContain('输入内容后可用键盘或鼠标选择候选项。')
    expect(html).not.toContain('<!--app-html-->')
    expect(html).not.toContain('<!--teleport start-->')
  })
})
