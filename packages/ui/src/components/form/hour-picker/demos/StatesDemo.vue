<script setup lang="ts">
import { ref } from 'vue'
import LuluHourPicker from '@lulu/vue/hour-picker'
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/hour-picker/style.css'
import '@lulu/vue/button/style.css'

const value = ref<number | null>(10)
</script>

<template>
  <div class="grid gap-4">
    <LuluHourPicker v-model="value" :min="8" :max="18" :step="2" required aria-label="必填小时" />
    <LuluButton @click="value = null">清空小时</LuluButton>
    <output>绑定值：{{ value === null ? 'null' : value }}</output>
    <LuluHourPicker :model-value="10" disabled aria-label="禁用小时" />
    <LuluHourPicker :model-value="null" invalid aria-label="错误小时" />
  </div>
</template>

