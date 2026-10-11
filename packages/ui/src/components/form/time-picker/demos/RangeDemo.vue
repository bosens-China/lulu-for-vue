<script setup lang="ts">
import { ref } from 'vue'
import LuluTimeRangePicker from '@lulu/vue/time-range-picker'
import '@lulu/vue/date-range-picker/style.css'
import '@lulu/vue/time-range-picker/style.css'

const value = ref<[string, string]>(['22:00', '02:00'])
</script>

<template>
  <div class="grid gap-3">
    <LuluTimeRangePicker v-model="value" :step="60" start-name="from" end-name="to" />
    <output>{{ value }}</output>
  </div>
</template>
