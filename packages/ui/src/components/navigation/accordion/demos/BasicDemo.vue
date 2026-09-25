<script setup lang="ts">
import { ref } from 'vue'
import LuluAccordion from '@lulu/vue/accordion'
import '@lulu/vue/accordion/style.css'

const active = ref('guide')
const items = [
  { content: '先完成安装，再按需导入组件。', title: '开始使用', value: 'guide' },
  { content: '每个组件都提供独立的样式入口。', title: '按需引入', value: 'import' },
]
</script>

<template>
  <LuluAccordion v-model="active" :items="items" />
</template>
