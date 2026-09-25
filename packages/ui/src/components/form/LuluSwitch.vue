<script setup lang="ts">
defineOptions({ inheritAttrs: false })

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
  <label class="lulu-switch">
    <input
      v-bind="$attrs"
      type="checkbox"
      role="switch"
      :checked="modelValue"
      :disabled="props.disabled"
      :aria-checked="modelValue"
      @change="updateValue"
    >
    <span v-if="$slots.default" class="lulu-switch__label"><slot /></span>
  </label>
</template>
