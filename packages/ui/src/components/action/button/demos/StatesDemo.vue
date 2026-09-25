<script setup lang="ts">
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/button/style.css'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <LuluButton disabled>禁用按钮</LuluButton>
    <LuluButton variant="primary" disabled>禁用按钮</LuluButton>
    <LuluButton loading>加载中</LuluButton>
    <LuluButton variant="primary" loading>加载中</LuluButton>
  </div>
</template>
