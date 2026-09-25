import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import LuluAutocomplete from '../LuluAutocomplete.vue'
import LuluColorPicker from '../LuluColorPicker.vue'
import LuluDatePicker from '../LuluDatePicker.vue'
import LuluDateRangePicker from '../LuluDateRangePicker.vue'
import LuluHourPicker from '../LuluHourPicker.vue'
import LuluYearPicker from '../LuluYearPicker.vue'

afterEach(() => {
  document.body.replaceChildren()
})

describe('LuluAutocomplete', () => {
  it('过滤候选项，并以键盘选择受控值', async () => {
    const apple = { label: 'Apple', value: 'apple' }
    const wrapper = mount(LuluAutocomplete, {
      attachTo: document.body,
      props: {
        items: [apple, { label: 'Banana', value: 'banana' }],
      },
    })
    const input = wrapper.get('input')

    await input.setValue('app')
    expect(document.body.querySelector('[role="listbox"]')?.textContent).toContain('Apple')
    expect(document.body.querySelector('[role="listbox"]')?.textContent).not.toContain('Banana')
    expect(wrapper.emitted('search')).toEqual([['app']])

    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('select')).toEqual([[apple]])
    expect(wrapper.emitted('update:modelValue')).toEqual([['app'], ['apple']])
    expect((input.element as HTMLInputElement).value).toBe('apple')

    await wrapper.setProps({ modelValue: 'banana' })
    expect((input.element as HTMLInputElement).value).toBe('banana')
  })
})

describe('LuluColorPicker', () => {
  it('在透明模式下维护八位十六进制颜色', async () => {
    const wrapper = mount(LuluColorPicker, {
      props: {
        alpha: true,
        modelValue: '#11223380',
      },
    })
    const color = wrapper.get('.lulu-color-picker__color')
    const alpha = wrapper.get('.lulu-color-picker__alpha')

    await color.setValue('#ff0000')
    await alpha.setValue('0.25')

    expect(wrapper.emitted('update:modelValue')).toEqual([['#ff000080'], ['#ff000040']])
    expect(wrapper.emitted('change')).toEqual([['#ff000080'], ['#ff000040']])
  })
})

describe('LuluDatePicker', () => {
  it('把原生日期类型和值作为受控模型传递', async () => {
    const wrapper = mount(LuluDatePicker, {
      props: {
        modelValue: '',
        type: 'month',
      },
    })

    await wrapper.get('input').setValue('2026-08')

    expect(wrapper.get('input').attributes('type')).toBe('month')
    expect(wrapper.emitted('update:modelValue')).toEqual([['2026-08']])
  })
})

describe('LuluDateRangePicker', () => {
  it('规范化初始范围，并维持结构化的双值模型', async () => {
    const wrapper = mount(LuluDateRangePicker, {
      props: {
        modelValue: ['2026-10-20', '2026-10-10'],
      },
    })
    const inputs = wrapper.findAll('input')
    const startInput = inputs[0]
    const endInput = inputs[1]

    if (!startInput || !endInput) throw new Error('LuluDateRangePicker 应渲染两个输入框。')

    expect((startInput.element as HTMLInputElement).value).toBe('2026-10-10')
    expect((endInput.element as HTMLInputElement).value).toBe('2026-10-20')

    await startInput.setValue('2026-10-15')
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toEqual([[['2026-10-15', '2026-10-20']]])
  })

  it('两个日期都具备可提交字段名和错误描述关联', () => {
    const form = document.createElement('form')
    document.body.append(form)
    const wrapper = mount(LuluDateRangePicker, {
      attachTo: form,
      attrs: { 'aria-describedby': 'date-error' },
      props: {
        endName: 'to',
        modelValue: ['2026-10-10', '2026-10-20'],
        startName: 'from',
      },
    })

    expect(Object.fromEntries(new FormData(form))).toEqual({ from: '2026-10-10', to: '2026-10-20' })
    expect(wrapper.findAll('input').map(input => input.attributes('aria-describedby'))).toEqual(['date-error', 'date-error'])
    wrapper.unmount()
  })
})

describe('LuluYearPicker and LuluHourPicker', () => {
  it('使用 number 模型并限制小时范围', async () => {
    const year = mount(LuluYearPicker, { props: { modelValue: null } })
    const hour = mount(LuluHourPicker, { props: { max: 20, min: 8, modelValue: null } })

    await year.get('input').setValue('2026')
    await hour.get('input').setValue('22')

    expect(year.emitted('update:modelValue')).toEqual([[2026]])
    expect(hour.emitted('update:modelValue')).toEqual([[20]])
  })
})
