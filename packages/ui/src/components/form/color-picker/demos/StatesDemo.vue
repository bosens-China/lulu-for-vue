<script setup lang="ts">
import { ref } from 'vue'
import LuluColorPicker from '@lulu/vue/color-picker'
import '@lulu/vue/color-picker/style.css'

const color = ref('#2a80eb80')
const changed = ref('')
</script>

<template>
  <div class="grid gap-4">
    <LuluColorPicker v-model="color" alpha label="带透明度的颜色" @change="changed = $event" />
    <output>八位十六进制：{{ color }}；最近 change：{{ changed || '无' }}</output>
    <div class="h-12 rounded border border-solid border-[var(--lulu-color-border)]" :style="{ backgroundColor: color }" aria-label="颜色预览" />
    <LuluColorPicker model-value="#2a80eb80" alpha disabled label="禁用颜色" />
  </div>
</template>
