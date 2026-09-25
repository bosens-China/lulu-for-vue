import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import LuluCheckbox from '../LuluCheckbox.vue'
import LuluRadio from '../LuluRadio.vue'
import LuluSwitch from '../LuluSwitch.vue'

describe('LuluCheckbox', () => {
  it('updates v-model and applies the native indeterminate state', async () => {
    const wrapper = mount(LuluCheckbox, {
      props: {
        indeterminate: true,
        modelValue: false,
      },
      slots: { default: 'Accept terms' },
    })

    await nextTick()
    expect((wrapper.get('input').element as HTMLInputElement).indeterminate).toBe(true)

    await wrapper.get('input').setValue(true)

    expect(wrapper.emitted('update:indeterminate')).toEqual([[false]])
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    expect(wrapper.text()).toContain('Accept terms')
  })
})

describe('LuluRadio', () => {
  it('updates v-model with its typed option value', async () => {
    const wrapper = mount(LuluRadio, {
      attrs: { name: 'size' },
      props: {
        modelValue: 'small',
        value: 'large',
      },
      slots: { default: 'Large' },
    })

    await wrapper.get('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([['large']])
    expect(wrapper.get('input').attributes('name')).toBe('size')
  })
})

describe('LuluSwitch', () => {
  it('uses a switch role and updates v-model', async () => {
    const wrapper = mount(LuluSwitch, {
      props: { modelValue: false },
      slots: { default: 'Enable alerts' },
    })

    await wrapper.get('input').setValue(true)

    expect(wrapper.get('input').attributes('role')).toBe('switch')
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })
})
