<script setup lang="ts">
import { ref } from 'vue'
import LuluTab from '@lulu/vue/tab'
import LuluTabPanel from '@lulu/vue/tab-panel'
import LuluTabs from '@lulu/vue/tabs'
import '@lulu/vue/tab-panel/style.css'

const active = ref('content')
</script>

<template>
  <LuluTabs v-model="active">
    <template #tabs>
      <LuluTab value="content">内容</LuluTab>
      <LuluTab value="settings">设置</LuluTab>
    </template>
    <LuluTabPanel value="content">这是内容面板。</LuluTabPanel>
    <LuluTabPanel value="settings">这是设置面板。</LuluTabPanel>
  </LuluTabs>
</template>
