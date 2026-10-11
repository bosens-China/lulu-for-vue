import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluDatePicker from '../LuluDatePicker.vue'
import LuluDateRangePicker from '../LuluDateRangePicker.vue'
import LuluTimePicker from '../LuluTimePicker.vue'
import LuluTimeRangePicker from '../LuluTimeRangePicker.vue'

describe('日期时间家族', () => {
  it('统一日期粒度优先于旧 type，年份保持字符串及空值', async () => {
    const wrapper = mount(LuluDatePicker, { props: { type: 'time', picker: 'year', min: '2000', max: '2100' } })
    const input = wrapper.get('input')
    expect(input.attributes('type')).toBe('number')
    expect(input.attributes('min')).toBe('2000')
    await input.setValue('2026.8')
    await input.setValue('')
    expect(wrapper.emitted('update:modelValue')).toEqual([['2026'], ['']])
  })

  it('日期时间使用统一 showTime，旧原生类型继续可用', async () => {
    const picker = mount(LuluDatePicker, { props: { showTime: true, step: 60 } })
    expect(picker.get('input').attributes('type')).toBe('datetime-local')
    await picker.get('input').setValue('2026-10-10T12:30')
    expect(picker.emitted('update:modelValue')).toEqual([['2026-10-10T12:30']])
    await picker.setProps({ picker: 'month' })
    expect(picker.get('input').attributes('type')).toBe('month')
    await picker.setProps({ picker: undefined, type: 'time', showTime: false })
    expect(picker.get('input').attributes('type')).toBe('time')
  })

  it('年份范围按数字排序且范围两端共享步长', () => {
    const year = mount(LuluDateRangePicker, { props: { picker: 'year', modelValue: ['1000', '999'] } })
    expect(year.findAll('input').map(input => (input.element as HTMLInputElement).value)).toEqual(['999', '1000'])
    const time = mount(LuluDateRangePicker, { props: { showTime: true, step: 60, modelValue: ['', ''] } })
    expect(time.findAll('input').map(input => input.attributes('step'))).toEqual(['60', '60'])
    expect(time.findAll('input').map(input => input.attributes('type'))).toEqual(['datetime-local', 'datetime-local'])
  })

  it('独立时间入口提交时间字符串，转发原生属性', async () => {
    const form = document.createElement('form')
    const wrapper = mount(LuluTimePicker, {
      attachTo: form,
      props: { modelValue: '12:30', min: '09:00', max: '18:00', step: 60 },
      attrs: { name: 'time', id: 'meeting', 'aria-label': '会议时间' },
    })
    expect(wrapper.get('input').attributes('id')).toBe('meeting')
    expect(Object.fromEntries(new FormData(form))).toEqual({ time: '12:30' })
    await wrapper.get('input').setValue('13:45')
    expect(wrapper.emitted('update:modelValue')).toEqual([['13:45']])
    wrapper.unmount()
  })

  it('时间范围默认保留跨午夜顺序，也可显式开启排序', async () => {
    const wrapper = mount(LuluTimeRangePicker, { props: { modelValue: ['22:00', '02:00'], step: 60 } })
    const inputs = wrapper.findAll('input')
    expect(inputs.map(input => (input.element as HTMLInputElement).value)).toEqual(['22:00', '02:00'])
    expect(inputs[0]?.attributes('max')).toBeUndefined()
    expect(inputs[1]?.attributes('min')).toBeUndefined()
    await wrapper.setProps({ order: true })
    expect(inputs.map(input => (input.element as HTMLInputElement).value)).toEqual(['02:00', '22:00'])
  })


  it('范围的两端关联外部 form/readonly，实例主题作用于整个控件', () => {
    const form = document.createElement('form')
    form.id = 'external-booking'
    document.body.append(form)
    const wrapper = mount(LuluTimeRangePicker, {
      attachTo: document.body,
      props: { modelValue: ['22:00', '02:00'], startName: 'from', endName: 'to' },
      attrs: { form: form.id, readonly: true, 'data-lulu-theme': 'dark' },
    })
    expect(wrapper.attributes('data-lulu-theme')).toBe('dark')
    expect(wrapper.findAll('input').map(input => input.attributes('data-lulu-theme'))).toEqual([undefined, undefined])
    expect(wrapper.findAll('input').map(input => input.attributes('readonly'))).toEqual(['', ''])
    expect(Object.fromEntries(new FormData(form))).toEqual({ from: '22:00', to: '02:00' })
    wrapper.unmount()
    form.remove()
  })
})
