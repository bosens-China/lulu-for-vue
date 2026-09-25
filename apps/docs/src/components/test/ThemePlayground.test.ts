import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ThemePlayground from '../ThemePlayground.vue'

describe('ThemePlayground', () => {
  afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('重新打开恢复明暗配色与编辑模式，重置只影响当前模式', async () => {
    let wrapper = mount(ThemePlayground)
    await wrapper.get('input[aria-label="主题强调色"]').setValue('#123456')
    await wrapper.get('.theme-playground__modes button:nth-child(2)').trigger('click')
    await wrapper.get('input[aria-label="主题强调色"]').setValue('#abcdef')
    wrapper.unmount()
    wrapper = mount(ThemePlayground)
    await wrapper.vm.$nextTick()
    expect(wrapper.get('.theme-playground__preview').attributes('data-lulu-theme')).toBe('dark')
    expect(wrapper.get('#theme-css').text()).toContain('#123456')
    expect(wrapper.get('#theme-css').text()).toContain('#abcdef')
    await wrapper.get('.theme-playground__reset').trigger('click')
    expect(wrapper.get('#theme-css').text()).toContain('#123456')
    expect(wrapper.get('#theme-css').text()).not.toContain('#abcdef')
    wrapper.unmount()
  })

  it('忽略损坏的颜色并在存储不可用时继续预览', async () => {
    localStorage.setItem('lulu-docs-palette-v1', JSON.stringify({ light: { primary: 'url(unsafe)', text: '#123456' } }))
    const wrapper = mount(ThemePlayground)
    await wrapper.vm.$nextTick()
    expect(wrapper.get('#theme-css').text()).not.toContain('unsafe')
    expect(wrapper.get('#theme-css').text()).toContain('#123456')
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    await wrapper.get('input[aria-label="主题强调色"]').setValue('#654321')
    expect(wrapper.get('#theme-css').text()).toContain('#654321')
    expect(wrapper.text()).toContain('无法保存配色')
    wrapper.unmount()
  })
  it('按主题独立调色，预览与导出使用同一组变量', async () => {
    const wrapper = mount(ThemePlayground)
    const picker = wrapper.get('input[aria-label="主题强调色"]')

    await picker.setValue('#a12bc3')

    expect(wrapper.get('.theme-playground__preview').attributes('style')).toContain('--lulu-color-primary: #a12bc3')
    expect(wrapper.get('.theme-playground__preview').attributes('style')).toContain('--lulu-color-primary-solid: #a12bc3')
    expect(wrapper.get('#theme-css').text()).toContain('--lulu-color-primary: #a12bc3')
    expect(wrapper.get('#theme-css').text()).toContain('@media (prefers-color-scheme: dark)')
    expect(wrapper.get('#theme-css').text()).toContain(':root:where(:not([data-lulu-theme]))')

    await wrapper.get('.theme-playground__modes button:nth-child(2)').trigger('click')
    expect(wrapper.get('.theme-playground__preview').attributes('data-lulu-theme')).toBe('dark')
    expect((wrapper.get('input[aria-label="主题强调色"]').element as HTMLInputElement).value).toBe('#38bdf8')
    await wrapper.get('input[aria-label="主题强调色"]').setValue('#7139c2')
    expect(wrapper.get('#theme-css').text()).toMatch(/@media \(prefers-color-scheme: dark\)[\s\S]*--lulu-color-primary: #7139c2/)

    await wrapper.get('.theme-playground__modes button:nth-child(1)').trigger('click')
    expect((wrapper.get('input[aria-label="主题强调色"]').element as HTMLInputElement).value).toBe('#a12bc3')

    await wrapper.get('.theme-playground__reset').trigger('click')
    expect((wrapper.get('input[aria-label="主题强调色"]').element as HTMLInputElement).value).toBe('#2a80eb')
  })
})
