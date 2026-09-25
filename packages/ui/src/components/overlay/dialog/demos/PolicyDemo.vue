<script setup lang="ts">
import { ref } from 'vue'
import LuluDialog from '@lulu/vue/dialog'
import LuluButton from '@lulu/vue/button'

import '@lulu/vue/dialog/style.css'
import '@lulu/vue/button/style.css'
const open = ref(false)
</script>

<template>
  <div class="grid gap-4">
    <LuluButton @click="open = true">打开必须确认的对话框</LuluButton>
    <LuluDialog v-model:open="open" :closable="false" :close-on-overlay="false" :close-on-escape="false">
      <template #header><strong>请确认任务结果</strong></template>
      此示例禁用右上角、遮罩与 Escape 关闭。始终提供明确的结束按钮。
      <template #footer><LuluButton @click="open = false">完成并关闭</LuluButton></template>
    </LuluDialog>
  </div>
</template>

