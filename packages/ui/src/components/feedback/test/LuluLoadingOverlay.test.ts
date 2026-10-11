import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluLoadingOverlay from '../LuluLoadingOverlay.vue'

describe('LuluLoadingOverlay', () => {
  it('自定义装饰内容时仍保留 message 辅助名称', () => {
    const wrapper = mount(LuluLoadingOverlay, {
      props: { open: true, message: '保存中' },
      slots: { default: '<i aria-hidden="true">★</i>' },
    })
    expect(wrapper.get('[role="status"]').attributes('aria-label')).toBe('保存中')
  })
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
