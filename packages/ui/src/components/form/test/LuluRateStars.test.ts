import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick, ref } from 'vue'
import LuluRate from '../LuluRate.vue'

enableAutoUnmount(afterEach)
afterEach(() => {
  document.body.replaceChildren()
  vi.restoreAllMocks()
})

describe('Rate 星形评分', () => {
  it('默认五颗星，以局部裁剪显示半分并保留可访问值', () => {
    const wrapper = mount(LuluRate, { props: { modelValue: 2.5 } })
    expect(wrapper.findAll('.lulu-rate__star')).toHaveLength(5)
    expect(wrapper.findAll('.lulu-rate__filled')[2]?.attributes('style')).toContain('inset(0 50% 0 0)')
    expect(wrapper.get('input').attributes('aria-valuetext')).toBe('2.5 / 5')
    expect(wrapper.get('input').attributes('step')).toBe('0.5')
  })

  it('指针预览不提交，点击左半星提交半分，离开后恢复模型显示', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(100, 0, 24, 24))
    const wrapper = mount(LuluRate, { attachTo: document.body, props: { modelValue: 1 } })
    const third = wrapper.findAll('.lulu-rate__star')[2]!
    await third.trigger('pointermove', { clientX: 101 })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.findAll('.lulu-rate__filled')[2]?.attributes('style')).toContain('50%')
    await wrapper.trigger('pointerleave')
    expect(wrapper.findAll('.lulu-rate__filled')[2]?.attributes('style')).toContain('100%')
    await third.trigger('click', { clientX: 101 })
    expect(wrapper.emitted('update:modelValue')).toEqual([[2.5]])
    expect(document.activeElement).toBe(wrapper.get('input').element)
  })

  it('键盘按小数步长更新，Home/End 到达评分边界', async () => {
    const wrapper = mount(LuluRate, { props: { modelValue: 2.5 } })
    const input = wrapper.get('input')
    await input.trigger('keydown', { key: 'ArrowUp' })
    await input.trigger('keydown', { key: 'ArrowLeft' })
    await input.trigger('keydown', { key: 'Home' })
    await input.trigger('keydown', { key: 'End' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[3], [2.5], [0], [5]])
  })

  it('星形点击与键盘通过真实输入通知原生监听器，不重复提交 model', async () => {
    const onInput = vi.fn()
    const onChange = vi.fn()
    const wrapper = mount(LuluRate, { props: { modelValue: 2 }, attrs: { onInput, onChange } })
    await wrapper.findAll('.lulu-rate__star')[3]!.trigger('click')
    await wrapper.get('input').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[4], [4.5]])
    expect(onInput).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onInput.mock.calls[0]?.[0]).toBeInstanceOf(Event)
    expect(onChange.mock.calls[0]?.[0].target).toBe(wrapper.get('input').element)
  })

  it('clearable 点击当前评分或 Delete 清空到 min', async () => {
    const wrapper = mount(LuluRate, { props: { clearable: true, min: 1, modelValue: 3, step: 1 } })
    await wrapper.findAll('.lulu-rate__star')[2]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[1]])
    await wrapper.setProps({ modelValue: 4 })
    await wrapper.get('input').trigger('keydown', { key: 'Delete' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([1])
  })

  it.each(['readonly', 'disabled'] as const)('%s 阻止鼠标、键盘及合成 input 改值', async (state) => {
    const wrapper = mount(LuluRate, { props: { modelValue: 3, [state]: true } })
    await wrapper.findAll('.lulu-rate__star')[4]!.trigger('pointermove')
    await wrapper.findAll('.lulu-rate__star')[4]!.trigger('click')
    await wrapper.get('input').trigger('keydown', { key: 'End' })
    const input = wrapper.get('input').element as HTMLInputElement
    input.value = '4'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect((wrapper.get('input').element as HTMLInputElement).valueAsNumber).toBe(3)
  })

  it('只读仍参加原生表单提交，禁用不提交，语义属性绑定实际控件', async () => {
    const form = document.createElement('form')
    document.body.append(form)
    const wrapper = mount(LuluRate, {
      attachTo: form,
      attrs: { id: 'rating', name: 'rating', 'aria-describedby': 'rating-help', 'aria-invalid': 'true', 'data-lulu-theme': 'dark', style: '--lulu-rate-star-size: 30px' },
      props: { modelValue: 3.5, readonly: true },
    })
    expect(Object.fromEntries(new FormData(form))).toEqual({ rating: '3.5' })
    expect(wrapper.get('input').attributes('id')).toBe('rating')
    expect(wrapper.get('input').attributes('aria-describedby')).toBe('rating-help')
    expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('input').attributes('aria-readonly')).toBe('true')
    expect(wrapper.get('input').attributes('style')).toBeUndefined()
    expect(wrapper.attributes('data-lulu-theme')).toBe('dark')
    expect(wrapper.get('input').attributes('data-lulu-theme')).toBeUndefined()
    await wrapper.setProps({ disabled: true })
    expect(Object.fromEntries(new FormData(form))).toEqual({})
  })

  it('图形插槽接收索引和填充分数，可替换星形但不改变评分模型', () => {
    const wrapper = mount(LuluRate, {
      props: { max: 3, modelValue: 1.5 },
      slots: { icon: '<template #icon="{ index, fraction }"><span>{{ index }}:{{ fraction }}</span></template>' },
    })
    expect(wrapper.findAll('.lulu-rate__star')).toHaveLength(3)
    expect(wrapper.findAll('.lulu-rate__filled')[1]?.text()).toBe('2:0.5')
  })

  it('外部原生标签和 tabindex 动态更新时覆盖默认值', async () => {
    const label = ref('初始名称')
    const tabindex = ref(2)
    const wrapper = mount({ setup: () => () => h(LuluRate, { modelValue: 2, 'aria-label': label.value, tabindex: tabindex.value }) })
    expect(wrapper.get('input').attributes('aria-label')).toBe('初始名称')
    label.value = '更新名称'
    tabindex.value = 4
    await nextTick()
    expect(wrapper.get('input').attributes('aria-label')).toBe('更新名称')
    expect(wrapper.get('input').attributes('tabindex')).toBe('4')
  })
})
