<script setup lang="ts">
import { computed } from 'vue'

interface LuluAccordionItem {
  value: string
  title: string
  content?: string
}

interface Props {
  items: readonly LuluAccordionItem[]
}

const props = defineProps<Props>()
const modelValue = defineModel<string | string[]>({ required: true })

const openValues = computed(() => {
  const value = modelValue.value

  return Array.isArray(value) ? value : value ? [value] : []
})

function isOpen(value: string) {
  return openValues.value.includes(value)
}

function toggleItem(value: string) {
  const currentValue = modelValue.value

  if (Array.isArray(currentValue)) {
    const nextValue = currentValue.includes(value)
      ? currentValue.filter((itemValue) => itemValue !== value)
      : [...currentValue, value]

    modelValue.value = nextValue
    return
  }

  modelValue.value = currentValue === value ? '' : value
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
