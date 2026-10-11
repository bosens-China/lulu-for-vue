<script setup lang="ts">
import { controlInvalid, useControlAttrs } from './control-attrs'

defineOptions({ inheritAttrs: false })
const attrs = useControlAttrs()
interface Props {
  disabled?: boolean
  invalid?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  readonly: false,
})

const modelValue = defineModel<string>()
</script>

<template>
  <textarea
    v-bind="attrs($attrs)"
    v-model="modelValue"
    class="lulu-textarea"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :aria-invalid="controlInvalid(props.invalid, attrs($attrs))"
  />
</template>
