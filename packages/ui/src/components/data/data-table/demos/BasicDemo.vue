<script setup lang="ts">
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
</script>

<template>
  <LuluDataTable :columns="columns" :rows="rows" row-key="id" />
</template>
