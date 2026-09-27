<script setup lang="ts">
interface Props {
  message?: string
}

const props = defineProps<Props>()

defineSlots<{
  default?(): unknown
}>()
</script>

<template>
  <p
    v-if="$slots.default || props.message"
    class="lulu-field-error"
    role="alert"
    aria-atomic="true"
  >
    <slot>{{ props.message }}</slot>
  </p>
</template>
