import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import DocsOutline from '../DocsOutline.vue'

describe('DocsOutline 页内目录组件', () => {
  let contentEl: HTMLDivElement

  beforeEach(() => {
    contentEl = document.createElement('div')
    contentEl.className = 'docs-content'
    contentEl.innerHTML = `
      <h2>基础用法</h2>
      <p>这是正文内容</p>
      <h3>按钮类型</h3>
      <p>更多说明</p>
      <h2>API 参考</h2>
    `
    document.body.appendChild(contentEl)
  })

  afterEach(() => {
    contentEl.remove()
    document.body.innerHTML = ''
  })

  it('能自动提取页面 h2 和 h3 标题并正确生成目录链接', async () => {
    const wrapper = mount(DocsOutline, {
      props: { currentPath: '/components/button/' },
      attachTo: document.body,
    })

    await nextTick()
    await nextTick()

    const links = wrapper.findAll('nav a')
    expect(links.length).toBe(3)
    expect(links[0]?.text()).toBe('基础用法')
    expect(links[1]?.text()).toBe('按钮类型')
    expect(links[2]?.text()).toBe('API 参考')

    expect(links[0]?.attributes('href')).toBe('#基础用法')
    expect(links[1]?.attributes('href')).toBe('#按钮类型')

    wrapper.unmount()
  })

  it('点击目录项支持高亮与滚动', async () => {
    const wrapper = mount(DocsOutline, {
      props: { currentPath: '/components/button/' },
      attachTo: document.body,
    })

    await nextTick()
    await nextTick()

    const links = wrapper.findAll('nav a')
    const secondLink = links[1]
    expect(secondLink).toBeDefined()

    await secondLink?.trigger('click')
    await nextTick()

    // 验证点击后添加 active 高亮类
    expect(secondLink?.classes()).toContain('text-[var(--lulu-color-primary)]')

    wrapper.unmount()
  })

  it('页面无 h2/h3 时不渲染目录', async () => {
    contentEl.innerHTML = '<p>没有标题的内容</p>'
    const wrapper = mount(DocsOutline, {
      props: { currentPath: '/components/empty/' },
      attachTo: document.body,
    })

    await nextTick()
    expect(wrapper.find('aside').exists()).toBe(false)
    wrapper.unmount()
  })
})
