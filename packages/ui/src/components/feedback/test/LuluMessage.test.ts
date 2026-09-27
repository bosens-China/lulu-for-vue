import { mount } from '@vue/test-utils'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LuluMessage from '../LuluMessage.vue'

afterEach(() => {
  vi.useRealTimers()
})

describe('LuluMessage', () => {
  it('uses an assertive alert for errors and supports manual close', async () => {
    const wrapper = mount(LuluMessage, {
      props: {
        closeLabel: 'Dismiss failure',
        duration: 0,
        message: 'Save failed',
        type: 'error',
      },
    })

    expect(wrapper.get('[role="alert"]').text()).toContain('Save failed')

    await wrapper.get('[aria-label="Dismiss failure"]').trigger('click')

    expect(wrapper.emitted('close')).toEqual([[]])
  })

  it('emits close after its duration', () => {
    vi.useFakeTimers()
    const wrapper = mount(LuluMessage, {
      props: {
        duration: 500,
        message: 'Saved',
      },
    })

    vi.advanceTimersByTime(500)

    expect(wrapper.emitted('close')).toEqual([[]])
  })

  it('uses a localizable default close label', () => {
    const wrapper = mount(LuluMessage, {
      props: { duration: 0, message: 'Saved' },
    })

    expect(wrapper.get('[aria-label="关闭消息"]').attributes('type')).toBe('button')
  })

  it('does not start an auto-close timer during SSR', async () => {
    vi.useFakeTimers()
    const timer = vi.spyOn(globalThis, 'setTimeout')

    await renderToString(createSSRApp(LuluMessage, { duration: 123_456, message: 'Saved' }))

    expect(timer).not.toHaveBeenCalledWith(expect.any(Function), 123_456)
  })
})
