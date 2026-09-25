<script setup lang="ts">
import { ref } from 'vue'
import LuluDropdown from '@lulu/vue/dropdown'
import LuluCheckbox from '@lulu/vue/checkbox'
import LuluButton from '@lulu/vue/button'

import '@lulu/vue/dropdown/style.css'
import '@lulu/vue/checkbox/style.css'
import '@lulu/vue/button/style.css'
const open = ref(false)
const disabled = ref(false)
const selected = ref('')
const items = [{ label: '导出 PDF', value: 'pdf' }, { label: '导出 CSV', value: 'csv' }, { label: '归档', value: 'archive', disabled: true }]
</script>

<template>
  <div class="grid gap-4">
    <LuluCheckbox v-model="disabled" @update:model-value="open = false">禁用菜单</LuluCheckbox>
    <LuluButton :disabled="disabled" @click="open = !open">外部切换菜单</LuluButton>
    <LuluDropdown v-model:open="open" :items="items" :disabled="disabled" :close-on-select="false" placement="top-end" :offset="16" @select="selected = $event.label">
      <template #trigger>选择导出格式</template>
      <template #item="{ item }"><strong>{{ item.label }}</strong>{{ item.disabled ? '（暂不可用）' : ' · ' + item.value }}</template>
    </LuluDropdown>
    <output>已选：{{ selected || '无' }}；展开：{{ open }}</output>
  </div>
</template>

