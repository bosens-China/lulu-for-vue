<script setup lang="ts">
import { ref } from 'vue'
import LuluSelect from '@lulu/vue/select'
import '@lulu/vue/select/style.css'

const selected = ref<string[]>(['vue'])
</script>

<template>
  <div class="grid gap-4">
    <LuluSelect v-model="selected" multiple aria-label="选择技术栈" size="3">
      <option value="vue">Vue</option><option value="ts">TypeScript</option><option value="css">CSS</option>
    </LuluSelect>
    <output>已选：{{ selected.join('、') || '无' }}</output>
    <LuluSelect model-value="vue" disabled aria-label="禁用选择"><option value="vue">Vue</option></LuluSelect>
    <LuluSelect model-value="" invalid aria-label="错误选择" aria-describedby="select-state-error"><option value="">请选择技术栈</option></LuluSelect>
    <p id="select-state-error">至少选择一项。桌面原生多选可配合 Ctrl / Command 操作。</p>
  </div>
</template>

