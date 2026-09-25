import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DocsSearch from '../DocsSearch.vue'

it('Enter 选择结果时阻止默认激活，避免焦点归还后再次打开搜索', async () => {
  const wrapper = mount(DocsSearch, { attachTo: document.body })
  try {
    await wrapper.get('button').trigger('click')
    const input = document.querySelector<HTMLInputElement>('#docs-search-input')!
    input.value = 'DateRange'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await wrapper.vm.$nextTick()
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
