<script setup lang="ts">
import { useTemplateRef, watch } from 'vue'
import { nativeControlAttrs, useControlAttrs, controlLayoutAttrs } from './control-attrs'

defineOptions({ inheritAttrs: false })
const attrs = useControlAttrs()

interface Props {
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const modelValue = defineModel<boolean>({ default: false })
const indeterminate = defineModel<boolean>('indeterminate', { default: false })
const input = useTemplateRef<HTMLInputElement>('input')

watch(
  [indeterminate, input],
  ([value]) => {
    if (input.value) {
      input.value.indeterminate = value
    }
  },
  { flush: 'post', immediate: true },
)

function updateValue(event: Event) {
  const checkbox = event.target

  if (checkbox instanceof HTMLInputElement) {
    indeterminate.value = false
    modelValue.value = checkbox.checked
  }
}
</script>

<template>
  <label v-bind="controlLayoutAttrs($attrs)" class="lulu-checkbox" :data-indeterminate="indeterminate || undefined">
    <input
      ref="input"
      v-bind="nativeControlAttrs(attrs($attrs))"
      type="checkbox"
      :checked="modelValue"
      :disabled="props.disabled"
      @change="updateValue"
    >
    <span v-if="$slots.default" class="lulu-checkbox__label"><slot /></span>
  </label>
</template>
