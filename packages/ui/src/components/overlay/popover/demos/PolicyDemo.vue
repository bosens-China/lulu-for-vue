<script setup lang="ts">
import { ref } from 'vue'
import LuluPopover from '@lulu/vue/popover'
import LuluButton from '@lulu/vue/button'
import LuluCheckbox from '@lulu/vue/checkbox'
import type { FloatingPlacement } from '@lulu/vue/popover'
import '@lulu/vue/popover/style.css'
import '@lulu/vue/button/style.css'
import '@lulu/vue/checkbox/style.css'
const open = ref(false)
const disabled = ref(false)
const closeOnOutside = ref(true)
const closeOnEscape = ref(true)
const offset = ref(12)
const placement = ref<FloatingPlacement>('bottom-start')
const placements: FloatingPlacement[] = ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end']
</script>

<template>
  <div class="grid gap-4">
    <label>位置 <select v-model="placement" aria-label="浮层位置"><option v-for="item in placements" :key="item" :value="item">{{ item }}</option></select></label>
    <label>间距 <input v-model.number="offset" type="range" min="0" max="32" aria-label="浮层间距"> {{ offset }}px</label>
    <div class="flex flex-wrap gap-4"><LuluCheckbox v-model="disabled" @update:model-value="open = false">禁用气泡</LuluCheckbox><LuluCheckbox v-model="closeOnOutside">点击外部关闭</LuluCheckbox><LuluCheckbox v-model="closeOnEscape">Escape 关闭</LuluCheckbox></div>
    <LuluPopover v-model:open="open" :disabled="disabled" :placement="placement" :offset="offset" :close-on-outside="closeOnOutside" :close-on-escape="closeOnEscape">
      <template #trigger>配置气泡</template>
      <p>当前位置：{{ placement }}</p>
      <LuluButton @click="open = false">关闭气泡</LuluButton>
    </LuluPopover>
    <output>展开：{{ open }}</output>
  </div>
</template>

