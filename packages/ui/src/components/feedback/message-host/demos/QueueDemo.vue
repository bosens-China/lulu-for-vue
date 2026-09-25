<script setup lang="ts">
import { defineComponent, h, onBeforeUnmount, shallowRef } from 'vue'
import { useMessage, type MessageHandle } from '@lulu/vue/use-message'
import LuluButton from '@lulu/vue/button'
import LuluMessageHost from '@lulu/vue/message-host'
import '@lulu/vue/button/style.css'
import '@lulu/vue/message-host/style.css'

// 注入必须发生在 Host 的后代中；小型演示沿用基础例子的内联子组件。
const QueueActions = defineComponent({
  setup() {
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
    return () => h('div', { class: 'flex flex-wrap gap-3' }, [
      h(LuluButton, { onClick: showQueue }, () => '连续显示四种消息'),
      h(LuluButton, { onClick: showPersistent }, () => '显示常驻消息'),
      h(LuluButton, { onClick: closePersistent, disabled: !persistent.value }, () => '结束常驻消息'),
    ])
  },
})
</script>

<template>
  <LuluMessageHost :duration="2500"><QueueActions /></LuluMessageHost>
</template>
