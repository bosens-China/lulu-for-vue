<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

interface Props {
  disabled?: boolean
  invalid?: boolean
  max?: number
  min?: number
  required?: boolean
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  max: 23,
  min: 0,
  required: false,
  step: 1,
})

const modelValue = defineModel<number | null>({ default: null })
const minimum = computed(() => Number.isFinite(props.min) ? props.min : 0)
const maximum = computed(() => Math.max(Number.isFinite(props.max) ? props.max : 23, minimum.value))
const step = computed(() => Number.isFinite(props.step) && props.step > 0 ? props.step : 1)
const value = computed(() => modelValue.value ?? '')

function updateValue(event: Event) {
  const input = event.target

  if (!(input instanceof HTMLInputElement)) return
  if (input.value === '' || !Number.isFinite(input.valueAsNumber)) {
    modelValue.value = null
    return
  }

  modelValue.value = Math.min(Math.max(input.valueAsNumber, minimum.value), maximum.value)
}
</script>

<template>
  <input
    v-bind="$attrs"
    class="lulu-hour-picker"
    type="number"
    inputmode="numeric"
    :value="value"
    :min="minimum"
    :max="maximum"
    :step="step"
    :disabled="props.disabled"
    :required="props.required"
    :aria-invalid="props.invalid || undefined"
    @input="updateValue"
  >
</template>
