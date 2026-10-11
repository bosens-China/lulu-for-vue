<script setup lang="ts">
import { ref } from 'vue'
import LuluSlider from '@lulu/vue/slider'
import '@lulu/vue/slider/style.css'

const value = ref<[number, number]>([20, 80])
</script>

<template>
  <div class="grid gap-3">
    <LuluSlider v-model="value" range start-name="from" end-name="to" start-label="起始预算" end-label="结束预算" />
    <output>预算：{{ value[0] }} 至 {{ value[1] }}</output>
  </div>
</template>
