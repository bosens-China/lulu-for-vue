<script setup lang="ts">
defineOptions({ inheritAttrs: false })

export type DatePickerType = 'date' | 'datetime-local' | 'month' | 'time' | 'week'

interface Props {
  disabled?: boolean
  invalid?: boolean
  max?: string
  min?: string
  required?: boolean
  step?: number | string
  type?: DatePickerType
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  required: false,
  type: 'date',
})

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <input
    v-bind="$attrs"
    v-model="modelValue"
    class="lulu-date-picker"
    :type="props.type"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :disabled="props.disabled"
    :required="props.required"
    :aria-invalid="props.invalid || undefined"
  >
</template>
