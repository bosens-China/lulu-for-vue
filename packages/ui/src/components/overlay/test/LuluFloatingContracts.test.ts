import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LuluButton from '../../action/LuluButton.vue'
import LuluDialog from '../LuluDialog.vue'
import LuluDropdown from '../LuluDropdown.vue'
import LuluPopconfirm from '../LuluPopconfirm.vue'
import LuluPopover from '../LuluPopover.vue'
import type { FloatingTriggerProps } from '../FloatingTrigger'

enableAutoUnmount(afterEach)
afterEach(() => {
  document.body.replaceChildren()
  vi.restoreAllMocks()
})

describe('浮层组合契约', () => {
  it('对话框稍后打开时，内部浮层仍留在模态 DOM 内', async () => {
    const theme = document.createElement('section')
    theme.dataset.luluTheme = 'dark'
    document.body.append(theme)
    const wrapper = mount(LuluDialog, {
      attachTo: theme,
      props: { open: false },
      slots: { default: () => h(LuluPopover, null, { default: () => '筛选条件' }) },
    })
    await nextTick()
    await wrapper.setProps({ open: true })
    await wrapper.get('.lulu-popover__trigger').trigger('click')
    const panel = document.body.querySelector('.lulu-popover__panel')
    expect(panel?.parentElement).toBe(wrapper.get('dialog').element)
  })

  it('展开期间修改 placement 和 offset 会更新位置', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      return this.classList.contains('lulu-popover__trigger')
        ? new DOMRect(100, 100, 40, 20) : new DOMRect(0, 0, 100, 50)
    })
    const wrapper = mount(LuluPopover, { attachTo: document.body, props: { open: true } })
    await nextTick()
    await nextTick()
    const panel = document.body.querySelector<HTMLElement>('.lulu-popover__panel')!
    expect(panel.style.top).toBe('128px')
    await wrapper.setProps({ placement: 'top-end', offset: 20 })
    await flushPromises()
    expect(panel.style.top).toBe('30px')
    expect(panel.style.left).toBe('40px')
  })

  it('同页独立应用有相同生成 id 时仍找到各自触发器并定位', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      return this.classList.contains('lulu-popover__trigger')
        ? new DOMRect(100, 100, 40, 20) : new DOMRect(0, 0, 100, 50)
    })
    const first = mount(LuluPopover, { attachTo: document.body })
    const second = mount(LuluPopover, { attachTo: document.body, props: { open: true } })
    expect(first.get('button').attributes('id')).toBe(second.get('button').attributes('id'))
    await nextTick()
    await nextTick()
    const panel = document.body.querySelector<HTMLElement>('.lulu-popover__panel')!
    expect(panel.style.top).toBe('128px')
    expect(panel.style.left).toBe('100px')
  })

  it.each([LuluPopover, LuluDropdown, LuluPopconfirm])('scoped trigger 复用 LuluButton 且没有嵌套按钮', async (component) => {
    const wrapper = mount(component, {
      attachTo: document.body,
      slots: {
        trigger: ({ triggerProps }: { triggerProps: FloatingTriggerProps }) =>
          h(LuluButton, { ...triggerProps }, () => '打开'),
      },
    })
    expect(wrapper.findAll('button')).toHaveLength(1)
    expect(wrapper.find('button button').exists()).toBe(false)
    const trigger = wrapper.get('button')
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(document.getElementById(trigger.attributes('aria-controls')!)).not.toBeNull()
  })
})

describe('Popconfirm 异步确认', () => {
  it('等待期间防重入并阻止外部与 Escape 关闭，成功后确认', async () => {
    let resolve!: () => void
    const beforeConfirm = vi.fn(() => new Promise<void>((done) => { resolve = done }))
    const wrapper = mount(LuluPopconfirm, {
      attachTo: document.body,
      props: { beforeConfirm },
    })
    await wrapper.get('.lulu-popover__trigger').trigger('click')
    const confirm = document.body.querySelector<HTMLButtonElement>('.lulu-popconfirm__actions button:last-child')!
    confirm.focus()
    confirm.click()
    confirm.click()
    await nextTick()
    expect(beforeConfirm).toHaveBeenCalledOnce()
    expect(confirm.disabled).toBe(true)
    expect(confirm.textContent).toBe('处理中…')
    expect(wrapper.get('.lulu-popover__trigger').attributes('disabled')).toBeDefined()
    document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(document.body.querySelector('.lulu-popover__panel')).not.toBeNull()
    resolve()
    await flushPromises()
    expect(wrapper.emitted('confirm')).toEqual([[]])
    expect(document.body.querySelector('.lulu-popover__panel')).toBeNull()
    expect(document.activeElement).toBe(wrapper.get('.lulu-popover__trigger').element)
  })

  it('校验失败和异常保持打开，异常可反馈并重试', async () => {
    const cause = new Error('保存失败')
    const beforeConfirm = vi.fn<() => Promise<void | false>>()
      .mockResolvedValueOnce(false)
      .mockRejectedValueOnce(cause)
      .mockResolvedValueOnce(undefined)
    const wrapper = mount(LuluPopconfirm, { attachTo: document.body, props: { beforeConfirm } })
    await wrapper.get('.lulu-popover__trigger').trigger('click')
    const confirm = document.body.querySelector<HTMLButtonElement>('.lulu-popconfirm__actions button:last-child')!
    confirm.click()
    await flushPromises()
    expect(wrapper.emitted('confirm')).toBeUndefined()
    confirm.click()
    await flushPromises()
    expect(document.body.querySelector('[role="alert"]')?.textContent).toBe('保存失败')
    expect(wrapper.emitted('error')).toEqual([[cause]])
    confirm.click()
    await flushPromises()
    expect(wrapper.emitted('confirm')).toEqual([[]])
  })

  it('外部关闭后忽略迟到的确认结果', async () => {
    let resolve!: () => void
    const wrapper = mount(LuluPopconfirm, {
      attachTo: document.body,
      props: { open: true, beforeConfirm: () => new Promise<void>((done) => { resolve = done }) },
    })
    await nextTick()
    document.body.querySelector<HTMLButtonElement>('.lulu-popconfirm__actions button:last-child')!.click()
    await wrapper.setProps({ open: false })
    resolve()
    await flushPromises()
    expect(wrapper.emitted('confirm')).toBeUndefined()
  })
})
