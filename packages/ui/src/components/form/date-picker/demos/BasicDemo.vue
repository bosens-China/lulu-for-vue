<script setup lang="ts">
import { ref } from 'vue'
import LuluDatePicker from '@lulu/vue/date-picker'
import '@lulu/vue/date-picker/style.css'

const date = ref('2026-08-12')
</script>

<template>
  <LuluDatePicker v-model="date" />
</template>
