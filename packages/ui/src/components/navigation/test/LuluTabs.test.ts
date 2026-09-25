import { createSSRApp, defineComponent, h, shallowRef } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import LuluTab from '../LuluTab.vue'
import LuluTabPanel from '../LuluTabPanel.vue'
import LuluTabs from '../LuluTabs.vue'
import type { TabsValue } from '../tabs-context'

function createSlots() {
  return {
    default: () => [
      h(LuluTabPanel, { value: 'profile', 'data-testid': 'profile-panel' }, () => 'Profile panel'),
      h(LuluTabPanel, { value: 'security', 'data-testid': 'security-panel' }, () => 'Security panel'),
      h(LuluTabPanel, { value: 'billing', 'data-testid': 'billing-panel' }, () => 'Billing panel'),
    ],
    tabs: () => [
      h(LuluTab, { value: 'profile', 'data-testid': 'profile-tab' }, () => 'Profile'),
      h(LuluTab, { value: 'security', 'data-testid': 'security-tab' }, () => 'Security'),
      h(LuluTab, { value: 'billing', disabled: true, 'data-testid': 'billing-tab' }, () => 'Billing'),
    ],
  }
}

const ControlledTabs = defineComponent({
  setup() {
    const modelValue = shallowRef<TabsValue>('profile')

    return () => h(
      LuluTabs,
      {
        modelValue: modelValue.value,
        'aria-label': 'Account settings',
        'onUpdate:modelValue': (value: TabsValue) => {
          modelValue.value = value
        },
      },
      createSlots(),
    )
  },
})

afterEach(() => {
  document.body.replaceChildren()
})

describe('LuluTabs', () => {
  it('keeps accessibility ids stable across independent SSR renders', async () => {
    const render = () => renderToString(createSSRApp({
      render: () => h(LuluTabs, { modelValue: 'profile' }, createSlots()),
    }))
    const first = await render()
    const second = await render()
    const idPattern = /id="(lulu-tabs-[^"]+-tab-string-profile)"/

    expect(first.match(idPattern)?.[1]).toBeTruthy()
    expect(second.match(idPattern)?.[1]).toBe(first.match(idPattern)?.[1])
  })

  it('links selected tabs and panels with accessible roles', () => {
    const wrapper = mount(ControlledTabs)
    const profileTab = wrapper.get('[data-testid="profile-tab"]')
    const profilePanel = wrapper.get('[data-testid="profile-panel"]')
    const securityPanel = wrapper.get('[data-testid="security-panel"]')

    expect(wrapper.get('[role="tablist"]').attributes('aria-orientation')).toBe('horizontal')
    expect(profileTab.attributes('role')).toBe('tab')
    expect(profileTab.attributes('aria-selected')).toBe('true')
    expect(profilePanel.attributes('role')).toBe('tabpanel')
    expect(profileTab.attributes('aria-controls')).toBe(profilePanel.attributes('id'))
    expect(profilePanel.attributes('aria-labelledby')).toBe(profileTab.attributes('id'))
    expect(profilePanel.attributes('hidden')).toBeUndefined()
    expect(securityPanel.attributes('hidden')).toBeDefined()
  })

  it('emits the selected value through v-model when a tab is clicked', async () => {
    const wrapper = mount(LuluTabs, {
      props: {
        modelValue: 'profile',
      },
      slots: createSlots(),
    })

    await wrapper.get('[data-testid="security-tab"]').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([['security']])
  })

  it('moves focus and selection with left and right arrows while skipping disabled tabs', async () => {
    const wrapper = mount(ControlledTabs, {
      attachTo: document.body,
    })
    const profileTab = wrapper.get('[data-testid="profile-tab"]')
    const securityTab = wrapper.get('[data-testid="security-tab"]')
    const profileButton = profileTab.element
    const securityButton = securityTab.element

    if (!(profileButton instanceof HTMLButtonElement) || !(securityButton instanceof HTMLButtonElement)) {
      throw new Error('LuluTab 应渲染为按钮。')
    }

    profileButton.focus()
    await profileTab.trigger('keydown', { key: 'ArrowRight' })

    expect(document.activeElement).toBe(securityButton)
    expect(securityTab.attributes('aria-selected')).toBe('true')
    expect(wrapper.get('[data-testid="security-panel"]').attributes('hidden')).toBeUndefined()

    await securityTab.trigger('keydown', { key: 'ArrowRight' })

    expect(document.activeElement).toBe(profileButton)
    expect(profileTab.attributes('aria-selected')).toBe('true')

    await profileTab.trigger('keydown', { key: 'ArrowLeft' })

    expect(document.activeElement).toBe(securityButton)
  })
})
