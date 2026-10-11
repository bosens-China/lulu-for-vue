import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LuluRangeSlider from '../LuluRangeSlider.vue'
import LuluSlider from '../LuluSlider.vue'
import { orderedRange, rangeLimits, snapRangeValue } from '../range-values'

enableAutoUnmount(afterEach)
afterEach(() => {
  document.body.replaceChildren()
  vi.restoreAllMocks()
})

describe('Slider 单值与范围模式', () => {
  it('单值键盘按步长更新，Home/End 到达边界', async () => {
    const wrapper = mount(LuluSlider, { props: { min: 10, max: 30, step: 2, modelValue: 20 } })
    const input = wrapper.get('input')
    await input.trigger('keydown', { key: 'ArrowRight' })
    await input.trigger('keydown', { key: 'Home' })
    await input.trigger('keydown', { key: 'End' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[22], [10], [30]])
  })

  it('range 布尔属性显示共用全局轨道的两个原生滑块', () => {
    const wrapper = mount({
      components: { LuluSlider },
      template: '<LuluSlider range :model-value="[20, 80]" />',
    })
    const inputs = wrapper.findAll('input[type="range"]')
    expect(inputs).toHaveLength(2)
    expect(inputs.map(input => [input.attributes('min'), input.attributes('max')])).toEqual([['0', '100'], ['0', '100']])
    expect(inputs[0]?.attributes('aria-valuemax')).toBe('80')
    expect(inputs[1]?.attributes('aria-valuemin')).toBe('20')
    expect(wrapper.findAll('.lulu-slider__track')).toHaveLength(1)
    expect(wrapper.get('.lulu-slider').attributes('style')).toContain('--_lulu-slider-start: 20%')
    expect(wrapper.get('.lulu-slider').attributes('style')).toContain('--_lulu-slider-end: 80%')
  })

  it('自绘指针与键盘各提交一次 model，并保留原生 input/change 事件对象', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 20))
    const onInput = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount(LuluSlider, { props: { modelValue: 20 }, attrs: { onInput, onChange } })
    await wrapper.get('.lulu-slider').trigger('pointerdown', { button: 0, clientX: 40 })
    expect(onInput).toHaveBeenCalledOnce()
    expect(onChange).not.toHaveBeenCalled()
    await wrapper.get('.lulu-slider').trigger('pointerup')
    expect(onChange).toHaveBeenCalledOnce()
    await wrapper.get('input').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[40], [41]])
    expect(onInput).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onInput.mock.calls[0]?.[0]).toBeInstanceOf(Event)
    expect(onChange.mock.calls[0]?.[0].target).toBe(wrapper.get('input').element)
  })

  it('两端键盘与原生 input 都不能交叉，显示值跟随夹取结果', async () => {
    const wrapper = mount(LuluSlider, { props: { range: true, modelValue: [20, 80] } })
    const [start, end] = wrapper.findAll('input')
    await start!.setValue(95)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[80, 80]])
    expect((start!.element as HTMLInputElement).valueAsNumber).toBe(80)
    await end!.trigger('keydown', { key: 'Home' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([[80, 80]])
  })

  it('指针选择最近的端点并可沿同一轨道拖动', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(10, 0, 100, 20))
    const wrapper = mount(LuluSlider, { attachTo: document.body, props: { range: true, modelValue: [20, 80] } })
    await wrapper.get('.lulu-slider').trigger('pointerdown', { button: 0, clientX: 40 })
    await wrapper.get('.lulu-slider').trigger('pointermove', { clientX: 60 })
    await wrapper.get('.lulu-slider').trigger('pointerup')
    expect(wrapper.emitted('update:modelValue')).toEqual([[[30, 80]], [[50, 80]]])
    expect(document.activeElement).toBe(wrapper.findAll('input')[0]?.element)
    await wrapper.get('.lulu-slider').trigger('pointerdown', { button: 0, clientX: 100 })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([[50, 90]])
    await wrapper.get('.lulu-slider').trigger('lostpointercapture')
    await wrapper.get('.lulu-slider').trigger('pointermove', { clientX: 70 })
    expect(wrapper.emitted('update:modelValue')).toHaveLength(3)
  })

  it.each([false, true])('禁用时 range=%s 不响应指针、键盘或合成 input', async (range) => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 20))
    const wrapper = mount(LuluSlider, { props: { range, disabled: true, modelValue: range ? [20, 80] : 20 } })
    await wrapper.get('input').trigger('keydown', { key: 'End' })
    await wrapper.get('input').setValue(50)
    await wrapper.get('.lulu-slider').trigger('pointerdown', { button: 0, clientX: 60 })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('兼容入口提交两个字段并把错误关联传给两端，禁用时排除字段', async () => {
    const form = document.createElement('form')
    document.body.append(form)
    const wrapper = mount(LuluRangeSlider, {
      attachTo: form,
      attrs: { 'aria-describedby': 'range-help', 'aria-errormessage': 'range-error', 'data-lulu-theme': 'dark', id: 'budget', class: 'budget-range', style: '--lulu-slider-thumb-size: 20px' },
      props: { startName: 'from', endName: 'to', modelValue: [20, 80] },
    })
    expect(Object.fromEntries(new FormData(form))).toEqual({ from: '20', to: '80' })
    expect(wrapper.get('input').attributes('id')).toBe('budget')
    expect(wrapper.findAll('input').map(input => input.attributes('aria-describedby'))).toEqual(['range-help', 'range-help'])
    expect(wrapper.findAll('input').map(input => input.attributes('aria-errormessage'))).toEqual(['range-error', 'range-error'])
    expect(wrapper.classes()).toContain('budget-range')
    expect(wrapper.attributes('data-lulu-theme')).toBe('dark')
    expect(wrapper.get('input').attributes('data-lulu-theme')).toBeUndefined()
    expect(wrapper.get('input').attributes('style')).not.toContain('--lulu-slider-thumb-size')
    await wrapper.setProps({ disabled: true })
    expect(Object.fromEntries(new FormData(form))).toEqual({})
  })

  it('异常边界、倒序元组和小数步长规范化只影响展示', () => {
    const limits = rangeLimits(0.1, 0.9, 0.2)
    expect(snapRangeValue(0.31, limits)).toBe(0.3)
    expect(snapRangeValue(2, limits)).toBe(0.9)
    expect(orderedRange([0.8, 0.2], limits)).toEqual([0.3, 0.9])
    const wrapper = mount(LuluSlider, { props: { range: true, min: 10, max: 5, step: Number.NaN, modelValue: [Number.NaN, 20] } })
    expect(wrapper.findAll('input').map(input => (input.element as HTMLInputElement).valueAsNumber)).toEqual([10, 10])
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
