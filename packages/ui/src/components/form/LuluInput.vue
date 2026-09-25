<script setup lang="ts">
interface Props {
  disabled?: boolean
  invalid?: boolean
  readonly?: boolean
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  readonly: false,
  type: 'text',
})

const modelValue = defineModel<string>()
</script>

<template>
  <input
    v-model="modelValue"
    class="lulu-input"
    :type="props.type"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :aria-invalid="props.invalid || undefined"
  >
</template>
