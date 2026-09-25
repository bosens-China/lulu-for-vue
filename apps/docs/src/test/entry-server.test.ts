import { nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { createDocsApp } from '../createApp'
import { render, routes } from '../entry-server'

describe('文档 SSR', () => {
  it('为根路径输出独立品牌首页', async () => {
    const result = await render('/')

    expect(result.statusCode).toBe(200)
    expect(result.appHtml).toContain('简洁、可靠的')
    expect(result.appHtml).toContain('浏览全部组件')
    expect(result.appHtml).not.toContain('<aside')
    expect(result.headHtml).toContain('<title>LuLu UI Vue - 简洁、可靠的 Vue 3 组件库</title>')
  })

  it('输出可直接阅读的中文页面和 head 信息', async () => {
    const result = await render('/components/button/')

    expect(result.statusCode).toBe(200)
    expect(result.appHtml).toContain('Button 按钮')
    expect(result.appHtml).toContain('按钮用于触发即时操作。')
    expect(result.appHtml).toContain('主要按钮')
    expect(result.appHtml).toContain('LuluButton')
    expect(result.appHtml).toContain('输入与选择')
    expect(result.appHtml).toContain('日期与时间')
    expect(result.appHtml).toContain('表单与校验')
    expect(result.appHtml.indexOf('Button 按钮')).toBeLessThan(result.appHtml.indexOf('Input 输入框'))
    expect(result.headHtml).toContain('<title>Vue Button 按钮组件 - LuLu UI Vue</title>')
    expect(result.headHtml).toContain('content="LuLu UI Vue Button 按钮组件的类型、状态、表单语义与使用示例。"')
    expect(result.headHtml).toContain('name="keywords"')
    expect(result.headHtml).toContain('property="og:type"')
    expect(routes).toContain('/')
  })

  it('在服务端 HTML 上完成客户端 hydration', async () => {
    const path = '/components/button/'
    const result = await render(path)
    document.body.innerHTML = `<div id="app">${result.appHtml}</div>`

    const { app } = createDocsApp(path)
    app.mount('#app')

    expect(document.querySelector('h1')?.textContent).toBe('Button 按钮')
    expect(document.querySelector('.docs-content .lulu-button')?.textContent?.trim()).toBe('默认按钮')

    app.unmount()
  })

  it('Autocomplete 在 hydration 后启用 Teleport 且不产生 mismatch', async () => {
    const path = '/components/autocomplete/'
    const result = await render(path)
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    document.body.innerHTML = `<div id="app">${result.appHtml}</div>`

    const { app } = createDocsApp(path)
    let hydrationMessages: string | undefined

    try {
      app.mount('#app')
      await nextTick()

      const input = document.querySelector<HTMLInputElement>('.lulu-autocomplete')

      input?.dispatchEvent(new FocusEvent('focus'))
      await nextTick()

      expect(document.body.querySelector('[role="listbox"]')?.textContent).toContain('北京')
      hydrationMessages = [...consoleError.mock.calls, ...consoleWarn.mock.calls].flat().join(' ')
    } finally {
      app.unmount()
      consoleError.mockRestore()
      consoleWarn.mockRestore()
    }

    expect(hydrationMessages?.toLocaleLowerCase()).not.toContain('hydration')
  })
})
