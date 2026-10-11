import { flushPromises, mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import DocsSearch from '../DocsSearch.vue'

it('Enter 选择结果时阻止默认激活，避免焦点归还后再次打开搜索', async () => {
  const wrapper = mount(DocsSearch, { attachTo: document.body })
  try {
    await wrapper.get('button').trigger('click')
    const input = document.querySelector<HTMLInputElement>('#docs-search-input')!
    expect(document.activeElement).toBe(input)
    input.value = 'DatePicker'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await wrapper.vm.$nextTick()
    await vi.waitFor(() => {
      expect(document.querySelector('#docs-search-results a')).not.toBeNull()
    })
    // 保留真实关闭行为，仅阻止测试环境跳转页面。
    document.querySelector('#docs-search-results a')?.addEventListener('click', event => event.preventDefault())
    const enter = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
    input.dispatchEvent(enter)
    await wrapper.vm.$nextTick()
    expect(enter.defaultPrevented).toBe(true)
    expect(document.querySelector('#docs-search-input')).toBeNull()
  } finally {
    wrapper.unmount()
  }
})

it('可以搜索正文和代码块内容', async () => {
  const wrapper = mount(DocsSearch, { attachTo: document.body })
  try {
    await wrapper.get('button').trigger('click')
    await vi.dynamicImportSettled()
    await flushPromises()
    const input = document.querySelector<HTMLInputElement>('#docs-search-input')!

    input.value = 'peer dependency'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await vi.waitFor(() => {
      expect(document.querySelector('#docs-search-results')?.textContent).toContain('安装')
    })

    input.value = 'const name = ref'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await vi.waitFor(() => {
      expect(document.querySelector('#docs-search-results')?.textContent).toContain('快速开始')
    })

    input.value = 'const selected = ref<string[]>'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await vi.waitFor(() => {
      expect(document.querySelector('#docs-search-results')?.textContent).toContain('Select 选择器')
    })
  } finally {
    wrapper.unmount()
  }
})

it('方向键导航会让选中结果滚入可见区域', async () => {
  const wrapper = mount(DocsSearch, { attachTo: document.body })
  const scroll = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {})
  try {
    await wrapper.get('button').trigger('click')
    const input = document.querySelector<HTMLInputElement>('#docs-search-input')!
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    await flushPromises()
    expect(document.querySelector('#docs-search-results a[aria-current="true"]')?.textContent).toContain('快速开始')
    expect(scroll).toHaveBeenCalledWith({ block: 'nearest' })
  } finally {
    wrapper.unmount()
    scroll.mockRestore()
  }
})
