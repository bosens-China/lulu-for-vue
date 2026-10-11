<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import { useMessage, type MessageHandle } from '@lulu/vue/use-message'
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/button/style.css'

const message = useMessage()
const persistent = shallowRef<MessageHandle | null>(null)
function showQueue() {
  message.success('保存成功')
  message.info('正在准备下一步')
  message.warning('请检查剩余配额', { duration: 5000 })
  message.error('有一项处理失败', { duration: 5000 })
}
function closePersistent() {
  persistent.value?.close()
  persistent.value = null
}
function showPersistent() {
  closePersistent()
  persistent.value = message.show('等待手动结束', { type: 'info', duration: 0 })
}
onBeforeUnmount(closePersistent)
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <LuluButton @click="showQueue">连续显示四种消息</LuluButton>
    <LuluButton @click="showPersistent">显示常驻消息</LuluButton>
    <LuluButton :disabled="!persistent" @click="closePersistent">结束常驻消息</LuluButton>
  </div>
</template>
