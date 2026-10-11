<script setup lang="ts">
import { onUpdated, provide, shallowRef, useAttrs, useId } from 'vue'
import {
  tabsContextKey,
  type TabsContext,
  type TabsValue,
} from './tabs-context'

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<TabsValue>({ required: true })
const attrs = useAttrs()
const rootAttrNames = new Set(['class', 'style', 'data-lulu-theme'])
const tabsId = `lulu-tabs-${useId()}`
const registeredTabs = shallowRef<Parameters<TabsContext['registerTab']>[0][]>([])

function select(value: TabsValue) {
  if (!Object.is(modelValue.value, value)) {
    modelValue.value = value
  }
}

function registerTab(tab: Parameters<TabsContext['registerTab']>[0]) {
  registeredTabs.value = [...registeredTabs.value, tab]

  return () => {
    registeredTabs.value = registeredTabs.value.filter((registeredTab) => registeredTab !== tab)
  }
}

function getOrderedTabs() {
  return [...registeredTabs.value].sort((left, right) => {
    const leftElement = left.getElement()
    const rightElement = right.getElement()

    if (!leftElement || !rightElement || leftElement === rightElement) return 0

    // keyed 标签重排不会重新挂载，键盘导航需跟随当前 DOM 顺序。
    return leftElement.compareDocumentPosition(rightElement) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
  })
}

function getEnabledTabs() {
  return getOrderedTabs().filter((tab) => !tab.isDisabled())
}

onUpdated(() => {
  const orderedTabs = getOrderedTabs()

  // DOM 移动发生在渲染之后，再同步一次顺序以更新无效选中值的 Tab 停靠点。
  if (orderedTabs.some((tab, index) => tab !== registeredTabs.value[index])) {
    registeredTabs.value = orderedTabs
  }
})

function getAttrs(forRoot: boolean) {
  return Object.fromEntries(Object.entries(attrs).filter(([name]) => rootAttrNames.has(name) === forRoot))
}

function focusRelative(value: TabsValue, offset: -1 | 1) {
  const enabledTabs = getEnabledTabs()
  const currentIndex = enabledTabs.findIndex((tab) => Object.is(tab.getValue(), value))

  if (currentIndex < 0 || enabledTabs.length === 0) {
    return
  }

  const nextIndex = (currentIndex + offset + enabledTabs.length) % enabledTabs.length
  const nextTab = enabledTabs[nextIndex]

  if (nextTab) {
    select(nextTab.getValue())
    nextTab.getElement()?.focus()
  }
}

function isTabbable(value: TabsValue, disabled: boolean) {
  if (disabled) return false

  const enabledTabs = getEnabledTabs()
  const hasEnabledActiveTab = enabledTabs.some((tab) => Object.is(tab.getValue(), modelValue.value))

  if (hasEnabledActiveTab || enabledTabs.length === 0) {
    return Object.is(value, modelValue.value)
  }

  return Object.is(value, enabledTabs[0]?.getValue())
}

provide(tabsContextKey, {
  activeValue: modelValue,
  focusRelative,
  isTabbable,
  registerTab,
  select,
  tabsId,
})
</script>

<template>
  <div v-bind="getAttrs(true)" class="lulu-tabs">
    <div
      v-bind="getAttrs(false)"
      class="lulu-tabs__list"
      role="tablist"
      aria-orientation="horizontal"
    >
      <slot name="tabs" />
    </div>
    <div class="lulu-tabs__panels">
      <slot />
    </div>
  </div>
</template>
