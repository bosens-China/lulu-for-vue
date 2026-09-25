<script setup lang="ts">
import { ref } from 'vue'
import LuluYearPicker from '@lulu/vue/year-picker'
import '@lulu/vue/year-picker/style.css'

const year = ref<number | null>(2026)
</script>

<template>
  <LuluYearPicker v-model="year" :min="2020" :max="2030" />
</template>
