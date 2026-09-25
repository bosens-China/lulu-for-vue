import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from '../useTheme'

describe('文档主题', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-lulu-theme')
    document.documentElement.classList.remove('dark')
    localStorage.clear()
    vi.unstubAllGlobals()
  })

  it('默认跟随系统变化，手动选择后保持显式主题', async () => {
    let onChange: ((event: MediaQueryListEvent) => void) | undefined
    const removeEventListener = vi.fn()
    const media = {
      matches: false,
      addEventListener: vi.fn((_name: string, listener: (event: MediaQueryListEvent) => void) => {
        onChange = listener
      }),
      removeEventListener,
    } as unknown as MediaQueryList
    vi.stubGlobal('matchMedia', () => media)

    const wrapper = mount({
      setup: useTheme,
      template: '<button @click="toggleTheme">{{ isDark }}</button>',
    })

    expect(document.documentElement.hasAttribute('data-lulu-theme')).toBe(false)
    onChange?.({ matches: true } as MediaQueryListEvent)
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    await wrapper.get('button').trigger('click')
    expect(document.documentElement.dataset.luluTheme).toBe('light')
    expect(localStorage.getItem('lulu-theme-mode')).toBe('light')
    onChange?.({ matches: true } as MediaQueryListEvent)
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    wrapper.unmount()
    expect(removeEventListener).toHaveBeenCalledOnce()
  })
})
