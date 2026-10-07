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

  it('renders as an anchor when href is provided', () => {
    const wrapper = mount(LuluButton, {
      props: { href: 'https://example.com', variant: 'primary' },
      attrs: { target: '_blank', rel: 'noopener noreferrer' },
      slots: { default: '文档' },
    })
    const link = wrapper.get('a')

    expect(link.attributes('href')).toBe('https://example.com')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('data-variant')).toBe('primary')
    expect(link.attributes('aria-disabled')).toBeUndefined()
    expect(link.text()).toBe('文档')
  })

  it('blocks navigation for disabled or loading links', () => {
    const wrapper = mount(LuluButton, {
      props: { href: 'https://example.com', disabled: true },
    })
    const link = wrapper.get('a')

    // 禁用链接移除 href 并暴露 aria-disabled，点击时组件会阻止跳转
    expect(link.attributes('href')).toBeUndefined()
    expect(link.attributes('aria-disabled')).toBe('true')

    const loading = mount(LuluButton, {
      props: { href: 'https://example.com', loading: true },
    })
    expect(loading.get('a').attributes('aria-busy')).toBe('true')
    expect(loading.get('a').attributes('href')).toBeUndefined()
  })
})
