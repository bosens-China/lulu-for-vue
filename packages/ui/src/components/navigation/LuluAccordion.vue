<script setup lang="ts">
import { computed } from 'vue'

export type AccordionValue = string | number

export interface LuluAccordionItem {
  value: AccordionValue
  title: string
  content?: string
}

interface Props {
  items: readonly LuluAccordionItem[]
}

const props = defineProps<Props>()
const modelValue = defineModel<AccordionValue | AccordionValue[] | null>({ required: true })

const openValues = computed(() => {
  const value = modelValue.value

  return Array.isArray(value) ? value : value === null ? [] : [value]
})

function isOpen(value: AccordionValue) {
  return openValues.value.includes(value)
}

function toggleItem(value: AccordionValue) {
  const currentValue = modelValue.value

  if (Array.isArray(currentValue)) {
    const nextValue = currentValue.includes(value)
      ? currentValue.filter((itemValue) => itemValue !== value)
      : [...currentValue, value]

    modelValue.value = nextValue
    return
  }

  modelValue.value = currentValue === value ? null : value
}
</script>

<template>
  <div class="lulu-accordion">
    <details
      v-for="item in props.items"
      :key="item.value"
      class="lulu-accordion__item"
      :data-value="item.value"
      :open="isOpen(item.value)"
    >
      <summary
        class="lulu-accordion__summary"
        @click.prevent="toggleItem(item.value)"
      >
        <slot name="summary" :item="item">{{ item.title }}</slot>
      </summary>
      <div class="lulu-accordion__content">
        <slot :item="item">{{ item.content }}</slot>
      </div>
    </details>
  </div>
</template>
