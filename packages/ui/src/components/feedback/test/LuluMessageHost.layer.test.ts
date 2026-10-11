import { enableAutoUnmount, mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LuluMessageHost from '../LuluMessageHost.vue'
import { useMessage, type MessageApi } from '../useMessage'
import LuluDialogHost from '../../overlay/LuluDialogHost.vue'
import { useDialog, type DialogApi } from '../../overlay/useDialog'

enableAutoUnmount(afterEach)
afterEach(() => { vi.useRealTimers() })

describe('消息位置与原生模态层组合', () => {
  it('进入弹窗后保持顺序与计时，关闭后恢复屏幕位置', async () => {
    vi.useFakeTimers()
    let message!: MessageApi
    let dialog!: DialogApi
    const Consumer = defineComponent({ setup() {
      message = useMessage()
      dialog = useDialog()
      return () => null
    } })
    const wrapper = mount(LuluMessageHost, {
      attachTo: document.body,
      props: { placement: 'bottom-end', newOnTop: true },
      slots: { default: () => h(LuluDialogHost, null, { default: () => h(Consumer) }) },
    })
    message.info('定时消息', { duration: 500 })
    message.success('常驻消息', { duration: 0 })
    await nextTick()
    vi.advanceTimersByTime(200)

    const handle = dialog.open({ title: '编辑', content: '编辑内容' })
    await nextTick()
    const host = wrapper.get('dialog .lulu-message-host')
    expect(host.attributes('data-placement')).toBe('bottom-end')
    expect(host.findAll('.lulu-message__content').map(message => message.text())).toEqual(['常驻消息', '定时消息'])

    vi.advanceTimersByTime(200)
    handle.close()
    await handle.closed
    await nextTick()
    expect(wrapper.find('dialog').exists()).toBe(false)
    expect(wrapper.get('.lulu-message-host').attributes('data-placement')).toBe('bottom-end')
    expect(wrapper.findAll('.lulu-message')).toHaveLength(2)

    vi.advanceTimersByTime(100)
    await nextTick()
    expect(wrapper.findAll('.lulu-message__content').map(message => message.text())).toEqual(['常驻消息'])
  })
})
