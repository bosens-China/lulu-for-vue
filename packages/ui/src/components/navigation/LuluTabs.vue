<script setup lang="ts">
import { provide, useId } from 'vue'
import {
  tabsContextKey,
  type TabsContext,
  type TabsValue,
} from './tabs-context'

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<TabsValue>({ required: true })
const tabsId = `lulu-tabs-${useId()}`
const registeredTabs: Parameters<TabsContext['registerTab']>[0][] = []

function select(value: TabsValue) {
  if (!Object.is(modelValue.value, value)) {
    modelValue.value = value
  }
}

function registerTab(tab: Parameters<TabsContext['registerTab']>[0]) {
  registeredTabs.push(tab)

  return () => {
    const index = registeredTabs.indexOf(tab)

    if (index >= 0) {
      registeredTabs.splice(index, 1)
    }
  }
}

function focusRelative(value: TabsValue, offset: -1 | 1) {
  const enabledTabs = registeredTabs.filter((tab) => !tab.isDisabled())
  const currentIndex = enabledTabs.findIndex((tab) => Object.is(tab.getValue(), value))

  if (currentIndex < 0 || enabledTabs.length === 0) {
    return
  }

  const nextIndex = (currentIndex + offset + enabledTabs.length) % enabledTabs.length
  const nextTab = enabledTabs[nextIndex]

  if (nextTab) {
    select(nextTab.getValue())
    nextTab.focus()
  }
}

provide(tabsContextKey, {
  activeValue: modelValue,
  focusRelative,
  registerTab,
  select,
  tabsId,
})
</script>

<template>
  <div class="lulu-tabs">
    <div
      v-bind="$attrs"
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
