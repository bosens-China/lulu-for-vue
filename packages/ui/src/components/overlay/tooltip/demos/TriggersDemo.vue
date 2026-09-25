<script setup lang="ts">
import { shallowRef } from 'vue'
import LuluTooltip from '@lulu/vue/tooltip'
import '@lulu/vue/tooltip/style.css'
const open = shallowRef(false)
</script>
<template>
  <div class="flex flex-wrap gap-4">
    <LuluTooltip v-for="trigger in (['hover', 'focus', 'click'] as const)" :key="trigger" :trigger="trigger">
      <template #trigger="{ triggerProps }"><button type="button" v-bind="triggerProps">{{ trigger }}</button></template>
      {{ trigger }} 触发的提示
    </LuluTooltip>
    <LuluTooltip v-model:open="open" trigger="manual">
      <template #trigger="{ triggerProps }"><button type="button" v-bind="triggerProps" @click="open = !open">手动切换提示</button></template>
      由父组件控制显示
    </LuluTooltip>
  </div>
</template>
