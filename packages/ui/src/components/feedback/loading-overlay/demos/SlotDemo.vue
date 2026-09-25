<script setup lang="ts">
import { ref } from 'vue'
import LuluLoadingOverlay from '@lulu/vue/loading-overlay'
import LuluButton from '@lulu/vue/button'

import '@lulu/vue/loading-overlay/style.css'
import '@lulu/vue/button/style.css'
const open = ref(false)
</script>

<template>
  <div class="grid gap-4">
    <LuluButton @click="open = !open">{{ open ? '结束同步' : '开始同步' }}</LuluButton>
    <div class="relative min-h-32 border border-solid border-[var(--lulu-color-border)] p-4" :aria-busy="open">
      这里展示待同步的列表。
      <LuluLoadingOverlay v-model:open="open" message="正在同步订单"><strong>正在同步订单</strong><span>请保持页面打开。</span></LuluLoadingOverlay>
    </div>
  </div>
</template>

