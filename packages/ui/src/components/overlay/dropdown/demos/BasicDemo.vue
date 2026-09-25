<script setup lang="ts">
import LuluDropdown from '@lulu/vue/dropdown'
import '@lulu/vue/dropdown/style.css'

const items = [
  { label: '编辑', value: 'edit' },
  { label: '复制链接', value: 'copy' },
  { label: '删除', value: 'delete' },
]
</script>

<template>
  <LuluDropdown :items="items">
    <template #trigger>更多操作</template>
  </LuluDropdown>
</template>
