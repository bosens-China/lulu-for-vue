import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluDialog from '../LuluDialog.vue'

describe('LuluDialog', () => {
  it('卸载仍打开的原生对话框时归还先前焦点', () => {
    const trigger = document.createElement('button')
    document.body.append(trigger)
    trigger.focus()
    const wrapper = mount(LuluDialog, {
      attachTo: document.body,
      props: { open: true },
    })
    expect(wrapper.get('dialog').element.open).toBe(true)

    wrapper.unmount()
    expect(document.activeElement).toBe(trigger)
    trigger.remove()
  })

  it('renders a native dialog with title and content slots', () => {
    const wrapper = mount(LuluDialog, {
      props: {
        open: true,
        title: 'Delete project',
      },
      slots: {
        default: '<p>Delete this project permanently?</p>',
        footer: '<button type="button">Cancel</button>',
      },
    })

    const dialog = wrapper.get('dialog')

    expect(dialog.element).toBeInstanceOf(HTMLDialogElement)
    expect(dialog.attributes('aria-labelledby')).toBeTruthy()
    expect(wrapper.text()).toContain('Delete project')
    expect(wrapper.text()).toContain('Delete this project permanently?')
    expect(wrapper.get('.lulu-dialog__footer').text()).toContain('Cancel')
  })

  it('lets the header slot replace the title', () => {
    const wrapper = mount(LuluDialog, {
      props: {
        open: true,
        title: 'Fallback title',
      },
      slots: {
        header: '<h2>Custom heading</h2>',
      },
    })

    expect(wrapper.get('.lulu-dialog__title').text()).toBe('Custom heading')
    expect(wrapper.text()).not.toContain('Fallback title')
  })

  it('updates v-model and reports a close-button request', async () => {
    const wrapper = mount(LuluDialog, {
      props: {
        open: true,
      },
    })

    await wrapper.get('[aria-label="Close dialog"]').trigger('click')

    expect(wrapper.emitted('update:open')).toEqual([[false]])
    expect(wrapper.emitted('close')).toEqual([['close-button']])
  })

  it('only closes from an overlay click when enabled', async () => {
    const enabled = mount(LuluDialog, {
      props: {
        open: true,
        closeOnOverlay: true,
      },
    })
    const disabled = mount(LuluDialog, {
      props: {
        open: true,
        closeOnOverlay: false,
      },
    })

    await enabled.get('dialog').trigger('click')
    await disabled.get('dialog').trigger('click')

    expect(enabled.emitted('close')).toEqual([['overlay']])
    expect(disabled.emitted('update:open')).toBeUndefined()
  })

  it('handles Escape through the native cancel event', () => {
    const closable = mount(LuluDialog, {
      props: {
        open: true,
      },
    })
    const persistent = mount(LuluDialog, {
      props: {
        open: true,
        closeOnEscape: false,
      },
    })
    const closeEvent = new Event('cancel', { cancelable: true })
    const persistentEvent = new Event('cancel', { cancelable: true })

    closable.get('dialog').element.dispatchEvent(closeEvent)
    persistent.get('dialog').element.dispatchEvent(persistentEvent)

    expect(closeEvent.defaultPrevented).toBe(true)
    expect(closable.emitted('update:open')).toEqual([[false]])
    expect(closable.emitted('close')).toEqual([['escape']])
    expect(persistentEvent.defaultPrevented).toBe(true)
    expect(persistent.emitted('update:open')).toBeUndefined()
  })

  it('reflects an external v-model change to the native dialog', async () => {
    const wrapper = mount(LuluDialog, {
      props: {
        open: true,
      },
    })

    expect(wrapper.get('dialog').element.open).toBe(true)

    await wrapper.setProps({ open: false })

    expect(wrapper.get('dialog').element.open).toBe(false)
    expect(wrapper.emitted('close')).toBeUndefined()
  })
})
