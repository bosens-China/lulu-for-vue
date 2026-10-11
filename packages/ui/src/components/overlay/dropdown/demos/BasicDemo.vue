<script setup lang="ts">
import LuluDropdown from '@lulu/vue/dropdown'
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/dropdown/style.css'
import '@lulu/vue/button/style.css'

const items = [
  { label: '编辑', value: 'edit' },
  { label: '复制链接', value: 'copy' },
  { label: '删除', value: 'delete' },
]
</script>

<template>
  <LuluDropdown :items="items">
    <template #trigger="{ triggerProps }"><LuluButton v-bind="triggerProps">更多操作</LuluButton></template>
  </LuluDropdown>
</template>
