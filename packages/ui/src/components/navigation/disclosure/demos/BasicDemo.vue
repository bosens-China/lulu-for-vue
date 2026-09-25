<script setup lang="ts">
import { ref } from 'vue'
import LuluDisclosure from '@lulu/vue/disclosure'
import '@lulu/vue/disclosure/style.css'

const open = ref(false)
</script>

<template>
  <LuluDisclosure v-model:open="open" title="查看使用说明">
    组件支持键盘操作，并会同步更新无障碍属性。
  </LuluDisclosure>
</template>
