import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ResetDemo from '../../../../packages/ui/src/components/form/form/demos/ResetDemo.vue'
import CheckboxDemo from '../../../../packages/ui/src/components/form/checkbox/demos/StatesDemo.vue'
import TableDemo from '../../../../packages/ui/src/components/data/data-table/demos/StatesDemo.vue'
import TabsDemo from '../../../../packages/ui/src/components/navigation/tabs/demos/NumericDemo.vue'
import MessageDemo from '../../../../packages/ui/src/components/feedback/message/demos/DurationDemo.vue'
import QueueDemo from '../../../../packages/ui/src/components/feedback/message-host/demos/QueueDemo.vue'

enableAutoUnmount(afterEach)
afterEach(() => vi.useRealTimers())

describe('文档场景交互', () => {
  it('复位同时清理业务模型、错误和提交状态', async () => {
    const wrapper = mount(ResetDemo)
    await wrapper.get('input').setValue('audit@invalid.com')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.text()).toContain('请使用 example.com 邮箱')
    await wrapper.findAll('button')[1]!.trigger('click')
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('')
    expect(wrapper.find('.lulu-field-error').exists()).toBe(false)
    expect(wrapper.text()).toContain('数据与校验已重置')
  })

  it('半选点击后清除，并可恢复', async () => {
    const wrapper = mount(CheckboxDemo)
    await wrapper.vm.$nextTick()
    const input = wrapper.get('input')
    expect((input.element as HTMLInputElement).indeterminate).toBe(true)
    await input.setValue(true)
    expect((input.element as HTMLInputElement).indeterminate).toBe(false)
    await wrapper.get('button').trigger('click')
    expect((input.element as HTMLInputElement).indeterminate).toBe(true)
  })

  it('表格状态插槽覆盖文案，退出状态后恢复单元格', async () => {
    const wrapper = mount(TableDemo)
    const controls = wrapper.findAll('input[type="checkbox"]')
    expect(wrapper.text()).toContain('¥100')
    await controls[0]!.setValue(true)
    expect(wrapper.text()).toContain('订单加载中…')
    await controls[2]!.setValue(true)
    expect(wrapper.text()).toContain('正在获取订单，请稍候。')
    await controls[0]!.setValue(false)
    await controls[1]!.setValue(true)
    expect(wrapper.text()).toContain('没有订单，试试取消“无数据”。')
    await controls[1]!.setValue(false)
    expect(wrapper.text()).toContain('¥100')
  })

  it('数字标签使用方向键跳过禁用项', async () => {
    const wrapper = mount(TabsDemo)
    await wrapper.get('[role="tab"]').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.get('[role="tabpanel"]:not([hidden])').text()).toContain('当前显示操作记录')
    expect(wrapper.get('output').text()).toContain('3')
  })

  it('定时消息由父组件移除，重新打开重新计时', async () => {
    vi.useFakeTimers()
    const wrapper = mount(MessageDemo)
    await wrapper.get('button').trigger('click')
    expect(wrapper.find('.lulu-message').exists()).toBe(true)
    await vi.advanceTimersByTimeAsync(2000)
    expect(wrapper.find('.lulu-message').exists()).toBe(false)
    await wrapper.get('button').trigger('click')
    expect(wrapper.find('.lulu-message').exists()).toBe(true)
  })

  it('队列使用宿主默认时长，单条覆盖与手动句柄分别生效', async () => {
    vi.useFakeTimers()
    const wrapper = mount(QueueDemo)
    await wrapper.findAll('button')[0]!.trigger('click')
    expect(wrapper.findAll('.lulu-message')).toHaveLength(4)
    await vi.advanceTimersByTimeAsync(2500)
    expect(wrapper.findAll('.lulu-message')).toHaveLength(2)
    await vi.advanceTimersByTimeAsync(2500)
    expect(wrapper.findAll('.lulu-message')).toHaveLength(0)
    await wrapper.findAll('button')[1]!.trigger('click')
    await vi.advanceTimersByTimeAsync(10000)
    expect(wrapper.findAll('.lulu-message')).toHaveLength(1)
    await wrapper.findAll('button')[2]!.trigger('click')
    expect(wrapper.findAll('.lulu-message')).toHaveLength(0)
  })
})
