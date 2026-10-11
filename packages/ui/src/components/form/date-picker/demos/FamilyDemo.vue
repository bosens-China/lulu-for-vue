<script setup lang="ts">
import { ref } from 'vue'
import LuluDatePicker from '@lulu/vue/date-picker'
import '@lulu/vue/date-picker/style.css'
const year = ref('2026')
const dateTime = ref('2026-10-10T09:30')
</script>

<template>
  <div class="grid gap-3">
    <label>年份<LuluDatePicker v-model="year" picker="year" min="2000" max="2100" /></label>
    <label>日期与时间<LuluDatePicker v-model="dateTime" show-time :step="60" /></label>
    <output>{{ year }} / {{ dateTime }}</output>
  </div>
</template>
