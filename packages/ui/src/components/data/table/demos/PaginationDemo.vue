<script setup lang="ts">
import '@lulu/vue/table/style.css'
import '@lulu/vue/loading/style.css'
import '@lulu/vue/pagination/style.css'
import { computed, ref } from 'vue'
import LuluTable from '@lulu/vue/table'
import type { TableColumn } from '@lulu/vue/table'

interface Member { id: number; name: string }
const columns: TableColumn<Member>[] = [{ key: 'name', label: '成员' }]
const allRows: Member[] = Array.from({ length: 23 }, (_, index) => ({ id: index + 1, name: `成员 ${index + 1}` }))
const page = ref(1)
const pageSize = 5
// 示例在使用方切分数据；真实请求返回当前页 rows 和 total 即可。
const rows = computed(() => allRows.slice((page.value - 1) * pageSize, page.value * pageSize))
</script>

<template>
  <LuluTable v-model:page="page" :columns="columns" :rows="rows" row-key="id" :pagination="{ total: allRows.length, pageSize }" />
</template>
