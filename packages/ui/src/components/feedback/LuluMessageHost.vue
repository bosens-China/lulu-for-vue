<script setup lang="ts">
import { provide, shallowRef } from 'vue'
import LuluMessage from './LuluMessage.vue'
import {
  messageKey,
  type MessageApi,
  type MessageConfig,
  type MessageEntry,
  type MessageHandle,
  type MessageOptions,
  type MessageType,
} from './useMessage'

interface Props {
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 4000,
})

const messages = shallowRef<MessageEntry[]>([])
let nextId = 0

function show(message: string, options: MessageConfig = {}): MessageHandle {
  const id = nextId
  nextId += 1

  messages.value = [
    ...messages.value,
    {
      id,
      message,
      type: options.type ?? 'info',
      duration: options.duration ?? props.duration,
    },
  ]

  return {
    close: () => close(id),
  }
}

function addTypedMessage(
  message: string,
  type: MessageType,
  options: MessageOptions = {},
): MessageHandle {
  return show(message, { ...options, type })
}

function close(id: number) {
  messages.value = messages.value.filter((message) => message.id !== id)
}

const messageApi: MessageApi = {
  show,
  success: (message, options) => addTypedMessage(message, 'success', options),
  error: (message, options) => addTypedMessage(message, 'error', options),
  info: (message, options) => addTypedMessage(message, 'info', options),
  warning: (message, options) => addTypedMessage(message, 'warning', options),
}

// 队列只由 Host 修改，子组件只能通过注入的显式操作发出请求。
provide(messageKey, messageApi)
</script>

<template>
  <slot />
  <section
    v-if="messages.length"
    class="lulu-message-host"
    aria-label="Notifications"
  >
    <LuluMessage
      v-for="message in messages"
      :key="message.id"
      :duration="message.duration"
      :message="message.message"
      :type="message.type"
      @close="close(message.id)"
    />
  </section>
</template>
