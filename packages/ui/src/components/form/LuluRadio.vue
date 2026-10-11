<script setup lang="ts">
import { computed } from 'vue'
import { nativeControlAttrs, useControlAttrs, controlLayoutAttrs } from './control-attrs'

defineOptions({ inheritAttrs: false })
const attrs = useControlAttrs()

interface Props {
  disabled?: boolean
  value: unknown
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const modelValue = defineModel<unknown>()
const checked = computed(() => Object.is(modelValue.value, props.value))

function updateValue(event: Event) {
  const radio = event.target

  if (radio instanceof HTMLInputElement && radio.checked) {
    modelValue.value = props.value
  }
}
</script>

<template>
  <label v-bind="controlLayoutAttrs($attrs)" class="lulu-radio">
    <input
      v-bind="nativeControlAttrs(attrs($attrs))"
      type="radio"
      :value="String(props.value)"
      :checked="checked"
      :disabled="props.disabled"
      @change="updateValue"
    >
    <span v-if="$slots.default" class="lulu-radio__label"><slot /></span>
  </label>
</template>
