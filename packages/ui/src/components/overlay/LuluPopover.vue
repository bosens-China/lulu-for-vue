<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, useId, watch, type CSSProperties } from 'vue'
import { useFloatingLayer, type FloatingPlacement } from './useFloatingLayer'
import FloatingTrigger, { type FloatingTriggerProps } from './FloatingTrigger'

defineOptions({ inheritAttrs: false })

interface Props {
  closeOnEscape?: boolean
  closeOnOutside?: boolean
  disabled?: boolean
  offset?: number
  panelStyle?: CSSProperties | undefined
  placement?: FloatingPlacement
}

export interface LuluPopoverExposed {
  focusTrigger: () => void
}

const props = withDefaults(defineProps<Props>(), {
  closeOnEscape: true,
  closeOnOutside: true,
  disabled: false,
  offset: 8,
  placement: 'bottom-start',
})

const emit = defineEmits<{
  close: []
  open: []
}>()
const open = defineModel<boolean>('open', { default: false })
const attrs = useAttrs()
defineSlots<{
  default?(): unknown
  trigger?(props: { triggerProps: FloatingTriggerProps }): unknown
}>()
const trigger = ref<HTMLElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const id = useId()
const panelId = `lulu-popover-${id}`
const triggerId = `${panelId}-trigger`
let closingFromOutside = false

const { floatingStyle, isMounted, teleportTarget } = useFloatingLayer({
  closeOnEscape: computed(() => props.closeOnEscape),
  closeOnOutside: computed(() => props.closeOnOutside),
  offset: computed(() => props.offset),
  onRequestClose: () => {
    closingFromOutside = true
    open.value = false
  },
  open,
  panel,
  placement: computed(() => props.placement),
  trigger,
})

watch(open, async (value, previousValue) => {
  if (value === previousValue) return
  if (value) {
    emit('open')
    await nextTick()
    panel.value?.querySelector<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])')?.focus()
  }
  else {
    if (!closingFromOutside && panel.value?.contains(document.activeElement)) focusTrigger()
    closingFromOutside = false
    emit('close')
  }
})

function focusTrigger() {
  trigger.value?.focus()
}

function getPanelLabelledBy() {
  if (attrs['aria-label'] != null) return undefined
  return typeof attrs['aria-labelledby'] === 'string' ? attrs['aria-labelledby'] : triggerId
}

defineExpose({ focusTrigger })

function toggle() {
  if (!props.disabled) open.value = !open.value
}

function handleEscape(event: KeyboardEvent) {
  if (!props.closeOnEscape) return
  event.preventDefault()
  event.stopPropagation()
  open.value = false
  focusTrigger()
}

const triggerProps = computed<FloatingTriggerProps>(() => ({
  id: triggerId,
  type: 'button',
  class: 'lulu-popover__trigger',
  'aria-controls': panelId,
  'aria-expanded': open.value,
  'aria-haspopup': 'dialog',
  disabled: props.disabled,
  onClick: toggle,
}))
</script>

<template>
  <span class="lulu-popover">
    <FloatingTrigger :trigger-props="triggerProps" label="切换浮层" @element="trigger = $event">
      <template v-if="$slots.trigger" #default="scope"><slot name="trigger" v-bind="scope" /></template>
    </FloatingTrigger>
    <Teleport v-if="isMounted" :to="teleportTarget">
      <div
        v-if="open"
        v-bind="$attrs"
        :id="panelId"
        ref="panel"
        class="lulu-floating-panel lulu-popover__panel"
        role="dialog"
        :aria-labelledby="getPanelLabelledBy()"
        :data-placement="props.placement"
        :style="[props.panelStyle, floatingStyle]"
        @keydown.esc="handleEscape"
      >
        <slot />
      </div>
    </Teleport>
  </span>
</template>
