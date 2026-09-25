<script setup lang="ts">
import { ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluLoadingOverlay from '@lulu/vue/loading-overlay'
import '@lulu/vue/button/style.css'
import '@lulu/vue/loading-overlay/style.css'

const open = ref(false)
</script>

<template>
  <div class="relative min-h-24 border border-solid border-[#d9dce3] p-4">
    <LuluButton @click="open = !open">切换加载状态</LuluButton>
    <LuluLoadingOverlay v-model:open="open" message="正在保存" />
  </div>
</template>
