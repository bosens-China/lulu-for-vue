<script setup lang="ts">
import { provide, shallowRef, useId } from 'vue'
import {
  tabsContextKey,
  type TabsContext,
  type TabsValue,
} from './tabs-context'

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<TabsValue>({ required: true })
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

function focusRelative(value: TabsValue, offset: -1 | 1) {
  const enabledTabs = registeredTabs.value.filter((tab) => !tab.isDisabled())
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

function isTabbable(value: TabsValue, disabled: boolean) {
  if (disabled) return false

  const enabledTabs = registeredTabs.value.filter((tab) => !tab.isDisabled())
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
