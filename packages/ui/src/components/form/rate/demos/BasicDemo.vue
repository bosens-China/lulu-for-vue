<script setup lang="ts">
import { ref } from 'vue'
import LuluRate from '@lulu/vue/rate'
import '@lulu/vue/rate/style.css'

const value = ref(4)
</script>

<template>
  <LuluRate v-model="value" label="服务评分" />
</template>
