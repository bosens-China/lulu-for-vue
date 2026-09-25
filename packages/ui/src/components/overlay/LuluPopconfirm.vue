<script setup lang="ts">
import { useTemplateRef } from 'vue'
import LuluPopover from './LuluPopover.vue'
import type { FloatingPlacement } from './useFloatingLayer'

interface Props {
  cancelText?: string
  confirmText?: string
  disabled?: boolean
  message?: string
  placement?: FloatingPlacement
}

const props = withDefaults(defineProps<Props>(), {
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  disabled: false,
  message: 'Are you sure?',
  placement: 'bottom-start',
})

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()
const open = defineModel<boolean>('open', { default: false })
const popover = useTemplateRef<{ focusTrigger: () => void }>('popover')

function cancel() {
  open.value = false
  popover.value?.focusTrigger()
  emit('cancel')
}

function confirm() {
  open.value = false
  popover.value?.focusTrigger()
  emit('confirm')
}
</script>

<template>
  <LuluPopover ref="popover" v-model:open="open" :disabled="props.disabled" :placement="props.placement">
    <template #trigger><slot name="trigger">Confirm action</slot></template>
    <p class="lulu-popconfirm__message"><slot>{{ props.message }}</slot></p>
    <div class="lulu-popconfirm__actions">
      <button type="button" @click="cancel">{{ props.cancelText }}</button>
      <button type="button" @click="confirm">{{ props.confirmText }}</button>
    </div>
  </LuluPopover>
</template>
