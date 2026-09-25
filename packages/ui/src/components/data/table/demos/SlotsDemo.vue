<script setup lang="ts">
import { ref } from 'vue'
import LuluTable from '@lulu/vue/table'
import LuluCheckbox from '@lulu/vue/checkbox'

import '@lulu/vue/table/style.css'
import '@lulu/vue/checkbox/style.css'
const empty = ref(false)
</script>

<template>
  <div class="grid gap-4">
    <LuluCheckbox v-model="empty">显示空数据</LuluCheckbox>
    <LuluTable :empty="empty" :colspan="2">
      <template #caption>订单金额</template>
      <template #head><tr><th>项目</th><th>金额</th></tr></template>
      <template #body><tr><td>设计服务</td><td>¥100</td></tr></template>
      <template #empty>暂无订单，请先创建订单。</template>
      <template #foot><tr><td>合计</td><td>{{ empty ? '¥0' : '¥100' }}</td></tr></template>
    </LuluTable>
  </div>
</template>

