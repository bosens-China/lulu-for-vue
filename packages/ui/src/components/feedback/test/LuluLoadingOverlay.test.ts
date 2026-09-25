import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluLoadingOverlay from '../LuluLoadingOverlay.vue'

describe('LuluLoadingOverlay', () => {
  it('renders an accessible loading status only while open', async () => {
    const wrapper = mount(LuluLoadingOverlay, {
      props: {
        open: true,
        message: 'Saving changes',
      },
    })

    expect(wrapper.get('.lulu-loading-overlay').attributes('aria-busy')).toBe('true')
    expect(wrapper.get('[role="status"]').text()).toContain('Saving changes')

    await wrapper.setProps({ open: false })

    expect(wrapper.find('.lulu-loading-overlay').exists()).toBe(false)
  })
})
