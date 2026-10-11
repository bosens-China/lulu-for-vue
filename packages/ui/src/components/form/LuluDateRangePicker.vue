<script setup lang="ts">
import { computed } from 'vue'
import { controlErrorAttrs, controlInvalid, nativeControlAttrs, useControlAttrs, controlLayoutAttrs } from './control-attrs'
import { compareDateValues, dateInputType, dateInputValue, type DatePickerGranularity, type DatePickerType } from './date-input'

defineOptions({ inheritAttrs: false })

export type DateRangePickerType = DatePickerType
export type DateRangeValue = [start: string, end: string]

interface Props {
  disabled?: boolean | undefined
  endLabel?: string | undefined
  invalid?: boolean | undefined
  max?: string | undefined
  min?: string | undefined
  required?: boolean | undefined
  picker?: DatePickerGranularity | undefined
  showTime?: boolean | undefined
  step?: number | string | undefined
  order?: boolean | undefined
  startName?: string | undefined
  endName?: string | undefined
  startLabel?: string | undefined
  type?: DateRangePickerType | undefined
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  endLabel: '结束日期',
  invalid: false,
  order: undefined,
  required: false,
  showTime: false,
  startLabel: '开始日期',
  type: 'date',
})

const modelValue = defineModel<DateRangeValue>({ required: true })
const attrs = useControlAttrs()
const inputType = computed(() => dateInputType(props.picker, props.type, props.showTime))
const ordered = computed(() => props.order ?? inputType.value !== 'time')
const range = computed<DateRangeValue>(() => normalizeRange(modelValue.value))
const startMax = computed(() => ordered.value ? boundary(props.max, range.value[1], false) : props.max)
const endMin = computed(() => ordered.value ? boundary(props.min, range.value[0], true) : props.min)

function boundary(global: string | undefined, other: string, later: boolean) {
  if (!global || !other) return global || other
  const sorted = [global, other].sort((a, b) => compareDateValues(a, b, inputType.value === 'number'))
  return sorted[later ? 1 : 0]
}

function updateRange(index: 0 | 1, event: Event) {
  const input = event.target

  if (!(input instanceof HTMLInputElement)) return

  const next: DateRangeValue = index === 0
    ? [dateInputValue(input), range.value[1]]
    : [range.value[0], dateInputValue(input)]
  modelValue.value = normalizeRange(next)
}

function normalizeRange([first, second]: DateRangeValue): DateRangeValue {
  if (!ordered.value || !first || !second || compareDateValues(first, second, inputType.value === 'number') <= 0) return [first, second]
  return [second, first]
}
</script>

<template>
  <span v-bind="controlLayoutAttrs($attrs)" class="lulu-date-range-picker">
    <input
      v-bind="nativeControlAttrs(attrs($attrs))"
      class="lulu-date-range-picker__start"
      :type="inputType"
      :step="inputType === 'number' ? 1 : props.step"
      :value="range[0]"
      :min="props.min"
      :max="startMax"
      :disabled="props.disabled"
      :required="props.required || attrs($attrs).required === true"
      :name="props.startName ?? (typeof attrs($attrs).name === 'string' ? String(attrs($attrs).name) : undefined)"
      :aria-invalid="controlInvalid(props.invalid, attrs($attrs))"
      :aria-label="props.startLabel"
      @input="updateRange(0, $event)"
    >
    <input
      v-bind="controlErrorAttrs(attrs($attrs))"
      class="lulu-date-range-picker__end"
      :type="inputType"
      :step="inputType === 'number' ? 1 : props.step"
      :value="range[1]"
      :min="endMin"
      :max="props.max"
      :disabled="props.disabled"
      :required="props.required || attrs($attrs).required === true"
      :name="props.endName"
      :aria-invalid="controlInvalid(props.invalid, attrs($attrs))"
      :aria-label="props.endLabel"
      @input="updateRange(1, $event)"
    >
  </span>
</template>
