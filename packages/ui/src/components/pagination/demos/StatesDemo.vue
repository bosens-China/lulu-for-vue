<script setup lang="ts">
import { ref } from 'vue'
import LuluPagination from '@lulu/vue/pagination'
import LuluButton from '@lulu/vue/button'
import LuluCheckbox from '@lulu/vue/checkbox'

import '@lulu/vue/pagination/style.css'
import '@lulu/vue/button/style.css'
import '@lulu/vue/checkbox/style.css'
const page = ref(1)
const disabled = ref(false)
const total = ref(45)
const pageLabel = (page: number) => '第 ' + page + ' 页'
</script>

<template>
  <div class="grid gap-4">
    <LuluCheckbox v-model="disabled">禁用分页</LuluCheckbox>
    <div class="flex flex-wrap gap-3"><LuluButton @click="page = 1">回到首页</LuluButton><LuluButton @click="page = Math.max(1, Math.ceil(total / 10))">跳到末页</LuluButton><LuluButton @click="total = total ? 0 : 45">切换空数据</LuluButton></div>
    <LuluPagination v-model="page" :total="total" :page-size="10" :disabled="disabled" aria-label="边界分页" previous-label="上一页" next-label="下一页" :page-label="pageLabel" />
    <output>总数 {{ total }}；当前页 {{ page }}</output>
  </div>
</template>
