<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, useId, watch } from 'vue'
import { useFloatingLayer, type FloatingPlacement } from './useFloatingLayer'

defineOptions({ inheritAttrs: false })

interface Props {
  closeOnEscape?: boolean
  closeOnOutside?: boolean
  disabled?: boolean
  offset?: number
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
</script>

<template>
  <span class="lulu-popover">
    <button
      :id="triggerId"
      ref="trigger"
      type="button"
      class="lulu-popover__trigger"
      :aria-controls="panelId"
      :aria-expanded="open"
      aria-haspopup="dialog"
      :disabled="props.disabled"
      @click="toggle"
    >
      <slot name="trigger">Toggle popover</slot>
    </button>
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
        :style="floatingStyle"
        @keydown.esc="handleEscape"
      >
        <slot />
      </div>
    </Teleport>
  </span>
</template>
