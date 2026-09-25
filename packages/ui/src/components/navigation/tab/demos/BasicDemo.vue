<script setup lang="ts">
import { ref } from 'vue'
import LuluTab from '@lulu/vue/tab'
import LuluTabPanel from '@lulu/vue/tab-panel'
import LuluTabs from '@lulu/vue/tabs'
import '@lulu/vue/tab/style.css'

const active = ref('first')
</script>

<template>
  <LuluTabs v-model="active">
    <template #tabs>
      <LuluTab value="first">第一个标签</LuluTab>
      <LuluTab value="second">第二个标签</LuluTab>
    </template>
    <LuluTabPanel value="first">第一个面板</LuluTabPanel>
    <LuluTabPanel value="second">第二个面板</LuluTabPanel>
  </LuluTabs>
</template>
