<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

interface Props {
  disabled?: boolean
  invalid?: boolean
  max?: number
  min?: number
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  required: false,
})

const modelValue = defineModel<number | null>({ default: null })
const value = computed(() => modelValue.value ?? '')

function updateValue(event: Event) {
  const input = event.target

  if (!(input instanceof HTMLInputElement)) return
  modelValue.value = input.value === '' || !Number.isFinite(input.valueAsNumber)
    ? null
    : Math.trunc(input.valueAsNumber)
}
</script>

<template>
  <input
    v-bind="$attrs"
    class="lulu-year-picker"
    type="number"
    inputmode="numeric"
    step="1"
    :value="value"
    :min="props.min"
    :max="props.max"
    :disabled="props.disabled"
    :required="props.required"
    :aria-invalid="props.invalid || undefined"
    @input="updateValue"
  >
</template>
