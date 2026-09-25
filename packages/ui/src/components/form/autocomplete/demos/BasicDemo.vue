<script setup lang="ts">
import { ref } from 'vue'
import LuluAutocomplete from '@lulu/vue/autocomplete'
import '@lulu/vue/autocomplete/style.css'

const value = ref('')
const items = [
  { label: '北京', value: '北京' },
  { label: '上海', value: '上海' },
  { label: '杭州', value: '杭州' },
]
</script>

<template>
  <LuluAutocomplete v-model="value" :items="items" placeholder="输入城市" />
  <p class="mt-3 text-sm">当前值：{{ value || '无' }}</p>
</template>
