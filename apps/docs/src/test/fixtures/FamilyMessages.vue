<script setup lang="ts">
import { useMessage, LuluButton, type MessageHandle } from '@lulu/vue'

const message = useMessage()
const handles: MessageHandle[] = []
let count = 0
function show(long = false) {
  count += 1
  handles.push(message.success(long ? `长内容 ${'https://example.com/'.repeat(16)}` : `消息 ${count}`))
}
function queue() { for (let index = 0; index < 20; index += 1) show() }
function clear() { handles.splice(0).forEach(handle => handle.close()) }
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <LuluButton @click="show()">显示消息</LuluButton>
    <LuluButton @click="show(true)">显示长消息</LuluButton>
    <LuluButton @click="queue">显示长队列</LuluButton>
    <LuluButton @click="clear">清空消息</LuluButton>
  </div>
</template>
