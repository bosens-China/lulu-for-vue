<script setup lang="ts">
import { ref } from 'vue'
import LuluRangeSlider from '@lulu/vue/range-slider'
import '@lulu/vue/range-slider/style.css'

const value = ref<[number, number]>([20, 70])
</script>

<template>
  <LuluRangeSlider v-model="value" start-name="minimum" end-name="maximum" start-label="最小值" end-label="最大值" />
  <p class="mt-3 text-sm">已选：{{ value.join(' 至 ') }}</p>
</template>
