<script setup lang="ts">
defineOptions({ inheritAttrs: false })

interface Props {
  disabled?: boolean
  invalid?: boolean
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  multiple: false,
})

const modelValue = defineModel<string | string[]>({ required: true })
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
