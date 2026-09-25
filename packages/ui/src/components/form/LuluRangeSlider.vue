<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

type RangeValue = [number, number]

interface Props {
  disabled?: boolean
  endLabel?: string
  invalid?: boolean
  max?: number
  min?: number
  startName?: string
  endName?: string
  startLabel?: string
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  endLabel: 'Maximum value',
  invalid: false,
  max: 100,
  min: 0,
  startLabel: 'Minimum value',
  step: 1,
})

const modelValue = defineModel<RangeValue>({ required: true })
const attrs = useAttrs()
const describedBy = computed(() => typeof attrs['aria-describedby'] === 'string' ? attrs['aria-describedby'] : undefined)

const minimum = computed(() => Number.isFinite(props.min) ? props.min : 0)
const maximum = computed(() => {
  const value = Number.isFinite(props.max) ? props.max : 100

  return Math.max(value, minimum.value)
})
const step = computed(() => Number.isFinite(props.step) && props.step > 0 ? props.step : 1)

// 组件只渲染有序区间；用户交互时才将规范化后的值回传给父级。
const range = computed<RangeValue>(() => {
  const [first, second] = modelValue.value
  const start = clamp(first, minimum.value, maximum.value)
  const end = clamp(second, minimum.value, maximum.value)

  return start <= end ? [start, end] : [end, start]
})

function updateValue(index: 0 | 1, event: Event) {
  const input = event.target

  if (!(input instanceof HTMLInputElement) || !Number.isFinite(input.valueAsNumber)) {
    return
  }

  const value = clamp(input.valueAsNumber, minimum.value, maximum.value)
  const [start, end] = range.value

  modelValue.value = index === 0
    ? [Math.min(value, end), end]
    : [start, Math.max(value, start)]
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}
</script>

<template>
  <div v-bind="$attrs" class="lulu-range-slider">
    <input
      type="range"
      class="lulu-range-slider__start"
      :value="range[0]"
      :min="minimum"
      :max="range[1]"
      :step="step"
      :disabled="props.disabled"
      :name="props.startName"
      :aria-invalid="props.invalid || undefined"
      :aria-describedby="describedBy"
      :aria-label="props.startLabel"
      @input="updateValue(0, $event)"
    >
    <input
      type="range"
      class="lulu-range-slider__end"
      :value="range[1]"
      :min="range[0]"
      :max="maximum"
      :step="step"
      :disabled="props.disabled"
      :name="props.endName"
      :aria-invalid="props.invalid || undefined"
      :aria-describedby="describedBy"
      :aria-label="props.endLabel"
      @input="updateValue(1, $event)"
    >
  </div>
</template>
