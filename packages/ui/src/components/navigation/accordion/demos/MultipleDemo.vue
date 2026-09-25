<script setup lang="ts">
import { ref } from 'vue'
import LuluAccordion from '@lulu/vue/accordion'

import '@lulu/vue/accordion/style.css'
const active = ref<string[]>(['guide', 'api'])
const items = [{ value: 'guide', title: '使用指南' }, { value: 'api', title: '接口说明' }]
</script>

<template>
  <div class="grid gap-4">
    <LuluAccordion v-model="active" :items="items">
      <template #summary="{ item }"><strong>{{ item.title }}</strong> · {{ item.value }}</template>
      <template #default="{ item }"><p>{{ item.title }}的自定义内容。</p></template>
    </LuluAccordion>
    <output>展开项：{{ active.join('、') || '无' }}</output>
  </div>
</template>

