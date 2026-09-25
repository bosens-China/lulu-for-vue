import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LuluMessageHost from '../LuluMessageHost.vue'
import { type MessageHandle, useMessage } from '../useMessage'

const VariantConsumer = defineComponent({
  setup() {
    const message = useMessage()

    return () => h('button', {
      type: 'button',
      onClick: () => {
        message.success('Saved', { duration: 0 })
        message.error('Failed', { duration: 0 })
        message.info('Updated', { duration: 0 })
        message.warning('Check this', { duration: 0 })
      },
    }, 'Show messages')
  },
})

const TimedConsumer = defineComponent({
  setup() {
    const message = useMessage()

    return () => h('button', {
      type: 'button',
      onClick: () => message.info('Temporary', { duration: 300 }),
    }, 'Show timed message')
  },
})

const HandleConsumer = defineComponent({
  setup() {
    const message = useMessage()
    let handle: MessageHandle | undefined

    return () => h('button', {
      type: 'button',
      onClick: () => {
        if (handle) {
          handle.close()
          handle = undefined
          return
        }

        handle = message.info('Closable', { duration: 0 })
      },
    }, 'Toggle handled message')
  },
})

afterEach(() => {
  vi.useRealTimers()
})

describe('LuluMessageHost and useMessage', () => {
  it('provides typed message actions and removes a manually closed message', async () => {
    const wrapper = mount(LuluMessageHost, {
      slots: {
        default: () => h(VariantConsumer),
      },
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.findAll('.lulu-message')).toHaveLength(4)
    expect(wrapper.get('.lulu-message--success').text()).toContain('Saved')
    expect(wrapper.get('.lulu-message--error').text()).toContain('Failed')
    expect(wrapper.get('.lulu-message--info').text()).toContain('Updated')
    expect(wrapper.get('.lulu-message--warning').text()).toContain('Check this')

    await wrapper.get('.lulu-message--success [aria-label="Close message"]').trigger('click')

    expect(wrapper.findAll('.lulu-message')).toHaveLength(3)
  })

  it('removes messages automatically after their requested duration', async () => {
    vi.useFakeTimers()
    const wrapper = mount(LuluMessageHost, {
      slots: {
        default: () => h(TimedConsumer),
      },
    })

    await wrapper.get('button').trigger('click')
    expect(wrapper.find('.lulu-message').exists()).toBe(true)

    vi.advanceTimersByTime(300)
    await nextTick()

    expect(wrapper.find('.lulu-message').exists()).toBe(false)
  })

  it('returns a handle that can close its message', async () => {
    const wrapper = mount(LuluMessageHost, {
      slots: {
        default: () => h(HandleConsumer),
      },
    })

    await wrapper.get('button').trigger('click')
    expect(wrapper.get('.lulu-message').text()).toContain('Closable')

    await wrapper.get('button').trigger('click')
    expect(wrapper.find('.lulu-message').exists()).toBe(false)
  })
})
