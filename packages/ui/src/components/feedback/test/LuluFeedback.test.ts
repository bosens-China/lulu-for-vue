import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluLoading from '../LuluLoading.vue'
import LuluProgress from '../LuluProgress.vue'

describe('LuluLoading', () => {
  it('announces a configurable loading status', () => {
    const wrapper = mount(LuluLoading, {
      props: {
        block: true,
        label: 'Saving',
        size: 'lg',
      },
    })

    expect(wrapper.get('[role="status"]').text()).toContain('Saving')
    expect(wrapper.get('[role="status"]').attributes('data-block')).toBe('true')
    expect(wrapper.get('[role="status"]').attributes('data-size')).toBe('lg')
  })
})

describe('LuluProgress', () => {
  it('uses the native progress element and normalizes determinate values', () => {
    const wrapper = mount(LuluProgress, {
      props: {
        max: 10,
        value: 12,
      },
    })

    const progress = wrapper.get('progress').element

    expect(progress.max).toBe(10)
    expect(progress.value).toBe(10)
  })

  it('keeps progress indeterminate when no value is supplied', () => {
    const wrapper = mount(LuluProgress)

    expect(wrapper.get('progress').attributes('value')).toBeUndefined()
  })
})
