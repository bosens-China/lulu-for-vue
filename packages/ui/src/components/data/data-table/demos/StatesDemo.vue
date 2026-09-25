<script setup lang="ts">
import { ref } from 'vue'
import LuluDataTable from '@lulu/vue/data-table'
import LuluCheckbox from '@lulu/vue/checkbox'
import type { DataTableColumn } from '@lulu/vue/data-table'
import '@lulu/vue/data-table/style.css'
import '@lulu/vue/checkbox/style.css'
interface Row { id: number; name: string; count: number; amount: number }
const rows: Row[] = [{ id: 1, name: '设计服务', count: 2, amount: 100 }]
const columns: DataTableColumn<Row>[] = [
  { key: 'name', label: '项目', align: 'start' },
  { key: 'count', label: '数量', align: 'center' },
  { key: 'amount', label: '金额', align: 'end' },
]
const loading = ref(false)
const empty = ref(false)
const custom = ref(false)
const rowKey = (row: Row) => 'order-' + row.id
</script>

<template>
  <div class="grid gap-4">
    <div class="flex flex-wrap gap-4"><LuluCheckbox v-model="loading">加载中</LuluCheckbox><LuluCheckbox v-model="empty">无数据</LuluCheckbox><LuluCheckbox v-model="custom">自定义状态插槽</LuluCheckbox></div>
    <LuluDataTable :columns="columns" :rows="empty ? [] : rows" :row-key="rowKey" :loading="loading" loading-text="订单加载中…" empty-text="尚无订单">
      <template #caption>订单汇总</template>
      <template #cell="{ column, value, rowIndex }"><strong v-if="column.key === 'amount'">¥{{ value }}</strong><span v-else>{{ rowIndex + 1 }} · {{ value }}</span></template>
      <template v-if="custom" #loading><strong>正在获取订单，请稍候。</strong></template>
      <template v-if="custom" #empty><strong>没有订单，试试取消“无数据”。</strong></template>
    </LuluDataTable>
  </div>
</template>

