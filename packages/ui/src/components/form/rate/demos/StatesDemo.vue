<script setup lang="ts">
import { ref } from 'vue'
import LuluRate from '@lulu/vue/rate'
import '@lulu/vue/rate/style.css'

const value = ref(7)
</script>

<template>
  <div class="grid gap-4">
    <LuluRate v-model="value" :min="1" :max="10" :step="1" label="十分制评分" />
    <output>评分：{{ value }} / 10</output>
    <LuluRate :model-value="3.5" readonly label="只读评分" />
    <LuluRate :model-value="4" disabled label="禁用评分" />
  </div>
</template>

