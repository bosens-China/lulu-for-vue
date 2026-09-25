<script setup lang="ts">
import { ref } from 'vue'
import LuluYearPicker from '@lulu/vue/year-picker'
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/year-picker/style.css'
import '@lulu/vue/button/style.css'

const value = ref<number | null>(2026)
</script>

<template>
  <div class="grid gap-4">
    <LuluYearPicker v-model="value" :min="2020" :max="2030" required aria-label="必填年份" />
    <LuluButton @click="value = null">清空年份</LuluButton>
    <output>绑定值：{{ value === null ? 'null' : value }}</output>
    <LuluYearPicker :model-value="2026" disabled aria-label="禁用年份" />
    <LuluYearPicker :model-value="null" invalid aria-label="错误年份" />
  </div>
</template>

