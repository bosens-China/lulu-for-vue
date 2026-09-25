<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, useId, useSlots, useTemplateRef, watch } from 'vue'

type CloseReason = 'close-button' | 'escape' | 'overlay' | 'native'

interface Props {
  title?: string
  closable?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  closable: true,
  closeOnOverlay: true,
  closeOnEscape: true,
})

const emit = defineEmits<{
  close: [reason: CloseReason]
}>()

const open = defineModel<boolean>('open', { default: false })
const dialogRef = useTemplateRef<HTMLDialogElement>('dialog')
const slots = useSlots()
const titleId = useId()
let returnFocus: HTMLElement | null = null

const hasHeaderContent = computed(() => Boolean(props.title || slots.header))

onMounted(() => {
  syncNativeDialog(open.value)
})

onBeforeUnmount(() => {
  if (dialogRef.value?.open) dialogRef.value.close()
  returnFocus?.focus()
})

watch(
  open,
  (isOpen) => {
    syncNativeDialog(isOpen)
  },
  { flush: 'post' },
)

// 受控状态必须通过原生方法同步，才能保留 dialog 的顶层模态语义。
function syncNativeDialog(isOpen: boolean) {
  const dialog = dialogRef.value

  if (!dialog || dialog.open === isOpen) {
    return
  }

  if (isOpen) {
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialog.showModal()
    return
  }

  dialog.close()
  returnFocus?.focus()
  returnFocus = null
}

function requestClose(reason: CloseReason) {
  if (!open.value) {
    return
  }

  open.value = false
  emit('close', reason)
}

function handleCancel(event: Event) {
  // 拦截浏览器默认关闭，让 v-model 始终是唯一状态来源。
  event.preventDefault()

  if (props.closeOnEscape) {
    requestClose('escape')
  }
}

function handleNativeClose() {
  if (open.value) {
    requestClose('native')
  }
}

function handleOverlayClick(event: MouseEvent) {
  if (props.closeOnOverlay && event.target === event.currentTarget) {
    requestClose('overlay')
  }
}
</script>

<template>
  <dialog
    ref="dialog"
    class="lulu-dialog"
    :aria-label="hasHeaderContent ? undefined : 'Dialog'"
    :aria-labelledby="hasHeaderContent ? titleId : undefined"
    @cancel="handleCancel"
    @click="handleOverlayClick"
    @close="handleNativeClose"
  >
    <section class="lulu-dialog__surface" role="document">
      <header
        v-if="hasHeaderContent || props.closable"
        class="lulu-dialog__header"
      >
        <div v-if="hasHeaderContent" :id="titleId" class="lulu-dialog__title">
          <slot name="header">{{ props.title }}</slot>
        </div>

        <button
          v-if="props.closable"
          type="button"
          class="lulu-dialog__close"
          aria-label="Close dialog"
          @click="requestClose('close-button')"
        >
          ×
        </button>
      </header>

      <div class="lulu-dialog__body">
        <slot />
      </div>

      <footer v-if="$slots.footer" class="lulu-dialog__footer">
        <slot name="footer" />
      </footer>
    </section>
  </dialog>
</template>
