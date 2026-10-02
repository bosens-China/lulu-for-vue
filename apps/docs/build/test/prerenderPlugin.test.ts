import { describe, expect, it } from 'vitest'
import { assertInternalLinks, renderLlmsText } from '../prerenderPlugin'

describe('文档死链检查', () => {
  const pages = [
    { html: '<a href="/guide/#install">安装</a>', path: '/' },
    { html: '<h2 id="install">安装</h2><a href="../">首页</a>', path: '/guide/' },
  ]

  it('校验站内路由和锚点，并忽略外链与资源', () => {
    expect(() => assertInternalLinks(pages)).not.toThrow()
    expect(() => assertInternalLinks([
      ...pages,
      { html: '<a href="https://example.com">外链</a><a href="/logo.svg">资源</a>', path: '/assets/' },
    ])).not.toThrow()
    expect(() => assertInternalLinks([
      ...pages,
      { html: '<a href="/guide/#missing">错误锚点</a>', path: '/broken/' },
    ])).toThrow('/guide/#missing')
  })

  it('按站点基路径生成 Markdown 导航', () => {
    const output = renderLlmsText([{
      description: '安装组件库。',
      markdown: '# 安装',
      path: '/guide/installation/',
      title: '安装',
    }], '/lulu-for-vue/')

    expect(output).toContain('- [安装]')
    expect(output).toContain('(/lulu-for-vue/guide/installation/index.md)')
  })
})
