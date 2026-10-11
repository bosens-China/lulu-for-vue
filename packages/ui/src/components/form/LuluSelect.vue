<script lang="ts">
export interface LuluSelectProps<Multiple extends boolean = false> {
  disabled?: boolean
  invalid?: boolean
  multiple?: Multiple
}
</script>

<script setup lang="ts" generic="Multiple extends boolean = false">
import { controlInvalid, useControlAttrs } from './control-attrs'

defineOptions({ inheritAttrs: false })
const attrs = useControlAttrs()

const props = defineProps<LuluSelectProps<Multiple>>()
const modelValue = defineModel<Multiple extends true ? string[] : string>({ required: true })
</script>

<template>
  <select
    v-bind="attrs($attrs)"
    v-model="modelValue"
    class="lulu-select"
    :multiple="props.multiple"
    :disabled="props.disabled"
    :aria-invalid="controlInvalid(props.invalid, attrs($attrs))"
  >
    <slot />
  </select>
</template>
