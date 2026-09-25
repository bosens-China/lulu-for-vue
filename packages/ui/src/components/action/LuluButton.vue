<script setup lang="ts">
interface Props {
  disabled?: boolean
  loading?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'normal' | 'primary' | 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false,
  nativeType: 'button',
  variant: 'default',
})
</script>

<template>
  <button
    class="lulu-button lulu-u-inline-flex lulu-u-items-center lulu-u-justify-center"
    :type="props.nativeType"
    :disabled="props.disabled || props.loading"
    :aria-busy="props.loading || undefined"
    :data-variant="props.variant"
  >
    <span v-if="props.loading" class="lulu-button__loading" aria-hidden="true" />
    <slot />
  </button>
</template>
