import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluDisclosure from '../LuluDisclosure.vue'

describe('LuluDisclosure', () => {
  it('renders semantic details and supports summary and default slots', () => {
    const wrapper = mount(LuluDisclosure, {
      props: {
        open: false,
        title: 'Account information',
      },
      slots: {
        default: 'Account content',
        summary: 'Account summary',
      },
    })

    expect(wrapper.get('details').element).toBeInstanceOf(HTMLDetailsElement)
    expect(wrapper.get('summary').text()).toBe('Account summary')
    expect(wrapper.get('.lulu-disclosure__content').text()).toBe('Account content')
  })

  it('reflects v-model:open changes and emits native toggle state', async () => {
    const wrapper = mount(LuluDisclosure, {
      props: {
        open: false,
        title: 'Account information',
      },
    })
    const details = wrapper.get('details')

    await wrapper.setProps({ open: true })

    expect((details.element as HTMLDetailsElement).open).toBe(true)

    ;(details.element as HTMLDetailsElement).open = false
    await details.trigger('toggle')

    expect(wrapper.emitted('update:open')).toContainEqual([false])
  })
})
