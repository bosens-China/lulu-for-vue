<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import {
  getTabId,
  getTabPanelId,
  type TabsValue,
  useTabsContext,
} from './tabs-context'

interface Props {
  disabled?: boolean
  value: TabsValue
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const context = useTabsContext('LuluTab')
const tabButton = useTemplateRef<HTMLButtonElement>('tabButton')
const isActive = computed(() => Object.is(context.activeValue.value, props.value))
const tabId = computed(() => getTabId(context.tabsId, props.value))
const panelId = computed(() => getTabPanelId(context.tabsId, props.value))
let unregister: (() => void) | undefined

onMounted(() => {
  unregister = context.registerTab({
    focus: () => tabButton.value?.focus(),
    getValue: () => props.value,
    isDisabled: () => props.disabled,
  })
})

onBeforeUnmount(() => {
  unregister?.()
})

function select() {
  if (!props.disabled) {
    context.select(props.value)
  }
}

function moveFocus(event: KeyboardEvent) {
  const offset = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : undefined

  if (offset === undefined) {
    return
  }

  event.preventDefault()
  context.focusRelative(props.value, offset)
}
</script>

<template>
  <button
    ref="tabButton"
    type="button"
    class="lulu-tab"
    role="tab"
    :id="tabId"
    :aria-controls="panelId"
    :aria-disabled="props.disabled || undefined"
    :aria-selected="isActive"
    :disabled="props.disabled"
    :tabindex="isActive && !props.disabled ? 0 : -1"
    @click="select"
    @keydown="moveFocus"
  >
    <slot />
  </button>
</template>
