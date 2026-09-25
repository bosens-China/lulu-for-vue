<script setup lang="ts">
import { ref } from 'vue'
import LuluDisclosure from '@lulu/vue/disclosure'

import '@lulu/vue/disclosure/style.css'
const open = ref(false)
</script>

<template>
  <div class="grid gap-4">
    <LuluDisclosure v-model:open="open" title="账单明细">
      <template #summary><strong>查看账单明细</strong> · {{ open ? '已展开' : '已收起' }}</template>
      本月共 3 笔订单。
    </LuluDisclosure>
  </div>
</template>
