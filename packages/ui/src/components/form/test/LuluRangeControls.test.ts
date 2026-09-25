import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluRangeSlider from '../LuluRangeSlider.vue'
import LuluRate from '../LuluRate.vue'
import LuluSelect from '../LuluSelect.vue'
import LuluSlider from '../LuluSlider.vue'

const options = `
  <option value="small">Small</option>
  <option value="medium">Medium</option>
  <option value="large">Large</option>
`

describe('LuluSelect', () => {
  it('uses the native select v-model for a single value', async () => {
    const wrapper = mount(LuluSelect, {
      attrs: { name: 'size' },
      props: { modelValue: 'small' },
      slots: { default: options },
    })

    await wrapper.get('select').setValue('large')

    expect(wrapper.emitted('update:modelValue')).toEqual([['large']])
    expect(wrapper.get('select').attributes('name')).toBe('size')
  })

  it('keeps a native multiple select as an array model', async () => {
    const wrapper = mount(LuluSelect, {
      props: {
        modelValue: ['small'],
        multiple: true,
      },
      slots: { default: options },
    })

    await wrapper.get('select').setValue(['medium', 'large'])

    expect(wrapper.emitted('update:modelValue')).toEqual([[['medium', 'large']]])
    expect(wrapper.get('select').attributes('multiple')).toBeDefined()
  })
})

describe('LuluSlider', () => {
  it('emits numeric v-model values from a native range input', async () => {
    const wrapper = mount(LuluSlider, {
      attrs: { name: 'opacity' },
      props: {
        max: 100,
        min: 0,
        modelValue: 25,
      },
    })

    await wrapper.get('input').setValue(60)

    expect(wrapper.emitted('update:modelValue')).toEqual([[60]])
    expect(wrapper.get('input').attributes('name')).toBe('opacity')
  })
})

describe('LuluRangeSlider', () => {
  it('keeps the tuple ordered when either native thumb changes', async () => {
    const wrapper = mount(LuluRangeSlider, {
      props: {
        max: 100,
        min: 0,
        modelValue: [20, 80],
      },
    })
    const [startInput, endInput] = wrapper.findAll('input')

    if (!startInput || !endInput) {
      throw new Error('Range slider should render two inputs')
    }

    await startInput.setValue(90)

    expect(wrapper.emitted('update:modelValue')).toEqual([[[80, 80]]])
    expect(startInput.attributes('max')).toBe('80')
    expect(endInput.attributes('min')).toBe('80')
    expect(startInput.attributes('aria-label')).toBe('Minimum value')
    expect(endInput.attributes('aria-label')).toBe('Maximum value')
  })

  it('submits both range values and describes each native thumb', () => {
    const form = document.createElement('form')
    document.body.append(form)
    const wrapper = mount(LuluRangeSlider, {
      attachTo: form,
      attrs: { 'aria-describedby': 'range-error' },
      props: { endName: 'maximum', modelValue: [20, 80], startName: 'minimum' },
    })

    expect(Object.fromEntries(new FormData(form))).toEqual({ minimum: '20', maximum: '80' })
    expect(wrapper.findAll('input').map(input => input.attributes('aria-describedby'))).toEqual(['range-error', 'range-error'])
    wrapper.unmount()
    form.remove()
  })
})

describe('LuluRate', () => {
  it('uses an accessible native range and emits a numeric rating', async () => {
    const wrapper = mount(LuluRate, {
      props: { modelValue: 2.5 },
    })

    await wrapper.get('input').setValue(4)

    expect(wrapper.get('input').attributes('type')).toBe('range')
    expect(wrapper.get('input').attributes('aria-label')).toBe('Rating')
    expect(wrapper.emitted('update:modelValue')).toEqual([[4]])
  })

  it('does not emit a new value when readonly', async () => {
    const wrapper = mount(LuluRate, {
      props: {
        modelValue: 3,
        readonly: true,
      },
    })

    await wrapper.get('input').setValue(4)

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect((wrapper.get('input').element as HTMLInputElement).valueAsNumber).toBe(3)
    expect(wrapper.get('input').attributes('aria-readonly')).toBe('true')
  })
})
