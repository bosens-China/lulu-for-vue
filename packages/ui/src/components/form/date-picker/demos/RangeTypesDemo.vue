<script setup lang="ts">
import { reactive } from 'vue'
import LuluDateRangePicker from '@lulu/vue/date-range-picker'
import '@lulu/vue/date-range-picker/style.css'
const values = reactive<Record<'date' | 'month' | 'week', [string, string]>>({ date: ['2026-09-01', '2026-09-25'], month: ['2026-01', '2026-09'], week: ['2026-W01', '2026-W39'] })
</script>
<template>
  <div class="grid gap-4">
    <div v-for="(_, type) in values" :key="type">
      <p>{{ type }}</p>
      <LuluDateRangePicker v-model="values[type]" :type="type" :start-label="type + ' 开始'" :end-label="type + ' 结束'" />
      <output>{{ values[type].join(' 至 ') }}</output>
    </div>
  </div>
</template>
