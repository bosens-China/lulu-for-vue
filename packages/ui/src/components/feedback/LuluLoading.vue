<script setup lang="ts">
interface Props {
  block?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  block: false,
  label: 'Loading',
  size: 'md',
})
</script>

<template>
  <span
    class="lulu-loading"
    role="status"
    aria-live="polite"
    :data-block="props.block || undefined"
    :data-size="props.size"
  >
    <span class="lulu-loading__indicator" aria-hidden="true">…</span>
    <span class="lulu-loading__label"><slot>{{ props.label }}</slot></span>
  </span>
</template>
