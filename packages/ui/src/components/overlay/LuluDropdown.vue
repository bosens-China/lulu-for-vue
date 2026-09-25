<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
import { useFloatingLayer, type FloatingPlacement } from './useFloatingLayer'

export interface DropdownItem {
  disabled?: boolean
  label: string
  value: number | string
}

interface Props {
  closeOnSelect?: boolean
  disabled?: boolean
  items?: readonly DropdownItem[]
  offset?: number
  placement?: FloatingPlacement
}

const props = withDefaults(defineProps<Props>(), {
  closeOnSelect: true,
  disabled: false,
  items: () => [],
  offset: 8,
  placement: 'bottom-start',
})

const emit = defineEmits<{
  close: []
  open: []
  select: [item: DropdownItem]
}>()
const open = defineModel<boolean>('open', { default: false })
const trigger = ref<HTMLElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const panelId = `lulu-dropdown-${useId()}`

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
  trigger,
})

watch(open, (value, previousValue) => {
  if (value === previousValue) return
  if (value) emit('open')
  else emit('close')
})

function focusItem(last = false) {
  const items = panel.value?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')
  const target = items?.[last ? items.length - 1 : 0]
  target?.focus()
}

async function show(last = false) {
  if (props.disabled) return
  open.value = true
  await nextTick()
  focusItem(last)
}

function toggle() {
  if (props.disabled) return
  if (open.value) open.value = false
  else void show()
}

function select(item: DropdownItem) {
  if (item.disabled) return
  emit('select', item)
  if (props.closeOnSelect) {
    open.value = false
    trigger.value?.focus()
  }
}

function moveFocus(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    open.value = false
    trigger.value?.focus()
    return
  }

  const items = [...(panel.value?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? [])]
  const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement)

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    items[(currentIndex + 1) % items.length]?.focus()
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    items[(currentIndex - 1 + items.length) % items.length]?.focus()
  }
}

function handleTriggerKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    void show()
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    void show(true)
  }
}
</script>

<template>
  <span class="lulu-dropdown">
    <button
      ref="trigger"
      type="button"
      class="lulu-dropdown__trigger"
      :aria-controls="panelId"
      :aria-expanded="open"
      aria-haspopup="menu"
      :disabled="props.disabled"
      @click="toggle"
      @keydown="handleTriggerKeydown"
    >
      <slot name="trigger">Toggle menu</slot>
    </button>
    <Teleport v-if="isMounted" :to="teleportTarget">
      <div
        v-if="open"
        :id="panelId"
        ref="panel"
        class="lulu-floating-panel lulu-dropdown__menu"
        role="menu"
        :data-placement="props.placement"
        :style="floatingStyle"
        @keydown="moveFocus"
      >
        <button
          v-for="item in props.items"
          :key="item.value"
          type="button"
          role="menuitem"
          :disabled="item.disabled"
          @click="select(item)"
        >
          <slot name="item" :item="item">{{ item.label }}</slot>
        </button>
      </div>
    </Teleport>
  </span>
</template>
