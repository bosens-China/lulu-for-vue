<script setup lang="ts">
import LuluButton from '@lulu/vue/button'
import LuluSpace from '@lulu/vue/space'
import '@lulu/vue/button/style.css'
import '@lulu/vue/space/style.css'
</script>

<template>
  <LuluSpace wrap>
    <LuluButton>默认按钮</LuluButton>
    <LuluButton variant="primary">主要按钮</LuluButton>
  </LuluSpace>
</template>
