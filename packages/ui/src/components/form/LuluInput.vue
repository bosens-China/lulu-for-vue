<script lang="ts">
type InputValue<Type extends string> = string extends Type ? string | number : Type extends 'number' ? number | '' : string

export interface LuluInputProps<Type extends string = 'text'> {
  disabled?: boolean
  invalid?: boolean
  readonly?: boolean
  type?: Type
}
</script>

<script setup lang="ts" generic="Type extends string = 'text'">
import { controlInvalid, useControlAttrs } from './control-attrs'

defineOptions({ inheritAttrs: false })
const props = defineProps<LuluInputProps<Type>>()
const attrs = useControlAttrs()

const modelValue = defineModel<NoInfer<InputValue<Type>>>()
</script>

<template>
  <input
    v-bind="attrs($attrs)"
    v-model="modelValue"
    class="lulu-input"
    :type="props.type ?? 'text'"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :aria-invalid="controlInvalid(props.invalid, attrs($attrs))"
  >
</template>
