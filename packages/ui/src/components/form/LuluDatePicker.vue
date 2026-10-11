<script setup lang="ts">
import { computed } from 'vue'
import { controlInvalid, useControlAttrs } from './control-attrs'
import { dateInputType, dateInputValue, type DatePickerGranularity, type DatePickerType } from './date-input'

defineOptions({ inheritAttrs: false })

export type { DatePickerGranularity, DatePickerType } from './date-input'

interface Props {
  disabled?: boolean | undefined
  invalid?: boolean | undefined
  max?: string | undefined
  min?: string | undefined
  required?: boolean | undefined
  picker?: DatePickerGranularity | undefined
  showTime?: boolean | undefined
  step?: number | string | undefined
  type?: DatePickerType | undefined
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  required: false,
  showTime: false,
  type: 'date',
})

const modelValue = defineModel<string>({ default: '' })
const attrs = useControlAttrs()
const inputType = computed(() => dateInputType(props.picker, props.type, props.showTime))

function updateValue(event: Event) {
  if (event.target instanceof HTMLInputElement) modelValue.value = dateInputValue(event.target)
}
</script>

<template>
  <input
    v-bind="attrs($attrs)"
    :value="modelValue"
    class="lulu-date-picker"
    :type="inputType"
    :inputmode="inputType === 'number' ? 'numeric' : undefined"
    :min="props.min"
    :max="props.max"
    :step="inputType === 'number' ? 1 : props.step"
    :disabled="props.disabled"
    :required="props.required || attrs($attrs).required === true"
    :aria-invalid="controlInvalid(props.invalid, attrs($attrs))"
    @input="updateValue"
  >
</template>
