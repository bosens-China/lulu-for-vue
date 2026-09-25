<script setup lang="ts">
interface Props {
  message?: string
}

const props = defineProps<Props>()
</script>

<template>
  <p
    v-if="props.message"
    class="lulu-field-error"
    role="alert"
    aria-atomic="true"
  >
    {{ props.message }}
  </p>
</template>
