<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import type { MessageType } from './useMessage'

interface Props {
  closable?: boolean
  duration?: number
  message: string
  type?: MessageType
}

const props = withDefaults(defineProps<Props>(), {
  closable: true,
  duration: 4000,
  type: 'info',
})

const emit = defineEmits<{
  close: []
}>()

let closeTimer: ReturnType<typeof setTimeout> | undefined

const role = computed(() => (props.type === 'error' ? 'alert' : 'status'))
const ariaLive = computed(() => (props.type === 'error' ? 'assertive' : 'polite'))

watch(
  () => props.duration,
  (duration) => {
    clearCloseTimer()

    if (Number.isFinite(duration) && duration > 0) {
      closeTimer = setTimeout(close, duration)
    }
  },
  { immediate: true },
)

onBeforeUnmount(clearCloseTimer)

function close() {
  clearCloseTimer()
  emit('close')
}

function clearCloseTimer() {
  if (closeTimer !== undefined) {
    clearTimeout(closeTimer)
    closeTimer = undefined
  }
}
</script>

<template>
  <div
    class="lulu-message"
    :class="`lulu-message--${props.type}`"
    :role="role"
    :aria-live="ariaLive"
    aria-atomic="true"
  >
    <span class="lulu-message__content">{{ props.message }}</span>
    <button
      v-if="props.closable"
      type="button"
      class="lulu-message__close"
      aria-label="Close message"
      @click="close"
    >
      ×
    </button>
  </div>
</template>
