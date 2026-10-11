<script setup lang="ts">
import '@lulu/vue/table/style.css'
import '@lulu/vue/loading/style.css'
import '@lulu/vue/pagination/style.css'
import LuluTable, { type TableColumn } from '@lulu/vue/table'

interface User {
  id: number
  name: string
  role: string
}

const columns: TableColumn<User>[] = [
  { key: 'name', label: '姓名' },
  { key: 'role', label: '角色' },
]
const rows: User[] = [
  { id: 1, name: '小鹿', role: '维护者' },
  { id: 2, name: '小路', role: '贡献者' },
]
</script>

<template>
  <LuluTable :columns="columns" :rows="rows" row-key="id" />
</template>
