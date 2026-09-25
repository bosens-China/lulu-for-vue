<script setup lang="ts">
import { reactive } from 'vue'
import LuluDatePicker from '@lulu/vue/date-picker'
import '@lulu/vue/date-picker/style.css'
const values = reactive({ date: '2026-09-25', 'datetime-local': '2026-09-25T09:30', month: '2026-09', time: '09:30', week: '2026-W39' })
</script>
<template>
  <div class="grid gap-4">
    <label v-for="(_, type) in values" :key="type" class="grid gap-2">
      {{ type }}
      <LuluDatePicker v-model="values[type]" :type="type" />
      <output>{{ values[type] || '未选择' }}</output>
    </label>
  </div>
</template>
