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

  it('将局部主题和布局属性放在根容器，保留标签栏的可访问名称', async () => {
    const attrs = shallowRef({ class: 'account-tabs', style: '--lulu-space-3: 24px', 'data-lulu-theme': 'dark', 'aria-label': '账户设置' })
    const wrapper = mount(defineComponent({
      setup: () => () => h(LuluTabs, { modelValue: 'profile', ...attrs.value }, createSlots()),
    }))
    const root = wrapper.get('.lulu-tabs')
    const list = wrapper.get('[role="tablist"]')

    expect(root.classes()).toContain('account-tabs')
    expect(root.attributes('style')).toContain('--lulu-space-3: 24px')
    expect(root.attributes('data-lulu-theme')).toBe('dark')
    expect(list.attributes('aria-label')).toBe('账户设置')
    expect(list.attributes('style')).toBeUndefined()
    expect(root.attributes('aria-label')).toBeUndefined()

    attrs.value = { ...attrs.value, style: '--lulu-space-3: 32px', 'data-lulu-theme': 'light', 'aria-label': '成员设置' }
    await wrapper.vm.$nextTick()

    expect(root.attributes('style')).toContain('--lulu-space-3: 32px')
    expect(root.attributes('data-lulu-theme')).toBe('light')
    expect(list.attributes('aria-label')).toBe('成员设置')
  })

  it('动态重排后按视觉顺序移动键盘焦点', async () => {
    const values = shallowRef(['profile', 'security', 'billing'])
    const active = shallowRef<TabsValue>('profile')
    const wrapper = mount(defineComponent({
      setup: () => () => h(LuluTabs, {
        modelValue: active.value,
        'onUpdate:modelValue': value => { active.value = value },
      }, {
        tabs: () => values.value.map(value => h(LuluTab, { key: value, value }, () => value)),
      }),
    }), { attachTo: document.body })

    values.value = ['profile', 'billing', 'security']
    await wrapper.vm.$nextTick()
    await wrapper.findAll('button')[0]!.trigger('keydown', { key: 'ArrowRight' })

    expect(active.value).toBe('billing')
    expect(document.activeElement).toBe(wrapper.findAll('button')[1]!.element)

    active.value = 'missing'
    values.value = ['security', 'profile', 'billing']
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('button')[0]!.attributes('tabindex')).toBe('0')
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

  it.each(['missing', 'billing'])(
    'modelValue 为 %s 时仍给首个可用标签保留 Tab 停靠点',
    async (modelValue) => {
      const wrapper = mount(LuluTabs, {
        props: { modelValue },
        slots: createSlots(),
      })
      await wrapper.vm.$nextTick()

      expect(wrapper.get('[data-testid="profile-tab"]').attributes('tabindex')).toBe('0')
      expect(wrapper.get('[data-testid="security-tab"]').attributes('tabindex')).toBe('-1')
      expect(wrapper.get('[data-testid="billing-tab"]').attributes('tabindex')).toBe('-1')
    },
  )
})
