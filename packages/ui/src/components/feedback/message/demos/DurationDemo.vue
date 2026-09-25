<script setup lang="ts">
import { ref } from 'vue'
import LuluMessage from '@lulu/vue/message'
import LuluButton from '@lulu/vue/button'

import '@lulu/vue/message/style.css'
import '@lulu/vue/button/style.css'
const open = ref(false)
const status = ref('')
function show() { open.value = true; status.value = '提示将在 2 秒后关闭' }
function close() { open.value = false; status.value = '提示已关闭' }
</script>

<template>
  <div class="grid gap-4">
    <LuluButton :disabled="open" @click="show">显示两秒提示</LuluButton>
    <LuluMessage v-if="open" message="两秒后自动关闭" type="success" :duration="2000" @close="close" />
    <output>{{ status }}</output>
  </div>
</template>

