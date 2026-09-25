import { nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createDocsApp } from '../createApp'
import { render } from '../entry-server'

async function flushNavigation(): Promise<void> {
  await nextTick()
  await nextTick()
}

describe('文档客户端导航', () => {
  afterEach(() => {
    document.head.innerHTML = ''
    document.body.innerHTML = ''
    window.history.replaceState(null, '', '/')
    vi.restoreAllMocks()
  })

  it('从首页无刷新进入组件文档，再通过品牌标识返回首页', async () => {
    const result = await render('/')
    document.head.innerHTML = result.headHtml
    document.body.innerHTML = `<div id="app">${result.appHtml}</div>`
    window.history.replaceState(null, '', '/')
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
    const { app } = createDocsApp('/')

    app.mount('#app')

    const header = document.querySelector('header')
    const componentLink = [...document.querySelectorAll<HTMLAnchorElement>('a')]
      .find((item) => item.textContent?.includes('浏览全部组件'))

    componentLink?.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0, cancelable: true }))
    await flushNavigation()

    expect(window.location.pathname).toBe('/components/button/')
    expect(document.querySelector('aside')).not.toBeNull()
    expect(document.querySelector('h1')?.textContent).toBe('Button 按钮')
    expect(document.querySelector('header')).toBe(header)

    document.querySelector<HTMLAnchorElement>('a[aria-label="LuLu UI Vue 首页"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0, cancelable: true }))
    await flushNavigation()

    expect(window.location.pathname).toBe('/')
    expect(document.querySelector('aside')).toBeNull()
    expect(document.querySelector('h1')?.textContent).toContain('简洁、可靠的')
    expect(document.querySelector('header')).toBe(header)

    app.unmount()
  })

  it('无刷新切换页面并保持站点壳', async () => {
    const initialPath = '/components/button/'
    const result = await render(initialPath)
    document.head.innerHTML = result.headHtml
    document.body.innerHTML = `<div id="app">${result.appHtml}</div>`
    window.history.replaceState(null, '', initialPath)
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
    const { app } = createDocsApp(initialPath)

    app.mount('#app')

    const header = document.querySelector('header')
    const sidebar = document.querySelector('aside')
    const link = [...document.querySelectorAll<HTMLAnchorElement>('aside a')]
      .find((item) => item.pathname === '/components/autocomplete/')
    const click = new MouseEvent('click', { bubbles: true, button: 0, cancelable: true })

    link?.dispatchEvent(click)
    await flushNavigation()

    expect(click.defaultPrevented).toBe(true)
    expect(window.location.pathname).toBe('/components/autocomplete/')
    expect(document.querySelector('.docs-content h2')?.textContent).toBe('基础用法')
    expect(document.querySelector('.lulu-autocomplete')).not.toBeNull()
    expect(document.querySelector('header')).toBe(header)
    expect(document.querySelector('aside')).toBe(sidebar)
    expect(link?.getAttribute('aria-current')).toBe('page')
    expect(document.title).toBe('Vue Autocomplete 自动完成组件')
    expect(document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content)
      .toBe('LuLu UI Vue 自动完成组件的中文用法、属性与示例。')
    expect(document.head.querySelector('meta[property="og:image"]')).toBeNull()
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 })

    app.unmount()
  })

  it('响应浏览器前进后退并恢复页面 head', async () => {
    const initialPath = '/components/autocomplete/'
    const result = await render(initialPath)
    document.head.innerHTML = result.headHtml
    document.body.innerHTML = `<div id="app">${result.appHtml}</div>`
    window.history.replaceState(null, '', initialPath)
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
    const { app } = createDocsApp(initialPath)

    app.mount('#app')
    window.history.replaceState(null, '', '/components/button/')
    window.dispatchEvent(new PopStateEvent('popstate'))
    await flushNavigation()

    expect(document.querySelector('h1')?.textContent).toBe('Button 按钮')
    expect(document.title).toBe('Vue Button 按钮组件 - LuLu UI Vue')
    expect(document.head.querySelector('meta[property="og:image"]')).toBeNull()

    app.unmount()
  })
})
