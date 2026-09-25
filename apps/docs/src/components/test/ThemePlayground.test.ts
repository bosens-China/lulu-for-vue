import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ThemePlayground from '../ThemePlayground.vue'

describe('ThemePlayground', () => {
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
