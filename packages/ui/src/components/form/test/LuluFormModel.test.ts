import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, nextTick, reactive } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import LuluForm from '../LuluForm.vue'
import LuluFormItem from '../LuluFormItem.vue'
import LuluDateRangePicker from '../LuluDateRangePicker.vue'
import LuluInput from '../LuluInput.vue'
import type { FormModel } from '../form-types'

function deferred() {
  let resolve!: (message: string | undefined) => void
  const promise = new Promise<string | undefined>(done => { resolve = done })
  return { promise, resolve }
}

describe('LuluForm 模型校验', () => {
  it('校验数组和布尔原值，提交独立快照并保留原生 submit 事件', async () => {
    const model = reactive({ tags: ['vue'], enabled: true })
    const tags = vi.fn((value: unknown) => Array.isArray(value) ? undefined : '不是数组')
    const enabled = vi.fn((value: unknown) => value === true ? undefined : '未启用')
    const submit = vi.fn()
    const wrapper = mount(LuluForm, { props: { model, rules: { tags, enabled }, onSubmit: submit } })
    const event = new Event('submit', { cancelable: true })
    wrapper.get('form').element.dispatchEvent(event)
    await flushPromises()

    expect(event.defaultPrevented).toBe(true)
    expect(submit).toHaveBeenCalledExactlyOnceWith(event)
    expect(tags).toHaveBeenCalledWith(['vue'], { name: 'tags', model: { tags: ['vue'], enabled: true } })
    expect(enabled.mock.calls[0]?.[0]).toBe(true)
    const values = wrapper.emitted('finish')?.[0]?.[0] as FormModel
    model.tags.push('typescript')
    expect(values.tags).toEqual(['vue'])
    expect(wrapper.get('form').attributes('novalidate')).toBeDefined()
    wrapper.unmount()
  })

  it('关联自动ID、帮助和字段错误，clearValidate 可只清指定字段', async () => {
    const model = reactive({ email: '', note: '' })
    const wrapper = mount(defineComponent({
      components: { LuluForm, LuluFormItem, LuluInput },
      setup: () => ({ model }),
      template: `<LuluForm :model="model">
        <LuluFormItem name="email" label="邮箱" help="工作邮箱" required><LuluInput v-model="model.email" /></LuluFormItem>
        <LuluFormItem name="note" label="备注" required><LuluInput v-model="model.note" /></LuluFormItem>
      </LuluForm>`,
    }))
    const form = wrapper.getComponent(LuluForm)
    expect(await form.vm.validate()).toBe(false)
    await nextTick()
    const input = wrapper.findAll('input')[0]!
    const id = input.attributes('id')
    expect(id).toBeTruthy()
    expect(wrapper.get('label').attributes('for')).toBe(id)
    expect(input.attributes('name')).toBe('email')
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toBe(`${id}-help ${id}-error`)
    expect(input.attributes('aria-errormessage')).toBe(`${id}-error`)
    form.vm.clearValidate('email')
    await nextTick()
    expect(input.attributes('aria-invalid')).toBeUndefined()
    expect(input.attributes('aria-describedby')).toBe(`${id}-help`)
    expect(wrapper.findAll('[role="alert"]')).toHaveLength(1)
    wrapper.unmount()
  })

  it('原生约束优先，字段规则按顺序执行，并展示 rejected 规则', async () => {
    const model = reactive({ email: 'wrong' })
    const business = vi.fn(() => undefined)
    const itemRule = vi.fn(() => Promise.reject(new Error('邮箱已使用')))
    const wrapper = mount(defineComponent({
      components: { LuluForm, LuluFormItem },
      setup: () => ({ model, rules: { email: business }, itemRule }),
      template: `<LuluForm :model="model" :rules="rules"><LuluFormItem name="email" :rules="[itemRule]" v-slot="{ controlProps }"><input v-bind="controlProps" v-model="model.email" type="email"></LuluFormItem></LuluForm>`,
    }))
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(business).not.toHaveBeenCalled()
    expect(wrapper.get('[role="alert"]').text()).toBeTruthy()
    await wrapper.get('input').setValue('valid@example.com')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(business).toHaveBeenCalledOnce()
    expect(itemRule).toHaveBeenCalledOnce()
    expect(wrapper.get('[role="alert"]').text()).toBe('邮箱已使用')
    expect(wrapper.getComponent(LuluForm).emitted('finishFailed')?.[1]?.[0]).toEqual({ values: { email: 'valid@example.com' }, errors: { email: '邮箱已使用' } })
    wrapper.unmount()
  })

  it('后一次提交完成后，不让较早的异步失败覆盖或重新发事件', async () => {
    const first = deferred()
    const model = reactive({ name: 'old' })
    const rule = vi.fn((value: unknown) => value === 'old' ? first.promise : undefined)
    const wrapper = mount(LuluForm, { props: { model, rules: { name: rule } } })
    await wrapper.get('form').trigger('submit')
    expect(wrapper.get('form').attributes('aria-busy')).toBe('true')
    model.name = 'new'
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    first.resolve('旧请求错误')
    await flushPromises()
    expect(wrapper.emitted('finish')).toEqual([[{ name: 'new' }]])
    expect(wrapper.emitted('finishFailed')).toBeUndefined()
    expect(wrapper.vm.errors).toEqual({})
    expect(wrapper.get('form').attributes('aria-busy')).toBeUndefined()
    wrapper.unmount()
  })

  it.each(['edit', 'clear', 'reset'] as const)('%s 废弃待完成校验', async (action) => {
    const pending = deferred()
    const model = reactive({ name: 'initial' })
    const wrapper = mount(LuluForm, { props: { model, rules: { name: () => pending.promise } } })
    await wrapper.get('form').trigger('submit')
    if (action === 'edit') model.name = 'changed'
    if (action === 'clear') wrapper.vm.clearValidate()
    if (action === 'reset') wrapper.vm.resetFields()
    pending.resolve('过期错误')
    await flushPromises()
    expect(wrapper.vm.errors).toEqual({})
    expect(wrapper.emitted('finish')).toBeUndefined()
    expect(wrapper.emitted('finishFailed')).toBeUndefined()
    wrapper.unmount()
  })

  it('重置 Vue 模型的数组、布尔和嵌套值，删除新增字段并清理错误', async () => {
    const model = reactive<FormModel>({ tags: ['vue'], enabled: true, profile: { level: 1 } })
    const wrapper = mount(LuluForm, { props: { model, rules: { tags: () => '请检查' } } })
    model.tags = ['changed']
    model.enabled = false
    ;(model.profile as { level: number }).level = 9
    model.extra = 'added'
    expect(await wrapper.vm.validate()).toBe(false)
    wrapper.vm.resetFields()
    await nextTick()
    expect(model).toEqual({ tags: ['vue'], enabled: true, profile: { level: 1 } })
    expect(wrapper.vm.errors).toEqual({})
    ;(model.tags as string[]).push('new')
    await wrapper.get('form').trigger('reset')
    expect(model.tags).toEqual(['vue'])
    wrapper.unmount()
  })

  it('没有 model 时保留原生提交默认行为', () => {
    const wrapper = mount(LuluForm, { attrs: { action: '/save', method: 'post' } })
    const event = new Event('submit', { cancelable: true })
    wrapper.get('form').element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
    expect(wrapper.emitted('submit')?.[0]).toEqual([event])
    expect(wrapper.emitted('finish')).toBeUndefined()
    expect(wrapper.get('form').attributes('novalidate')).toBeUndefined()
    expect(wrapper.vm.element).toBe(wrapper.get('form').element)
    wrapper.unmount()
  })

  it('模型模式保持 novalidate，原生模式保留用户的 novalidate', () => {
    const modelForm = mount(LuluForm, { props: { model: {} }, attrs: { novalidate: false } })
    expect(modelForm.get('form').attributes('novalidate')).toBeDefined()
    modelForm.unmount()
    const nativeForm = mount(LuluForm, { attrs: { novalidate: '', class: 'custom', 'aria-busy': 'true' } })
    expect(nativeForm.get('form').attributes('novalidate')).toBeDefined()
    expect(nativeForm.get('form').classes()).toContain('custom')
    expect(nativeForm.get('form').attributes('aria-busy')).toBe('true')
    nativeForm.unmount()
  })

  it('规则变化废弃旧结果，新规则可立即重新校验', async () => {
    const pending = deferred()
    const wrapper = mount(LuluForm, { props: { model: { name: 'same' }, rules: { name: () => pending.promise } } })
    const oldValidation = wrapper.vm.validate()
    await wrapper.setProps({ rules: { name: () => undefined } })
    expect(await wrapper.vm.validate()).toBe(true)
    pending.resolve('旧规则错误')
    expect(await oldValidation).toBe(false)
    expect(wrapper.vm.errors).toEqual({})
    wrapper.unmount()
  })

  it('复合日期字段的未命名第二端原生错误仍关联整个模型字段', async () => {
    const wrapper = mount({
      components: { LuluForm, LuluFormItem, LuluDateRangePicker },
      setup: () => ({ model: reactive({ dates: ['2026-01-01', ''] as [string, string] }) }),
      template: '<LuluForm :model="model"><LuluFormItem name="dates" label="日期" required><LuluDateRangePicker v-model="model.dates" /></LuluFormItem></LuluForm>',
    })
    expect(await wrapper.getComponent(LuluForm).vm.validate()).toBe(false)
    await nextTick()
    expect(wrapper.get('[role="alert"]').text()).toBeTruthy()
    for (const input of wrapper.findAll('input')) expect(input.attributes('aria-invalid')).toBe('true')
    wrapper.unmount()
  })

  it('不忽略未命名原生控件的约束失败', async () => {
    const wrapper = mount(LuluForm, { props: { model: {} }, slots: { default: '<input required>' } })
    expect(await wrapper.vm.validate()).toBe(false)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.emitted('finish')).toBeUndefined()
    expect(wrapper.emitted('finishFailed')).toHaveLength(1)
    wrapper.unmount()
  })

  it.each([
    [false, false], [[], false], [0, true], [['vue'], true], [true, true],
  ])('required 模型值 %j 的结果为 %s', async (value, valid) => {
    const wrapper = mount({
      components: { LuluForm, LuluFormItem },
      setup: () => ({ model: { value } }),
      template: '<LuluForm :model="model"><LuluFormItem name="value" required /></LuluForm>',
    })
    expect(await wrapper.getComponent(LuluForm).vm.validate()).toBe(valid)
    wrapper.unmount()
  })
})

describe('LuluFormItem 第三方接入', () => {
  it('支持 controlProps、帮助插槽、显式错误和自定义错误展示', async () => {
    const wrapper = mount({
      components: { LuluFormItem },
      data: () => ({ error: '业务错误' }),
      template: `<LuluFormItem control-id="external" name="external" label="原生字段" :error="error" required>
        <template #default="{ controlProps }"><input v-bind="controlProps"></template>
        <template #help>帮助信息</template>
        <template #error="{ errorId, message }"><p :id="errorId" role="alert">检查：{{ message }}</p></template>
      </LuluFormItem>`,
    })
    expect(wrapper.get('input').attributes('aria-describedby')).toBe('external-help external-error')
    expect(wrapper.get('[role="alert"]').text()).toBe('检查：业务错误')
    await wrapper.setData({ error: '' })
    expect(wrapper.get('input').attributes('aria-describedby')).toBe('external-help')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    wrapper.unmount()
  })
})
