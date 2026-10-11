<script setup lang="ts">
import { ref } from 'vue'
import LuluTimePicker from '@lulu/vue/time-picker'
import '@lulu/vue/date-picker/style.css'
import '@lulu/vue/time-picker/style.css'

const value = ref('09:30')
</script>

<template>
  <div class="grid gap-3">
    <LuluTimePicker v-model="value" :step="60" name="time" aria-label="预约时间" />
    <output>{{ value }}</output>
  </div>
</template>
