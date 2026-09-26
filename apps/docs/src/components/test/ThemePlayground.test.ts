import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ThemePlayground from '../ThemePlayground.vue'

const storageKey = 'lulu-docs-primary-v1'
const properties = ['--docs-primary-hue', '--docs-primary-saturation', '--docs-primary-lightness-light', '--docs-primary-lightness-dark']

describe('ThemePlayground', () => {
  afterEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-docs-primary')
    for (const property of properties) document.documentElement.style.removeProperty(property)
    vi.restoreAllMocks()
  })

  it('选择主色后立即应用到整个页面，并为明暗模式保存不同明度', async () => {
    let wrapper = mount(ThemePlayground)
    await wrapper.get('input[aria-label="主色调"]').setValue('#f0d000')

    const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}') as Record<string, number | string>
    expect(document.documentElement.hasAttribute('data-docs-primary')).toBe(true)
    expect(document.documentElement.style.getPropertyValue('--docs-primary-hue')).toBe(String(saved.hue))
    expect(saved.hex).toBe('#f0d000')
    expect(saved.lightnessLight).toBeLessThan(saved.lightnessDark as number)
    expect(saved.lightnessLight).toBeLessThan(30)
    expect(saved.lightnessDark).toBeGreaterThanOrEqual(65)

    wrapper.unmount()
    wrapper = mount(ThemePlayground)
    await wrapper.vm.$nextTick()
    expect((wrapper.get('input[aria-label="主色调"]').element as HTMLInputElement).value).toBe('#f0d000')
    await wrapper.get('button').trigger('click')
    expect(document.documentElement.hasAttribute('data-docs-primary')).toBe(false)
    expect(localStorage.getItem(storageKey)).toBeNull()
    wrapper.unmount()
  })

  it('忽略损坏的存储内容，存储不可用时仍立即更新主色', async () => {
    localStorage.setItem(storageKey, JSON.stringify({ hex: 'url(unsafe)' }))
    const wrapper = mount(ThemePlayground)
    expect(document.documentElement.hasAttribute('data-docs-primary')).toBe(false)

    vi.spyOn(localStorage, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    await wrapper.get('input[aria-label="主色调"]').setValue('#808080')
    expect(document.documentElement.style.getPropertyValue('--docs-primary-saturation')).toBe('0%')
    expect(wrapper.text()).toContain('无法保存主色')
    wrapper.unmount()
  })
})
