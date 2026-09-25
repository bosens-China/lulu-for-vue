<script setup lang="ts">
import { ref } from 'vue'
import LuluInput from '@lulu/vue/input'
import '@lulu/vue/input/style.css'

const value = ref('')
</script>

<template>
  <LuluInput v-model="value" aria-label="示例输入" placeholder="请输入内容" />
</template>
