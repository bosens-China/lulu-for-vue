<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useFloatingLayer, type FloatingPlacement } from '../overlay/useFloatingLayer'

defineOptions({ inheritAttrs: false })

export interface AutocompleteItem {
  disabled?: boolean
  label?: string
  value: string
}

export type AutocompleteFilter = (
  items: readonly AutocompleteItem[],
  query: string,
) => readonly AutocompleteItem[]

interface Props {
  disabled?: boolean
  filter?: AutocompleteFilter
  items?: readonly AutocompleteItem[]
  loading?: boolean
  maxResults?: number
  offset?: number
  placement?: FloatingPlacement
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  items: () => [],
  loading: false,
  maxResults: 8,
  offset: 4,
  placement: 'bottom-start',
})

const emit = defineEmits<{
  search: [query: string]
  select: [item: AutocompleteItem]
}>()
const modelValue = defineModel<string>({ default: '' })
const open = defineModel<boolean>('open', { default: false })
const input = ref<HTMLInputElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const activeIndex = ref(-1)
const listId = `lulu-autocomplete-${useId()}`

const visibleItems = computed(() => {
  const query = modelValue.value.trim()
  const filtered = props.filter
    ? props.filter(props.items, query)
    : props.items.filter((item) => {
      const label = item.label ?? item.value

      return label.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    })

  const maxResults = Number.isFinite(props.maxResults) ? Math.max(0, Math.trunc(props.maxResults)) : 8

  return filtered.slice(0, maxResults)
})
const activeId = computed(() => {
  const item = visibleItems.value[activeIndex.value]

  return item ? `${listId}-${activeIndex.value}` : undefined
})

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
  trigger: input,
})

function show() {
  if (props.disabled) return
  open.value = visibleItems.value.length > 0 || props.loading
}

function updateQuery(event: Event) {
  const target = event.target

  if (!(target instanceof HTMLInputElement)) return

  modelValue.value = target.value
  activeIndex.value = -1
  emit('search', target.value)
  show()
}

function select(item: AutocompleteItem) {
  if (item.disabled) return

  modelValue.value = item.value
  activeIndex.value = -1
  open.value = false
  emit('select', item)
  input.value?.focus()
}

function moveActive(offset: -1 | 1) {
  const candidates = visibleItems.value
  const enabledIndexes = candidates
    .map((item, index) => item.disabled ? -1 : index)
    .filter((index) => index >= 0)

  if (enabledIndexes.length === 0) return

  const currentPosition = enabledIndexes.indexOf(activeIndex.value)
  const nextPosition = currentPosition < 0
    ? offset === 1 ? 0 : enabledIndexes.length - 1
    : (currentPosition + offset + enabledIndexes.length) % enabledIndexes.length

  const nextIndex = enabledIndexes[nextPosition]

  if (nextIndex !== undefined) activeIndex.value = nextIndex
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    show()
    moveActive(1)
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    show()
    moveActive(-1)
  }
  if (event.key === 'Enter') {
    const item = visibleItems.value[activeIndex.value]

    if (item) {
      event.preventDefault()
      select(item)
    }
  }
  if (event.key === 'Escape') open.value = false
}

function setActive(index: number) {
  if (!visibleItems.value[index]?.disabled) activeIndex.value = index
}
</script>

<template>
  <input
    ref="input"
    v-bind="$attrs"
    class="lulu-autocomplete"
    type="text"
    role="combobox"
    autocomplete="off"
    :value="modelValue"
    :aria-activedescendant="activeId"
    :aria-controls="listId"
    :aria-expanded="open"
    :disabled="props.disabled"
    @focus="show"
    @input="updateQuery"
    @keydown="handleKeydown"
  >
  <Teleport v-if="isMounted" :to="teleportTarget">
    <ul
      v-if="open && (visibleItems.length > 0 || props.loading)"
      :id="listId"
      ref="panel"
      class="lulu-floating-panel lulu-autocomplete__list"
      role="listbox"
      :aria-busy="props.loading || undefined"
      :style="floatingStyle"
    >
      <li v-if="props.loading" class="lulu-autocomplete__loading" role="status">Loading</li>
      <li
        v-for="(item, index) in visibleItems"
        :id="`${listId}-${index}`"
        :key="item.value"
        class="lulu-autocomplete__option"
        role="option"
        :aria-disabled="item.disabled || undefined"
        :aria-selected="index === activeIndex"
        @mouseenter="setActive(index)"
        @mousedown.prevent
        @click="select(item)"
      >
        <slot name="option" :item="item">{{ item.label ?? item.value }}</slot>
      </li>
    </ul>
  </Teleport>
</template>
