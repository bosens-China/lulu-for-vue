import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createSSRApp, defineComponent, h, inject, nextTick, provide, shallowRef } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LuluDialogHost from '../LuluDialogHost.vue'
import { useDialog, type DialogApi } from '../useDialog'
import LuluMessageHost from '../../feedback/LuluMessageHost.vue'
import { useMessage, type MessageApi } from '../../feedback/useMessage'

enableAutoUnmount(afterEach)
const options = { title: '确认删除', content: '删除后无法恢复' }

function setup() {
  let dialog!: DialogApi
  let message!: MessageApi
  const visible = shallowRef(true)
  const Consumer = defineComponent({
    setup() {
      dialog = useDialog()
      message = useMessage()
      return () => h('button', '触发器')
    },
  })
  const wrapper = mount(LuluMessageHost, {
    attachTo: document.body,
    slots: { default: () => h(LuluDialogHost, null, { default: () => visible.value ? h(Consumer) : null }) },
  })
  return { wrapper, dialog, message, visible }
}

describe('LuluDialogHost / useDialog', () => {
  it('确认先聚焦取消，普通弹窗聚焦标题', async () => {
    const { wrapper, dialog } = setup()
    const result = dialog.confirm(options)
    await nextTick()
    expect(document.activeElement).toBe(wrapper.get('.lulu-dialog__footer button').element)
    await wrapper.get('.lulu-dialog__footer button').trigger('click')
    await result

    const handle = dialog.open(options)
    await nextTick()
    expect(document.activeElement).toBe(wrapper.get('.lulu-dialog__title').element)
    handle.close()
    await handle.closed
  })

  it('确认返回 true，取消返回 false，并按顺序展示', async () => {
    const { wrapper, dialog } = setup()
    const first = dialog.confirm(options)
    const second = dialog.confirm({ ...options, title: '第二条' })
    await nextTick()
    expect(wrapper.findAll('dialog')).toHaveLength(1)
    expect(wrapper.get('dialog').text()).toContain('确认删除')
    await wrapper.get('.lulu-dialog__footer button:last-child').trigger('click')
    await expect(first).resolves.toBe(true)
    expect(wrapper.get('dialog').text()).toContain('第二条')
    await wrapper.get('.lulu-dialog__footer button').trigger('click')
    await expect(second).resolves.toBe(false)
    expect(wrapper.find('dialog').exists()).toBe(false)
  })

  it('open 支持响应式内容、幂等关闭和焦点恢复；排队实例可提前关闭', async () => {
    const { wrapper, dialog } = setup()
    const trigger = wrapper.get('button').element
    trigger.focus()
    const text = shallowRef('初始内容')
    const current = dialog.open({ ...options, content: () => h('strong', text.value) })
    const queued = dialog.open({ ...options, title: '不应显示' })
    queued.close()
    await queued.closed
    text.value = '最新内容'
    await nextTick()
    expect(wrapper.get('strong').text()).toBe('最新内容')
    expect(wrapper.text()).not.toContain('不应显示')
    current.close()
    current.close()
    await current.closed
    expect(wrapper.find('dialog').exists()).toBe(false)
    expect(document.activeElement).toBe(trigger)
  })

  it.each(['cancel', 'close', 'overlay'])('关闭路径 %s 结束确认等待', async (reason) => {
    const { wrapper, dialog } = setup()
    const result = dialog.confirm({ ...options, closeOnOverlay: true })
    await nextTick()
    if (reason === 'close') await wrapper.get('[aria-label="Close dialog"]').trigger('click')
    else if (reason === 'overlay') await wrapper.get('dialog').trigger('click')
    else wrapper.get('dialog').element.dispatchEvent(new Event('cancel', { cancelable: true }))
    await expect(result).resolves.toBe(false)
  })

  it('遵循关闭策略；alert 在确认后结束', async () => {
    const { wrapper, dialog } = setup()
    const done = vi.fn()
    const result = dialog.alert({ ...options, closable: false, closeOnEscape: false })
    void result.then(done)
    await nextTick()
    expect(wrapper.find('[aria-label="Close dialog"]').exists()).toBe(false)
    wrapper.get('dialog').element.dispatchEvent(new Event('cancel', { cancelable: true }))
    await wrapper.get('dialog').trigger('click')
    expect(done).not.toHaveBeenCalled()
    await wrapper.get('.lulu-dialog__footer button').trigger('click')
    await result
    expect(done).toHaveBeenCalledOnce()
  })

  it('异步确认防重入、禁止取消，失败显示错误并允许重试', async () => {
    const { wrapper, dialog } = setup()
    let reject!: (error: Error) => void
    const onConfirm = vi.fn<() => Promise<void>>().mockImplementationOnce(() => new Promise((_resolve, fail) => { reject = fail }))
      .mockResolvedValueOnce(undefined)
    const result = dialog.confirm({ ...options, onConfirm })
    await nextTick()
    await wrapper.get('.lulu-dialog__footer button:last-child').trigger('click')
    expect(wrapper.get('dialog').attributes('aria-busy')).toBe('true')
    expect(wrapper.get('.lulu-dialog__footer button').attributes('disabled')).toBeDefined()
    expect(wrapper.find('[aria-label="Close dialog"]').exists()).toBe(false)
    wrapper.get('dialog').element.dispatchEvent(new Event('cancel', { cancelable: true }))
    await wrapper.get('.lulu-dialog__footer button:last-child').trigger('click')
    expect(onConfirm).toHaveBeenCalledOnce()
    reject(new Error('保存失败'))
    await flushPromises()
    expect(wrapper.get('[role="alert"]').text()).toBe('保存失败')
    await wrapper.get('.lulu-dialog__footer button:last-child').trigger('click')
    await expect(result).resolves.toBe(true)
  })

  it('onConfirm 返回 false 保持打开', async () => {
    const { wrapper, dialog } = setup()
    const result = dialog.confirm({ ...options, onConfirm: () => false })
    await nextTick()
    await wrapper.get('.lulu-dialog__footer button:last-child').trigger('click')
    expect(wrapper.get('dialog').attributes('aria-busy')).toBe('false')
    await wrapper.get('.lulu-dialog__footer button').trigger('click')
    await expect(result).resolves.toBe(false)
  })

  it('调用者卸载清理活动及排队请求，忽略迟到的异步结果', async () => {
    const { wrapper, dialog, visible } = setup()
    let resolve!: () => void
    const first = dialog.confirm({ ...options, onConfirm: () => new Promise<void>((done) => { resolve = done }) })
    const second = dialog.alert(options)
    await nextTick()
    await wrapper.get('.lulu-dialog__footer button:last-child').trigger('click')
    visible.value = false
    await nextTick()
    await expect(first).resolves.toBe(false)
    await expect(second).resolves.toBeUndefined()
    resolve()
    await flushPromises()
    expect(wrapper.find('dialog').exists()).toBe(false)
    expect(() => dialog.open(options)).toThrow('disposed')
  })

  it('Host 卸载结束全部请求', async () => {
    const { wrapper, dialog } = setup()
    const first = dialog.confirm(options)
    const second = dialog.open(options)
    wrapper.unmount()
    await expect(first).resolves.toBe(false)
    await expect(second.closed).resolves.toBeUndefined()
  })

  it('将外层消息显示在模态框内，关闭后保留消息', async () => {
    const { wrapper, dialog, message } = setup()
    const handle = dialog.open(options)
    await nextTick()
    message.error('服务暂不可用', { duration: 0 })
    await nextTick()
    expect(wrapper.get('dialog .lulu-message').text()).toContain('服务暂不可用')
    handle.close()
    await handle.closed
    await nextTick()
    expect(wrapper.get('.lulu-message').text()).toContain('服务暂不可用')
  })

  it('不同 Host 互相隔离，拒绝非法内容', async () => {
    const first = setup()
    const second = setup()
    expect(() => first.dialog.open({ ...options, title: '' })).toThrow(TypeError)
    const handle = first.dialog.open(options)
    await nextTick()
    expect(first.wrapper.find('dialog').exists()).toBe(true)
    expect(second.wrapper.find('dialog').exists()).toBe(false)
    handle.close()
    await handle.closed
  })

  it('SSR 可获取 API，但不能显示弹窗；没有 Host 时明确报错', async () => {
    const Consumer = defineComponent({ setup() {
      const dialog = useDialog()
      expect(() => dialog.open(options)).toThrow('client')
      return () => h('span', '服务端内容')
    } })
    const app = createSSRApp({ setup() {
      return () => h(LuluDialogHost, null, { default: () => h(Consumer) })
    } })
    expect(await renderToString(app)).toContain('服务端内容')
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      expect(() => mount(Consumer)).toThrow('LuluDialogHost')
    } finally { warn.mockRestore() }
  })

  it('动态内容继承 Host 的上下文，调用者的局部提供值不泄漏', async () => {
    let dialog!: DialogApi
    const Content = defineComponent({ setup() {
      const context = inject('example')
      return () => h('p', String(context))
    } })
    const Consumer = defineComponent({ setup() {
      provide('example', 'caller')
      dialog = useDialog()
      return () => null
    } })
    const Root = defineComponent({ setup() {
      provide('example', 'host')
      return () => h(LuluDialogHost, null, { default: () => h(Consumer) })
    } })
    const wrapper = mount(Root)
    const handle = dialog.open({ ...options, content: () => h(Content) })
    await nextTick()
    expect(wrapper.get('.lulu-dialog__body').text()).toBe('host')
    handle.close()
    await handle.closed
  })
})
