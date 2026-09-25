<script setup lang="ts">
import { ref } from 'vue'
import LuluAutocomplete from '@lulu/vue/autocomplete'
import LuluCheckbox from '@lulu/vue/checkbox'
import LuluButton from '@lulu/vue/button'
import type { AutocompleteFilter } from '@lulu/vue/autocomplete'
import '@lulu/vue/autocomplete/style.css'
import '@lulu/vue/checkbox/style.css'
import '@lulu/vue/button/style.css'
const query = ref('')
const open = ref(false)
const loading = ref(false)
const selected = ref('')
const items = [
  { value: 'vue', label: 'Vue' },
  { value: 'vite', label: 'Vite' },
  { value: 'vitest', label: 'Vitest', disabled: true },
  { value: 'typescript', label: 'TypeScript' },
]
const filter: AutocompleteFilter = (items, query) =>
  items.filter(item => item.value.startsWith(query.toLowerCase()))
</script>

<template>
  <div class="grid gap-4">
    <LuluCheckbox v-model="loading">模拟加载中</LuluCheckbox>
    <LuluButton @click="open = !open">切换候选列表</LuluButton>
    <LuluAutocomplete v-model="query" v-model:open="open" :items="items" :filter="filter" :loading="loading" :max-results="3" placement="top-start" :offset="12" aria-label="技术前缀搜索" @select="selected = $event.value">
      <template #option="{ item }"><strong>{{ item.label }}</strong> · {{ item.value }}{{ item.disabled ? '（不可选）' : '' }}</template>
    </LuluAutocomplete>
    <output>选中：{{ selected || '无' }}；展开：{{ open }}</output>
    <LuluAutocomplete :items="items" disabled aria-label="禁用自动完成" />
  </div>
</template>

