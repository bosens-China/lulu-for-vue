<script setup lang="ts">
import '@lulu/vue/table/style.css'
import '@lulu/vue/loading/style.css'
import '@lulu/vue/pagination/style.css'
import { ref } from 'vue'
import LuluTable, { type TableColumn, type TableSelection } from '@lulu/vue/table'

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
const selectedKeys = ref<Array<string | number>>([])
const lastSelection = ref('无')
const rowSelectionLabel = (row: User) => `选择 ${row.name}`

function handleSelect(selection: TableSelection<User>) {
  lastSelection.value = `${selection.row.name}：${selection.selected ? '选中' : '取消选中'}`
}
</script>

<template>
  <LuluTable
    v-model:selectedKeys="selectedKeys"
    :columns="columns"
    :rows="rows"
    :row-selection-label="rowSelectionLabel"
    row-key="id"
    selectable
    selection-label="选择"
    @select="handleSelect"
  />
  <p class="mt-3 text-sm">已选择：{{ selectedKeys.length ? selectedKeys.join('、') : '无' }}</p>
  <p class="mt-1 text-sm">最近操作：{{ lastSelection }}</p>
</template>
