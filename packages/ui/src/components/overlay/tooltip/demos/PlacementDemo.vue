<script setup lang="ts">
import { ref } from 'vue'
import LuluTooltip from '@lulu/vue/tooltip'
import LuluCheckbox from '@lulu/vue/checkbox'
import type { FloatingPlacement } from '@lulu/vue/tooltip'
import '@lulu/vue/tooltip/style.css'
import '@lulu/vue/checkbox/style.css'
const disabled = ref(false)
const placement = ref<FloatingPlacement>('right')
const placements: FloatingPlacement[] = ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end']
</script>

<template>
  <div class="grid gap-4">
    <label>提示位置 <select v-model="placement" aria-label="提示位置"><option v-for="item in placements" :key="item" :value="item">{{ item }}</option></select></label>
    <LuluCheckbox v-model="disabled">禁用提示</LuluCheckbox>
    <LuluTooltip :placement="placement" :offset="16" :disabled="disabled" trigger="click">
      <template #trigger="{ triggerProps }"><button v-bind="triggerProps" type="button" class="rounded border border-solid border-[var(--lulu-color-border)] p-3">点击查看位置提示</button></template>
      位置 {{ placement }}，间距 16px
    </LuluTooltip>
  </div>
</template>

