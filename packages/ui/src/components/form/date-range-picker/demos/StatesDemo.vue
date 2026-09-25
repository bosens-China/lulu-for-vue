<script setup lang="ts">
import { ref } from 'vue'
import LuluDateRangePicker from '@lulu/vue/date-range-picker'
import '@lulu/vue/date-range-picker/style.css'

const value = ref<[string, string]>(['2026-09-10', '2026-09-20'])
</script>

<template>
  <div class="grid gap-4">
    <LuluDateRangePicker v-model="value" min="2026-09-01" max="2026-09-30" required start-label="必填开始日期" end-label="必填结束日期" />
    <output>{{ value.join(' 至 ') }}</output>
    <LuluDateRangePicker :model-value="['2026-09-10', '2026-09-20']" disabled start-label="禁用开始" end-label="禁用结束" />
    <LuluDateRangePicker :model-value="['', '']" invalid start-label="错误开始" end-label="错误结束" aria-describedby="range-date-error" />
    <p id="range-date-error">请填写完整且有序的日期区间。</p>
  </div>
</template>

