<script setup lang="ts">
import { shallowRef } from 'vue'
import LuluTooltip from '@lulu/vue/tooltip'
import '@lulu/vue/tooltip/style.css'
const open = shallowRef(false)
const lastEvent = shallowRef('尚未触发')
</script>
<template>
  <div class="flex flex-wrap gap-4">
    <LuluTooltip v-for="trigger in (['hover', 'focus', 'click'] as const)" :key="trigger" :trigger="trigger" @open="lastEvent = `${trigger}: open`" @close="lastEvent = `${trigger}: close`">
      <template #trigger="{ triggerProps }"><button type="button" v-bind="triggerProps">{{ trigger }}</button></template>
      {{ trigger }} 触发的提示
    </LuluTooltip>
    <LuluTooltip v-model:open="open" trigger="manual" @open="lastEvent = 'manual: open'" @close="lastEvent = 'manual: close'">
      <template #trigger="{ triggerProps }"><button type="button" v-bind="triggerProps" @click="open = !open">手动切换提示</button></template>
      由父组件控制显示
    </LuluTooltip>
  </div>
  <output class="mt-3 block">最后事件：{{ lastEvent }}</output>
</template>
