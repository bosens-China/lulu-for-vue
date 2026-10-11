<script setup lang="ts">
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

function updateValue(event: Event) {
  const checkbox = event.target

  if (checkbox instanceof HTMLInputElement) {
    modelValue.value = checkbox.checked
  }
}
</script>

<template>
  <label v-bind="controlLayoutAttrs($attrs)" class="lulu-switch" :data-disabled="props.disabled || undefined">
    <input
      v-bind="nativeControlAttrs(attrs($attrs))"
      type="checkbox"
      class="lulu-switch__input"
      role="switch"
      :checked="modelValue"
      :disabled="props.disabled"
      :aria-checked="modelValue"
      @change="updateValue"
    >
    <span class="lulu-switch__track" aria-hidden="true" />
    <span v-if="$slots.default" class="lulu-switch__label"><slot /></span>
  </label>
</template>
