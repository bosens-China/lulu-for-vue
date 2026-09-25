<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

interface Props {
  disabled?: boolean
  invalid?: boolean
  max?: number
  min?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  max: 100,
  min: 0,
  step: 1,
})

const modelValue = defineModel<number>({ required: true })

const minimum = computed(() => Number.isFinite(props.min) ? props.min : 0)
const maximum = computed(() => {
  const value = Number.isFinite(props.max) ? props.max : 100

  return Math.max(value, minimum.value)
})
const step = computed(() => Number.isFinite(props.step) && props.step > 0 ? props.step : 1)
const value = computed(() => clamp(modelValue.value, minimum.value, maximum.value))

function updateValue(event: Event) {
  const input = event.target

  if (input instanceof HTMLInputElement && Number.isFinite(input.valueAsNumber)) {
    modelValue.value = clamp(input.valueAsNumber, minimum.value, maximum.value)
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
    class="lulu-slider"
    :value="value"
    :min="minimum"
    :max="maximum"
    :step="step"
    :disabled="props.disabled"
    :aria-invalid="props.invalid || undefined"
    @input="updateValue"
  >
</template>
