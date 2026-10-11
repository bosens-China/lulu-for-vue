<script setup lang="ts">
import { ref } from 'vue'
import LuluDateRangePicker from '@lulu/vue/date-range-picker'
import '@lulu/vue/date-range-picker/style.css'

const range = ref<[string, string]>(['2026-08-12', '2026-08-18'])
</script>

<template>
  <LuluDateRangePicker v-model="range" start-name="from" end-name="to" start-label="开始日期" end-label="结束日期" />
  <p class="mt-3 text-sm">已选：{{ range.join(' 至 ') }}</p>
</template>
