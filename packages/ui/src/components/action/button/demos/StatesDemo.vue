<script setup lang="ts">
import LuluButton from '@lulu/vue/button'
import LuluSpace from '@lulu/vue/space'
import '@lulu/vue/button/style.css'
import '@lulu/vue/space/style.css'
</script>

<template>
  <LuluSpace wrap>
    <LuluButton disabled>禁用按钮</LuluButton>
    <LuluButton variant="primary" disabled>禁用按钮</LuluButton>
    <LuluButton loading>加载中</LuluButton>
    <LuluButton variant="primary" loading>加载中</LuluButton>
  </LuluSpace>
</template>
