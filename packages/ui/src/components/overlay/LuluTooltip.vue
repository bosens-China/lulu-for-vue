<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { useFloatingLayer, type FloatingPlacement } from './useFloatingLayer'

defineOptions({ inheritAttrs: false })

type TooltipTrigger = 'click' | 'focus' | 'hover' | 'manual'

interface Props {
  disabled?: boolean
  offset?: number
  placement?: FloatingPlacement
  trigger?: TooltipTrigger
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  offset: 6,
  placement: 'top',
  trigger: 'hover',
})

const emit = defineEmits<{
  close: []
  open: []
}>()
const open = defineModel<boolean>('open', { default: false })
defineSlots<{
  default?(): unknown
  trigger?(props: { triggerProps: { 'aria-describedby': string | undefined } }): unknown
}>()
const triggerElement = ref<HTMLElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const panelId = `lulu-tooltip-${useId()}`

const { floatingStyle, isMounted, teleportTarget } = useFloatingLayer({
  closeOnEscape: computed(() => true),
  closeOnOutside: computed(() => true),
  offset: computed(() => props.offset),
  onRequestClose: () => {
    open.value = false
  },
  open,
  panel,
  placement: computed(() => props.placement),
  trigger: triggerElement,
})

watch(open, (value, previousValue) => {
  if (value === previousValue) return
  if (value) emit('open')
  else emit('close')
})

function showsOn(type: TooltipTrigger) {
  if (props.disabled || props.trigger === 'manual') return false
  if (props.trigger === 'hover') return type === 'hover' || type === 'focus'
  return props.trigger === type
}

function show(type: TooltipTrigger) {
  if (showsOn(type)) open.value = true
}

function hide(type: TooltipTrigger) {
  if (showsOn(type)) open.value = false
}

function toggle() {
  if (showsOn('click')) open.value = !open.value
}
</script>

<template>
  <span
    ref="triggerElement"
    class="lulu-tooltip__trigger"
    :aria-describedby="open ? panelId : undefined"
    :tabindex="!$slots.trigger && (props.trigger === 'focus' || props.trigger === 'hover') ? 0 : undefined"
    @click="toggle"
    @focusin="show('focus')"
    @focusout="hide('focus')"
    @mouseenter="show('hover')"
    @mouseleave="hide('hover')"
  >
    <slot name="trigger" :trigger-props="{ 'aria-describedby': open ? panelId : undefined }">Tooltip trigger</slot>
  </span>
  <Teleport v-if="isMounted" :to="teleportTarget">
    <div
      v-if="open"
      :id="panelId"
      ref="panel"
      v-bind="$attrs"
      class="lulu-tooltip"
      role="tooltip"
      :data-placement="props.placement"
      :style="floatingStyle"
      @mouseenter="show('hover')"
      @mouseleave="hide('hover')"
    >
      <slot />
    </div>
  </Teleport>
</template>
