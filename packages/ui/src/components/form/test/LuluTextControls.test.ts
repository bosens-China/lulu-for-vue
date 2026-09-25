import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluInput from '../LuluInput.vue'
import LuluTextarea from '../LuluTextarea.vue'

describe('LuluInput', () => {
  it('uses v-model with native input attributes', async () => {
    const wrapper = mount(LuluInput, {
      attrs: { placeholder: 'Email' },
      props: {
        invalid: true,
        modelValue: 'before',
        type: 'email',
      },
    })

    await wrapper.get('input').setValue('after@example.com')

    expect(wrapper.emitted('update:modelValue')).toEqual([['after@example.com']])
    expect(wrapper.get('input').attributes('type')).toBe('email')
    expect(wrapper.get('input').attributes('placeholder')).toBe('Email')
    expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')
  })
})

describe('LuluTextarea', () => {
  it('uses v-model and native invalid semantics', async () => {
    const wrapper = mount(LuluTextarea, {
      props: {
        invalid: true,
        modelValue: 'before',
      },
    })

    await wrapper.get('textarea').setValue('after')

    expect(wrapper.emitted('update:modelValue')).toEqual([['after']])
    expect(wrapper.get('textarea').attributes('aria-invalid')).toBe('true')
  })

  it('forwards readonly to the native textarea', () => {
    const wrapper = mount(LuluTextarea, { props: { readonly: true } })

    expect(wrapper.get('textarea').attributes('readonly')).toBeDefined()
  })
})
