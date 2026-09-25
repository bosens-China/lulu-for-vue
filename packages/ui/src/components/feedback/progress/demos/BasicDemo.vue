<script setup lang="ts">
import LuluProgress from '@lulu/vue/progress'
import '@lulu/vue/progress/style.css'
</script>

<template>
  <LuluProgress :value="65" :max="100">已完成 65%</LuluProgress>
</template>
