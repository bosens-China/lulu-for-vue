<script setup lang="ts">
import { nextTick, onBeforeUnmount, shallowRef, useTemplateRef, watch, type CSSProperties } from 'vue'
import LuluPopover from './LuluPopover.vue'
import type { FloatingPlacement } from './useFloatingLayer'
import type { FloatingTriggerProps } from './FloatingTrigger'

defineOptions({ inheritAttrs: false })

interface Props {
  cancelText?: string
  beforeConfirm?: () => void | false | Promise<void | false>
  closeOnEscape?: boolean
  closeOnOutside?: boolean
  confirmText?: string
  disabled?: boolean
  errorText?: string
  message?: string
  offset?: number
  panelStyle?: CSSProperties | undefined
  pendingText?: string
  placement?: FloatingPlacement
}

const props = withDefaults(defineProps<Props>(), {
  cancelText: '取消',
  closeOnEscape: true,
  closeOnOutside: true,
  confirmText: '确认',
  disabled: false,
  errorText: '操作失败，请重试。',
  message: '确定要继续吗？',
  offset: 8,
  pendingText: '处理中…',
  placement: 'bottom-start',
})

const emit = defineEmits<{
  cancel: []
  confirm: []
  error: [cause: unknown]
}>()
defineSlots<{
  default?(): unknown
  trigger?(props: { triggerProps: FloatingTriggerProps }): unknown
}>()
const open = defineModel<boolean>('open', { default: false })
const popover = useTemplateRef<{ focusTrigger: () => void }>('popover')
const pending = shallowRef(false)
const error = shallowRef('')
let version = 0

watch(open, () => {
  version += 1
  pending.value = false
  error.value = ''
}, { flush: 'sync' })
onBeforeUnmount(() => { version += 1 })

function cancel() {
  if (pending.value) return
  open.value = false
  popover.value?.focusTrigger()
  emit('cancel')
}

async function confirm() {
  if (pending.value) return
  if (props.beforeConfirm) {
    const request = version
    pending.value = true
    error.value = ''
    try {
      const result = await props.beforeConfirm()
      if (request !== version || result === false) return
    } catch (cause: unknown) {
      if (request === version) {
        error.value = cause instanceof Error ? cause.message || props.errorText : props.errorText
        emit('error', cause)
      }
      return
    } finally {
      if (request === version) pending.value = false
    }
    // 等待 disabled 撤销后再恢复焦点，期间关闭或重新打开则丢弃旧确认。
    await nextTick()
    if (request !== version) return
  }
  open.value = false
  popover.value?.focusTrigger()
  emit('confirm')
}
</script>

<template>
  <LuluPopover
    v-bind="$attrs"
    ref="popover"
    v-model:open="open"
    :disabled="props.disabled || pending"
    :close-on-escape="!pending && props.closeOnEscape"
    :close-on-outside="!pending && props.closeOnOutside"
    :offset="props.offset"
    :panel-style="props.panelStyle"
    :placement="props.placement"
    :aria-busy="pending"
  >
    <template #trigger="scope"><slot name="trigger" v-bind="scope">确认操作</slot></template>
    <p class="lulu-popconfirm__message"><slot>{{ props.message }}</slot></p>
    <p v-if="error" class="lulu-popconfirm__error" role="alert">{{ error }}</p>
    <div class="lulu-popconfirm__actions">
      <button type="button" :disabled="pending" @click="cancel">{{ props.cancelText }}</button>
      <button type="button" :disabled="pending" @click="confirm">{{ pending ? props.pendingText : props.confirmText }}</button>
    </div>
  </LuluPopover>
</template>
