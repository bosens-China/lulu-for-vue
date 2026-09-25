<script setup lang="ts">
import { ref } from 'vue'
import LuluTab from '@lulu/vue/tab'
import LuluTabPanel from '@lulu/vue/tab-panel'
import LuluTabs from '@lulu/vue/tabs'
import '@lulu/vue/tabs/style.css'

const active = ref('overview')
</script>

<template>
  <LuluTabs v-model="active">
    <template #tabs>
      <LuluTab value="overview">概览</LuluTab>
      <LuluTab value="api">API</LuluTab>
    </template>
    <LuluTabPanel value="overview">组件由公开入口按需引入。</LuluTabPanel>
    <LuluTabPanel value="api">标签与面板通过 value 关联。</LuluTabPanel>
  </LuluTabs>
</template>
