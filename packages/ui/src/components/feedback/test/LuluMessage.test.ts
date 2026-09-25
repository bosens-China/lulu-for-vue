import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LuluMessage from '../LuluMessage.vue'

afterEach(() => {
  vi.useRealTimers()
})

describe('LuluMessage', () => {
  it('uses an assertive alert for errors and supports manual close', async () => {
    const wrapper = mount(LuluMessage, {
      props: {
        duration: 0,
        message: 'Save failed',
        type: 'error',
      },
    })

    expect(wrapper.get('[role="alert"]').text()).toContain('Save failed')

    await wrapper.get('[aria-label="Close message"]').trigger('click')

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
})
