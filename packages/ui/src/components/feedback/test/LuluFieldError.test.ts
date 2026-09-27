import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluFieldError from '../LuluFieldError.vue'

describe('LuluFieldError', () => {
  it('renders a supplied message as an inline alert', async () => {
    const wrapper = mount(LuluFieldError, {
      props: {
        message: 'Email is required',
      },
    })

    expect(wrapper.get('[role="alert"]').text()).toBe('Email is required')

    await wrapper.setProps({ message: '' })

    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('renders the default slot before the message fallback', () => {
    const wrapper = mount(LuluFieldError, {
      props: { message: 'Fallback message' },
      slots: { default: '<strong>Custom error</strong>' },
    })

    expect(wrapper.get('[role="alert"]').text()).toBe('Custom error')
    expect(wrapper.find('strong').exists()).toBe(true)
  })
})
