<script setup lang="ts">
import { ref } from 'vue'
import LuluCheckbox from '@lulu/vue/checkbox'
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/checkbox/style.css'
import '@lulu/vue/button/style.css'

const value = ref(false)
const partial = ref(true)
</script>

<template>
  <div class="grid gap-4">
    <LuluCheckbox v-model="value" v-model:indeterminate="partial">部分选中</LuluCheckbox>
    <LuluButton @click="partial = true">恢复半选</LuluButton>
    <LuluCheckbox :model-value="false" disabled>禁用未选</LuluCheckbox>
    <LuluCheckbox :model-value="true" disabled>禁用已选</LuluCheckbox>
    <output>选中：{{ value }}；半选：{{ partial }}</output>
  </div>
</template>
