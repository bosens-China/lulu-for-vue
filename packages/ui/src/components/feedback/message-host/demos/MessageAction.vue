<script setup lang="ts">
import { useMessage } from '@lulu/vue/use-message'
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/button/style.css'

const message = useMessage()
let count = 0
function showMessage() {
  message.success(`保存成功（${++count}）`)
}
</script>

<template>
  <LuluButton @click="showMessage">显示成功提示</LuluButton>
</template>
