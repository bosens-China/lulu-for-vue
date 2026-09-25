<script setup lang="ts">
import LuluTooltip from '@lulu/vue/tooltip'
import '@lulu/vue/tooltip/style.css'
</script>

<template>
  <LuluTooltip>
    <template #trigger="{ triggerProps }"><button type="button" v-bind="triggerProps">聚焦或悬停查看提示</button></template>
    这是一段辅助说明。
  </LuluTooltip>
</template>
