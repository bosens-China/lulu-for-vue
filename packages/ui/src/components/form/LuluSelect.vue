<script lang="ts">
export interface LuluSelectProps<Multiple extends boolean = false> {
  disabled?: boolean
  invalid?: boolean
  multiple?: Multiple
}
</script>

<script setup lang="ts" generic="Multiple extends boolean = false">
defineOptions({ inheritAttrs: false })

const props = defineProps<LuluSelectProps<Multiple>>()
const modelValue = defineModel<Multiple extends true ? string[] : string>({ required: true })
</script>

<template>
  <select
    v-bind="$attrs"
    v-model="modelValue"
    class="lulu-select"
    :multiple="props.multiple"
    :disabled="props.disabled"
    :aria-invalid="props.invalid || undefined"
  >
    <slot />
  </select>
</template>
