<script setup lang="ts">
import { ref } from 'vue'
import LuluTabs from '@lulu/vue/tabs'
import LuluTab from '@lulu/vue/tab'
import LuluTabPanel from '@lulu/vue/tab-panel'

import '@lulu/vue/tabs/style.css'
import '@lulu/vue/tab/style.css'
import '@lulu/vue/tab-panel/style.css'
const active = ref<number>(1)
</script>

<template>
  <div class="grid gap-4">
    <LuluTabs v-model="active">
      <template #tabs><LuluTab :value="1">基本资料</LuluTab><LuluTab :value="2" disabled>权限（不可用）</LuluTab><LuluTab :value="3">操作记录</LuluTab></template>
      <LuluTabPanel :value="1">当前显示基本资料。</LuluTabPanel>
      <LuluTabPanel :value="2">禁用标签不会通过键盘或点击选中。</LuluTabPanel>
      <LuluTabPanel :value="3">当前显示操作记录。</LuluTabPanel>
    </LuluTabs>
    <output>当前数值：{{ active }}</output>
  </div>
</template>

