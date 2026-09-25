<script setup lang="ts">
import { ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluLoadingOverlay from '@lulu/vue/loading-overlay'
import '@lulu/vue/button/style.css'
import '@lulu/vue/loading-overlay/style.css'

const open = ref(false)
</script>

<template>
  <LuluButton class="mb-3" @click="open = !open">{{ open ? '结束加载' : '开始加载' }}</LuluButton>
  <div class="relative min-h-24 border border-solid border-[var(--lulu-color-border)] p-4" :aria-busy="open">
    内容区域
    <LuluLoadingOverlay v-model:open="open" message="正在保存" />
  </div>
</template>
