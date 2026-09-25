<script setup lang="ts">
import { ref } from 'vue'
import LuluPopconfirm from '@lulu/vue/popconfirm'
import LuluCheckbox from '@lulu/vue/checkbox'
import LuluButton from '@lulu/vue/button'

import '@lulu/vue/popconfirm/style.css'
import '@lulu/vue/checkbox/style.css'
import '@lulu/vue/button/style.css'
const open = ref(false)
const disabled = ref(false)
const result = ref('尚未操作')
</script>

<template>
  <div class="grid gap-4">
    <LuluCheckbox v-model="disabled" @update:model-value="open = false">禁用确认</LuluCheckbox>
    <LuluButton :disabled="disabled" @click="open = !open">外部切换确认</LuluButton>
    <LuluPopconfirm v-model:open="open" :disabled="disabled" placement="top" cancel-text="保留" confirm-text="移除" @cancel="result = '已取消，内容保留'" @confirm="result = '已确认移除（仅演示）'">
      <template #trigger>移除草稿</template>
      <strong>确定移除草稿？</strong> 此操作仅更新演示反馈。
    </LuluPopconfirm>
    <output>{{ result }}；展开：{{ open }}</output>
  </div>
</template>

