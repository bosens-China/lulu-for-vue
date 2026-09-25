import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import LuluDropdown from '../LuluDropdown.vue'
import LuluPopconfirm from '../LuluPopconfirm.vue'
import LuluPopover from '../LuluPopover.vue'
import LuluTooltip from '../LuluTooltip.vue'

afterEach(() => {
  document.body.replaceChildren()
})

describe('LuluPopover', () => {
  it('外部受控关闭时从浮层操作恢复到触发器', async () => {
    const wrapper = mount(LuluPopover, {
      attachTo: document.body,
      props: { open: true },
      slots: { default: '<button type="button">完成</button>', trigger: '打开' },
    })
    await nextTick()
    const action = document.body.querySelector<HTMLButtonElement>('[role="dialog"] button')
    action?.focus()
    expect(document.activeElement).toBe(action)

    await wrapper.setProps({ open: false })
    expect(document.activeElement).toBe(wrapper.get('.lulu-popover__trigger').element)
    wrapper.unmount()
  })

  it('打开操作卡片时聚焦首个操作，Escape 后归还触发器', async () => {
    const wrapper = mount(LuluPopover, {
      attachTo: document.body,
      slots: { default: '<button type="button">取消</button>', trigger: '打开' },
    })

    await wrapper.get('.lulu-popover__trigger').trigger('click')
    expect(document.activeElement?.textContent).toBe('取消')

    document.activeElement?.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
    await nextTick()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
    expect(document.activeElement).toBe(wrapper.get('.lulu-popover__trigger').element)
  })

  it('局部主题中的浮层继承主题作用域', async () => {
    const themeRoot = document.createElement('section')
    themeRoot.dataset.luluTheme = 'dark'
    document.body.append(themeRoot)
    const wrapper = mount(LuluPopover, {
      attachTo: themeRoot,
      slots: { default: 'Themed content', trigger: 'Open' },
    })

    await wrapper.get('.lulu-popover__trigger').trigger('click')

    expect(themeRoot.querySelector('[role="dialog"]')?.parentElement).toBe(themeRoot)
    wrapper.unmount()
  })

  it('通过触发器打开，并在外部按下时关闭', async () => {
    const wrapper = mount(LuluPopover, {
      attachTo: document.body,
      slots: {
        default: 'Popover content',
        trigger: 'Open',
      },
    })

    await wrapper.get('.lulu-popover__trigger').trigger('click')
    expect(document.body.querySelector('[role="dialog"]')?.textContent).toContain('Popover content')

    document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
    await nextTick()

    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
    expect(wrapper.emitted('update:open')).toEqual([[true], [false]])
  })
})

describe('LuluTooltip', () => {
  it('交互式触发器只保留一个 Tab 停靠点并接收描述关联', async () => {
    const wrapper = mount(LuluTooltip, {
      attachTo: document.body,
      slots: {
        default: '提示内容',
        trigger: ({ triggerProps }: { triggerProps: { 'aria-describedby': string | undefined } }) =>
          h('button', { type: 'button', ...triggerProps }, '帮助'),
      },
    })

    expect(wrapper.get('.lulu-tooltip__trigger').attributes('tabindex')).toBeUndefined()
    wrapper.get('button').element.focus()
    await nextTick()
    expect(wrapper.get('button').attributes('aria-describedby')).toBe(document.body.querySelector('[role="tooltip"]')?.id)
    wrapper.unmount()
  })

  it('在 hover 时展示内容并在离开后关闭', async () => {
    const wrapper = mount(LuluTooltip, {
      attachTo: document.body,
      slots: {
        default: 'Help text',
        trigger: 'Help',
      },
    })

    await wrapper.get('.lulu-tooltip__trigger').trigger('mouseenter')
    expect(document.body.querySelector('[role="tooltip"]')?.textContent).toContain('Help text')

    await wrapper.get('.lulu-tooltip__trigger').trigger('mouseleave')
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull()
  })
})

describe('LuluDropdown', () => {
  it('选择可用项后发出对象并关闭菜单', async () => {
    const items = [
      { label: 'First', value: 'first' },
      { disabled: true, label: 'Disabled', value: 'disabled' },
    ]
    const wrapper = mount(LuluDropdown, {
      attachTo: document.body,
      props: { items },
      slots: { trigger: 'Actions' },
    })

    await wrapper.get('.lulu-dropdown__trigger').trigger('click')
    const menu = document.body.querySelector('[role="menu"]')
    expect(menu?.textContent).toContain('Disabled')

    ;(menu?.querySelector('[role="menuitem"]') as HTMLButtonElement).click()
    await nextTick()

    expect(wrapper.emitted('select')).toEqual([[items[0]]])
    expect(document.body.querySelector('[role="menu"]')).toBeNull()
    expect(document.activeElement).toBe(wrapper.get('.lulu-dropdown__trigger').element)
  })

  it('按 Escape 关闭菜单后将焦点交还触发按钮', async () => {
    const wrapper = mount(LuluDropdown, {
      attachTo: document.body,
      props: { items: [{ label: 'First', value: 'first' }] },
    })

    await wrapper.get('.lulu-dropdown__trigger').trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement?.textContent).toBe('First')

    document.activeElement?.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }))
    await nextTick()

    expect(document.body.querySelector('[role="menu"]')).toBeNull()
    expect(document.activeElement).toBe(wrapper.get('.lulu-dropdown__trigger').element)
  })
})

describe('LuluPopconfirm', () => {
  it('打开时聚焦取消，确认后将焦点归还触发器', async () => {
    const wrapper = mount(LuluPopconfirm, {
      attachTo: document.body,
      slots: { trigger: '删除' },
    })
    await wrapper.get('.lulu-popover__trigger').trigger('click')
    expect(document.activeElement?.textContent).toBe('Cancel')

    const confirm = [...document.body.querySelectorAll('button')].find(button => button.textContent === 'Confirm')
    confirm?.click()
    await nextTick()
    expect(document.activeElement).toBe(wrapper.get('.lulu-popover__trigger').element)
  })

  it('确认操作会关闭并发出 confirm', async () => {
    const wrapper = mount(LuluPopconfirm, {
      attachTo: document.body,
      props: { message: 'Delete this item?' },
      slots: { trigger: 'Delete' },
    })

    await wrapper.get('.lulu-popover__trigger').trigger('click')
    const confirm = [...document.body.querySelectorAll('button')].find(
      (button) => button.textContent === 'Confirm',
    )
    confirm?.click()
    await nextTick()

    expect(wrapper.emitted('confirm')).toEqual([[]])
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })
})
