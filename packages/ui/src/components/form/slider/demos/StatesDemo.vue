<script setup lang="ts">
import { ref } from 'vue'
import LuluSlider from '@lulu/vue/slider'
import '@lulu/vue/slider/style.css'

const value = ref(30)
</script>

<template>
  <div class="grid gap-4">
    <LuluSlider v-model="value" :min="10" :max="50" :step="5" aria-label="音量范围" />
    <output>音量：{{ value }}（10–50，步长 5）</output>
    <LuluSlider :model-value="30" disabled aria-label="禁用音量" />
    <LuluSlider :model-value="30" invalid aria-label="错误音量" aria-describedby="slider-state-error" />
    <p id="slider-state-error">当前音量不符合业务规则。</p>
  </div>
</template>

