<script setup lang="ts">
import { ref } from 'vue'
import LuluDatePicker from '@lulu/vue/date-picker'
import '@lulu/vue/date-picker/style.css'

const value = ref('2026-09-15')
</script>

<template>
  <div class="grid gap-4">
    <LuluDatePicker v-model="value" min="2026-09-01" max="2026-09-29" :step="2" required aria-label="预约日期（必填）" />
    <output>预约：{{ value || '未选择' }}</output>
    <p>仅允许 9 月 1 日至 29 日，以 1 日为基准每隔两天；原生表单提交时检查约束。</p>
    <LuluDatePicker model-value="2026-09-15" disabled aria-label="禁用日期" />
    <LuluDatePicker model-value="" invalid aria-label="错误日期" aria-describedby="date-state-error" />
    <p id="date-state-error">请选择有效的预约日期。</p>
  </div>
</template>

