<script setup lang="ts">
import { ref } from 'vue'
import LuluSelect from '@lulu/vue/select'
import '@lulu/vue/select/style.css'

const value = ref('hangzhou')
</script>

<template>
  <LuluSelect v-model="value" aria-label="选择城市">
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="hangzhou">杭州</option>
  </LuluSelect>
</template>
