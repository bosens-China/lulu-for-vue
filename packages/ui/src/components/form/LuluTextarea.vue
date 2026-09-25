<script setup lang="ts">
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
    v-model="modelValue"
    class="lulu-textarea"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :aria-invalid="props.invalid || undefined"
  />
</template>
