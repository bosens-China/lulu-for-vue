<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { useMessage } from '@lulu/vue'
import LuluButton from '@lulu/vue/button'
import LuluMessageHost from '@lulu/vue/message-host'
import '@lulu/vue/button/style.css'
import '@lulu/vue/message-host/style.css'

const MessageAction = defineComponent({
  setup() {
    const message = useMessage()

    return () => h(LuluButton, { onClick: () => message.success('保存成功') }, () => '显示成功提示')
  },
})
</script>

<template>
  <LuluMessageHost>
    <MessageAction />
  </LuluMessageHost>
</template>
