<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { useFloatingLayer, type FloatingPlacement } from './useFloatingLayer'

defineOptions({ inheritAttrs: false })

export type TooltipTrigger = 'click' | 'focus' | 'hover' | 'manual'

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
const visible = computed(() => open.value && !props.disabled)
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
  open: visible,
  panel,
  placement: computed(() => props.placement),
  trigger: triggerElement,
})

watch(visible, (value, previousValue) => {
  if (value === previousValue) return
  if (value) emit('open')
  else emit('close')
})

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled && open.value) open.value = false
  },
  { flush: 'sync' },
)

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
    :aria-describedby="visible ? panelId : undefined"
    @click="toggle"
    @focusin="show('focus')"
    @focusout="hide('focus')"
    @mouseenter="show('hover')"
    @mouseleave="hide('hover')"
  >
    <slot name="trigger" :trigger-props="{ 'aria-describedby': visible ? panelId : undefined }">
      <button type="button" :aria-describedby="visible ? panelId : undefined">提示触发器</button>
    </slot>
  </span>
  <Teleport v-if="isMounted" :to="teleportTarget">
    <div
      v-if="visible"
      v-bind="$attrs"
      :id="panelId"
      ref="panel"
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
