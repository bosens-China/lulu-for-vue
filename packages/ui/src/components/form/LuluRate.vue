<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

interface Props {
  disabled?: boolean
  label?: string
  max?: number
  min?: number
  readonly?: boolean
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  label: 'Rating',
  max: 5,
  min: 0,
  readonly: false,
  step: 0.5,
})

const modelValue = defineModel<number>({ required: true })

const minimum = computed(() => Number.isFinite(props.min) ? props.min : 0)
const maximum = computed(() => {
  const value = Number.isFinite(props.max) ? props.max : 5

  return Math.max(value, minimum.value)
})
const step = computed(() => Number.isFinite(props.step) && props.step > 0 ? props.step : 0.5)
const value = computed(() => clamp(modelValue.value, minimum.value, maximum.value))
const valueText = computed(() => `${value.value} out of ${maximum.value}`)

function updateValue(event: Event) {
  const input = event.target

  if (!(input instanceof HTMLInputElement)) {
    return
  }

  if (props.readonly) {
    input.value = String(value.value)
    return
  }

  if (Number.isFinite(input.valueAsNumber)) {
    modelValue.value = clamp(input.valueAsNumber, minimum.value, maximum.value)
  }
}

function preventReadonlyChange(event: KeyboardEvent) {
  if (props.readonly) {
    event.preventDefault()
  }
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum)
}
</script>

<template>
  <input
    v-bind="$attrs"
    type="range"
    class="lulu-rate"
    :value="value"
    :min="minimum"
    :max="maximum"
    :step="step"
    :disabled="props.disabled"
    :readonly="props.readonly || undefined"
    :tabindex="props.readonly ? -1 : undefined"
    :aria-label="props.label"
    :aria-readonly="props.readonly || undefined"
    :aria-valuetext="valueText"
    @input="updateValue"
    @keydown="preventReadonlyChange"
  >
</template>
