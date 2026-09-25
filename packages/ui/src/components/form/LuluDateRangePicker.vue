<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

export type DateRangePickerType = 'date' | 'month' | 'week'
export type DateRangeValue = [start: string, end: string]

interface Props {
  disabled?: boolean
  endLabel?: string
  invalid?: boolean
  max?: string
  min?: string
  required?: boolean
  startName?: string
  endName?: string
  startLabel?: string
  type?: DateRangePickerType
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  endLabel: 'End date',
  invalid: false,
  required: false,
  startLabel: 'Start date',
  type: 'date',
})

const modelValue = defineModel<DateRangeValue>({ required: true })
const attrs = useAttrs()
const range = computed<DateRangeValue>(() => normalizeRange(modelValue.value))
const describedBy = computed(() => typeof attrs['aria-describedby'] === 'string' ? attrs['aria-describedby'] : undefined)
const startName = computed(() => props.startName ?? (typeof attrs.name === 'string' ? attrs.name : undefined))

function updateRange(index: 0 | 1, event: Event) {
  const input = event.target

  if (!(input instanceof HTMLInputElement)) return

  const next: DateRangeValue = index === 0
    ? [input.value, range.value[1]]
    : [range.value[0], input.value]
  modelValue.value = normalizeRange(next)
}

function normalizeRange([first, second]: DateRangeValue): DateRangeValue {
  if (!first || !second || first <= second) return [first, second]
  return [second, first]
}
</script>

<template>
  <span class="lulu-date-range-picker">
    <input
      v-bind="$attrs"
      class="lulu-date-range-picker__start"
      :type="props.type"
      :value="range[0]"
      :min="props.min"
      :max="range[1] || props.max"
      :disabled="props.disabled"
      :required="props.required"
      :name="startName"
      :aria-invalid="props.invalid || undefined"
      :aria-label="props.startLabel"
      @input="updateRange(0, $event)"
    >
    <input
      class="lulu-date-range-picker__end"
      :type="props.type"
      :value="range[1]"
      :min="range[0] || props.min"
      :max="props.max"
      :disabled="props.disabled"
      :required="props.required"
      :name="props.endName"
      :aria-invalid="props.invalid || undefined"
      :aria-describedby="describedBy"
      :aria-label="props.endLabel"
      @input="updateRange(1, $event)"
    >
  </span>
</template>
