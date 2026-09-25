<script setup lang="ts">
import { ref } from 'vue'
import LuluInput from '@lulu/vue/input'
import '@lulu/vue/input/style.css'

const value = ref('')
</script>

<template>
  <LuluInput v-model="value" placeholder="请输入内容" />
</template>
