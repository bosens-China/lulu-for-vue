<script setup lang="ts">
import { ref } from 'vue'
import LuluHourPicker from '@lulu/vue/hour-picker'
import '@lulu/vue/hour-picker/style.css'

const hour = ref<number | null>(9)
</script>

<template>
  <LuluHourPicker v-model="hour" aria-label="选择小时" />
</template>
