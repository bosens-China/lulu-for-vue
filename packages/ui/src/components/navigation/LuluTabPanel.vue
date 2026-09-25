<script setup lang="ts">
import { computed } from 'vue'
import {
  getTabId,
  getTabPanelId,
  type TabsValue,
  useTabsContext,
} from './tabs-context'

interface Props {
  value: TabsValue
}

const props = defineProps<Props>()
const context = useTabsContext('LuluTabPanel')
const isActive = computed(() => Object.is(context.activeValue.value, props.value))
const tabId = computed(() => getTabId(context.tabsId, props.value))
const panelId = computed(() => getTabPanelId(context.tabsId, props.value))
</script>

<template>
  <div
    class="lulu-tab-panel"
    role="tabpanel"
    :id="panelId"
    :aria-labelledby="tabId"
    :hidden="!isActive"
  >
    <slot />
  </div>
</template>
