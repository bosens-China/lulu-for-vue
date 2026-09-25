<script setup lang="ts">
import { ref } from 'vue'
import LuluColorPicker from '@lulu/vue/color-picker'
import '@lulu/vue/color-picker/style.css'

const color = ref('#2a80eb80')
</script>

<template>
  <div class="grid gap-4">
    <LuluColorPicker v-model="color" alpha label="带透明度的颜色" />
    <output>八位十六进制：{{ color }}</output>
    <div class="h-12 rounded border border-solid border-[var(--lulu-color-border)]" :style="{ backgroundColor: color }" aria-label="颜色预览" />
    <LuluColorPicker model-value="#2a80eb80" alpha disabled label="禁用颜色" />
  </div>
</template>

