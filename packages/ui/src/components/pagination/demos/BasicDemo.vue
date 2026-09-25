<script setup lang="ts">
import { ref } from 'vue'
import LuluPagination from '@lulu/vue/pagination'
import '@lulu/vue/pagination/style.css'

const page = ref(1)
const pageLabel = (value: number) => `第 ${value} 页`
</script>

<template>
  <LuluPagination
    v-model="page"
    :total="180"
    :page-size="20"
    aria-label="示例分页"
    previous-label="上一页"
    next-label="下一页"
    :page-label="pageLabel"
  />
  <p class="mt-3 text-sm">当前第 {{ page }} 页</p>
</template>
