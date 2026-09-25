<script setup lang="ts">
import { ref } from 'vue'
import LuluDataTable, { type DataTableColumn } from '@lulu/vue/data-table'
import '@lulu/vue/data-table/style.css'

interface User {
  id: number
  name: string
  role: string
}

const columns: DataTableColumn<User>[] = [
  { key: 'name', label: '姓名' },
  { key: 'role', label: '角色' },
]
const rows: User[] = [
  { id: 1, name: '小鹿', role: '维护者' },
  { id: 2, name: '小路', role: '贡献者' },
]
const selectedKeys = ref<Array<string | number>>([])
const rowSelectionLabel = (row: User) => `选择 ${row.name}`
</script>

<template>
  <LuluDataTable
    v-model:selectedKeys="selectedKeys"
    :columns="columns"
    :rows="rows"
    :row-selection-label="rowSelectionLabel"
    row-key="id"
    selectable
    selection-label="选择"
  />
  <p class="mt-3 text-sm">已选择：{{ selectedKeys.length ? selectedKeys.join('、') : '无' }}</p>
</template>
