import { inject } from 'vue'
import type { InjectionKey, Ref } from 'vue'

export type TabsValue = string | number

interface TabRegistration {
  focus: () => void
  getValue: () => TabsValue
  isDisabled: () => boolean
}

export interface TabsContext {
  activeValue: Readonly<Ref<TabsValue>>
  focusRelative: (value: TabsValue, offset: -1 | 1) => void
  registerTab: (tab: TabRegistration) => () => void
  select: (value: TabsValue) => void
  tabsId: string
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol('lulu-tabs')

/**
 * Tabs 子组件通过受控上下文共享选中值，避免旧版依赖 DOM 属性和命令式关联。
 */
export function useTabsContext(componentName: string) {
  const context = inject(tabsContextKey)

  if (!context) {
    throw new Error(`${componentName} 必须作为 LuluTabs 的子组件使用。`)
  }

  return context
}

export function getTabId(tabsId: string, value: TabsValue) {
  return `${tabsId}-tab-${toIdPart(value)}`
}

export function getTabPanelId(tabsId: string, value: TabsValue) {
  return `${tabsId}-panel-${toIdPart(value)}`
}

function toIdPart(value: TabsValue) {
  return `${typeof value}-${encodeURIComponent(String(value))}`
}
