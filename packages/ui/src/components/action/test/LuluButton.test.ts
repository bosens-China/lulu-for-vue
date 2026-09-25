import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import LuluButton from '../LuluButton.vue'

describe('LuluButton', () => {
  it('keeps native button semantics while exposing a loading state', async () => {
    const onClick = vi.fn()
    const wrapper = mount(LuluButton, {
      attrs: { onClick },
      props: {
        nativeType: 'submit',
        variant: 'primary',
      },
      slots: { default: 'Save' },
    })

    await wrapper.get('button').trigger('click')

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(wrapper.get('button').attributes('type')).toBe('submit')
    expect(wrapper.get('button').attributes('data-variant')).toBe('primary')
    expect(wrapper.text()).toBe('Save')
  })

  it('disables native interaction while loading', () => {
    const wrapper = mount(LuluButton, {
      props: { loading: true },
    })

    expect(wrapper.get('button').attributes('disabled')).toBeDefined()
    expect(wrapper.get('button').attributes('aria-busy')).toBe('true')
    expect(wrapper.get('.lulu-button__loading').attributes('aria-hidden')).toBe('true')
  })

  it('keeps the Edge filled default and offers its plain variant', () => {
    expect(mount(LuluButton).get('button').attributes('data-variant')).toBe('default')
    expect(mount(LuluButton, { props: { variant: 'normal' } }).get('button').attributes('data-variant')).toBe('normal')
  })
})
