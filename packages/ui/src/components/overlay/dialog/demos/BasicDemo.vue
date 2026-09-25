<script setup lang="ts">
import { ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluDialog from '@lulu/vue/dialog'
import '@lulu/vue/button/style.css'
import '@lulu/vue/dialog/style.css'

const open = ref(false)
</script>

<template>
  <LuluButton @click="open = true">打开对话框</LuluButton>
  <LuluDialog v-model:open="open" title="确认发布">
    发布后内容将对访问者可见。
    <template #footer>
      <LuluButton @click="open = false">知道了</LuluButton>
    </template>
  </LuluDialog>
</template>
