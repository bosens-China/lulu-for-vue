import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import LuluAutocomplete from '../LuluAutocomplete.vue'
import LuluColorPicker from '../LuluColorPicker.vue'
import LuluDatePicker from '../LuluDatePicker.vue'
import LuluDateRangePicker from '../LuluDateRangePicker.vue'

afterEach(() => {
  document.body.replaceChildren()
})

describe('LuluAutocomplete', () => {
  it('输入法组合期间不搜索或拦截选词，完成后搜索一次', async () => {
    const wrapper = mount(LuluAutocomplete, {
      attachTo: document.body,
      props: { items: [{ label: '拼音', value: '拼音' }] },
    })
    const input = wrapper.get('input')

    await input.trigger('focus')
    await input.trigger('compositionstart')
    await input.setValue('p')
    await input.trigger('keydown', { key: 'ArrowDown', isComposing: true })
    await input.trigger('keydown', { key: 'Enter', isComposing: true })

    expect(wrapper.emitted('search')).toBeUndefined()
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    ;(input.element as HTMLInputElement).value = '拼音'
    await input.trigger('compositionend')
    await input.trigger('input')

    expect(wrapper.emitted('search')).toEqual([['拼音']])
    expect(wrapper.emitted('update:modelValue')).toEqual([['拼音']])
    wrapper.unmount()
  })

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

  it('allows the loading status text to be localized', async () => {
    const wrapper = mount(LuluAutocomplete, {
      attachTo: document.body,
      props: {
        loading: true,
        loadingText: '正在加载',
      },
    })

    await wrapper.get('input').trigger('focus')

    expect(document.body.querySelector('[role="status"]')?.textContent).toBe('正在加载')
  })

  it('closes on blur without interrupting pointer selection', async () => {
    const item = { label: 'Apple', value: 'apple' }
    const wrapper = mount(LuluAutocomplete, {
      attachTo: document.body,
      props: { items: [item] },
    })
    const input = wrapper.get('input')

    await input.trigger('focus')
    await input.trigger('blur')
    expect(document.body.querySelector('[role="listbox"]')).toBeNull()

    await input.trigger('focus')
    const option = document.body.querySelector<HTMLElement>('[role="option"]')

    if (!option) throw new Error('自动完成面板应渲染候选项。')

    option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }))
    option.click()
    await nextTick()

    expect(wrapper.emitted('select')).toEqual([[item]])
    expect(wrapper.emitted('update:modelValue')).toEqual([['apple']])
  })

  it('通过 panelStyle 覆盖单个候选浮层的 token', async () => {
    const wrapper = mount(LuluAutocomplete, {
      attachTo: document.body,
      props: {
        items: [{ label: 'Apple', value: 'apple' }],
        panelStyle: { '--lulu-floating-background': '#312e81' },
      },
    })

    await wrapper.get('input').trigger('focus')

    expect(document.body.querySelector<HTMLElement>('[role="listbox"]')?.style
      .getPropertyValue('--lulu-floating-background')).toBe('#312e81')
  })
})

describe('LuluColorPicker', () => {
  it.each([
    [false, 'color', '#ff0000', '#ff0000'],
    [true, 'color', '#ff0000', '#ff000080'],
    [true, 'range', '0.25', '#11223340'],
  ])('受控模式 alpha=%s 的 %s 在同轮 input/change 提交新值', async (alpha, type, value, expected) => {
    const wrapper = mount({
      components: { LuluColorPicker },
      data: () => ({ alpha, color: '#11223380', committed: '' }),
      template: '<LuluColorPicker v-model="color" :alpha="alpha" @change="committed = $event" />',
    })
    const input = wrapper.get(`input[type="${type}"]`).element as HTMLInputElement

    input.value = value
    input.dispatchEvent(new Event('input', { bubbles: true }))
    expect(wrapper.vm.committed).toBe('')
    input.dispatchEvent(new Event('change', { bubbles: true }))

    expect(wrapper.vm.committed).toBe(expected)
    expect(wrapper.getComponent(LuluColorPicker).emitted('update:modelValue')).toEqual([[expected]])
    await nextTick()
    expect(wrapper.vm.color).toBe(expected)
    wrapper.unmount()
  })

  it('透明颜色通过完整字段提交，布局属性保留在外层', async () => {
    const form = document.createElement('form')
    document.body.append(form)
    const wrapper = mount(LuluColorPicker, {
      attachTo: form,
      attrs: { class: 'brand-color', style: '--lulu-range-accent: red', name: 'color', id: 'brand-color' },
      props: { alpha: true, modelValue: '#11223380' },
    })

    expect(Object.fromEntries(new FormData(form))).toEqual({ color: '#11223380' })
    expect(wrapper.classes()).toContain('brand-color')
    expect(wrapper.get('input[type="color"]').attributes('id')).toBe('brand-color')
    expect(wrapper.get('input[type="color"]').attributes('name')).toBeUndefined()

    await wrapper.get('input[type="range"]').setValue('0.25')
    expect(Object.fromEntries(new FormData(form))).toEqual({ color: '#11223340' })
    await wrapper.setProps({ disabled: true })
    expect(Object.fromEntries(new FormData(form))).toEqual({})
    wrapper.unmount()
  })

  it('在透明模式下维护八位十六进制颜色', async () => {
    const wrapper = mount(LuluColorPicker, {
      props: {
        alpha: true,
        alphaLabel: '透明度',
        label: '颜色',
        modelValue: '#11223380',
      },
    })
    const color = wrapper.get('.lulu-color-picker__color')
    const alpha = wrapper.get('.lulu-color-picker__alpha')

    expect(color.attributes('aria-label')).toBe('颜色')
    expect(alpha.attributes('aria-label')).toBe('透明度')

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
  it('双端约束取全局范围与当前另一端的交集，布局属性作用于整体', async () => {
    const wrapper = mount(LuluDateRangePicker, {
      attrs: { class: 'booking-range', style: '--lulu-control-background: pink' },
      props: { min: '2026-10-10', max: '2026-10-20', modelValue: ['2026-10-05', '2026-10-25'] },
    })
    const [start, end] = wrapper.findAll('input')

    expect(wrapper.classes()).toContain('booking-range')
    expect(start?.attributes('max')).toBe('2026-10-20')
    expect(end?.attributes('min')).toBe('2026-10-10')
    expect(start?.attributes('style')).toBeUndefined()
    expect(end?.attributes('style')).toBeUndefined()
    await wrapper.setProps({ modelValue: ['2026-10-12', '2026-10-18'] })
    expect(start?.attributes('max')).toBe('2026-10-18')
    expect(end?.attributes('min')).toBe('2026-10-12')
  })

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
