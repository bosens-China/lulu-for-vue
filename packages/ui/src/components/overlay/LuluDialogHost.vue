<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, shallowRef, watch } from 'vue'
import LuluDialog from './LuluDialog.vue'
import { dialogKey, type DialogConfirmOptions, type DialogMode, type DialogRequest } from './useDialog'
import { messageLayerKey } from '../feedback/useMessage'

interface Entry {
  id: number
  options: DialogConfirmOptions
  mode: DialogMode
  resolve: (confirmed: boolean) => void
}

defineSlots<{ default(): unknown }>()
const queue = shallowRef<Entry[]>([])
const active = computed(() => queue.value[0])
const pending = shallowRef(false)
const error = shallowRef('')
const messageLayer = shallowRef<HTMLElement | null>(null)
const registerMessageLayer = inject(messageLayerKey, undefined)
let nextId = 0
let mounted = false

function setMessageLayer(element: unknown) {
  messageLayer.value = element instanceof HTMLElement ? element : null
}

onMounted(() => { mounted = true })
onBeforeUnmount(() => {
  mounted = false
  for (const entry of queue.value) finish(entry, false)
})

watch(active, () => {
  pending.value = false
  error.value = ''
}, { flush: 'sync' })

watch(messageLayer, (element, _previous, onCleanup) => {
  if (element && registerMessageLayer) onCleanup(registerMessageLayer(element))
}, { flush: 'post' })

function create(options: DialogConfirmOptions, mode: DialogMode): DialogRequest {
  if (!mounted) throw new Error('Dialog methods require a mounted LuluDialogHost on the client.')
  if (!options || typeof options.title !== 'string' || !options.title.trim()
    || (typeof options.content !== 'string' && typeof options.content !== 'function')) {
    throw new TypeError('Dialog requires a non-empty title and text or render-function content.')
  }
  let resolve!: Entry['resolve']
  const result = new Promise<boolean>((settle) => { resolve = settle })
  const entry: Entry = { id: nextId++, options: { ...options }, mode, resolve }
  queue.value = [...queue.value, entry]
  return { close: () => finish(entry, false), result }
}

// 每个请求只结束一次；等待 DOM 卸载和焦点恢复后再通知调用方。
function finish(entry: Entry, confirmed: boolean) {
  if (!queue.value.includes(entry)) return
  queue.value = queue.value.filter((item) => item !== entry)
  void nextTick(() => entry.resolve(confirmed))
}

function cancel(entry: Entry) {
  if (active.value === entry && !pending.value) finish(entry, false)
}

async function confirm() {
  const entry = active.value
  if (!entry || pending.value) return
  pending.value = true
  error.value = ''
  try {
    const result = await entry.options.onConfirm?.()
    if (result !== false) finish(entry, true)
  } catch (cause: unknown) {
    if (active.value === entry) {
      error.value = cause instanceof Error ? cause.message || '操作失败，请重试。' : '操作失败，请重试。'
    }
  } finally {
    // 已销毁请求的迟到结果不能修改下一条弹窗。
    if (active.value === entry) pending.value = false
  }
}

provide(dialogKey, create)
</script>

<template>
  <slot />
  <LuluDialog
    v-for="entry in queue.slice(0, 1)"
    :key="entry.id"
    class="lulu-dialog-host"
    :open="true"
    :title="entry.options.title"
    :closable="!pending && (entry.options.closable ?? true)"
    :close-on-overlay="!pending && (entry.options.closeOnOverlay ?? false)"
    :close-on-escape="!pending && (entry.options.closeOnEscape ?? true)"
    :aria-busy="pending"
    @close="cancel(entry)"
  >
    <template #header>
      <span tabindex="-1" autofocus class="lulu-dialog-host__title">{{ entry.options.title }}</span>
    </template>
    <component :is="entry.options.content" v-if="typeof entry.options.content === 'function'" />
    <p v-else class="lulu-dialog-host__content">{{ entry.options.content }}</p>
    <p v-if="error" class="lulu-dialog-host__error" role="alert">{{ error }}</p>
    <div :ref="setMessageLayer" class="lulu-dialog-host__messages" />
    <template v-if="entry.mode !== 'open'" #footer>
      <button v-if="entry.mode === 'confirm'" type="button" :disabled="pending" @click="cancel(entry)">
        {{ entry.options.cancelText ?? '取消' }}
      </button>
      <button type="button" :disabled="pending" @click="confirm">
        {{ pending ? '处理中…' : entry.options.confirmText ?? '确定' }}
      </button>
    </template>
  </LuluDialog>
</template>
