<script setup lang="ts">
import LuluLoading from '@lulu/vue/loading'
import '@lulu/vue/loading/style.css'
</script>
<template>
  <div class="grid gap-4">
    <LuluLoading v-for="size in (['sm', 'md', 'lg'] as const)" :key="size" :size="size" :label="size + ' 加载中'" />
    <LuluLoading block>块级居中加载</LuluLoading>
  </div>
</template>
