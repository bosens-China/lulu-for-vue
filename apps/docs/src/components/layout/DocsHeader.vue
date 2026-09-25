<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tag?: string
    sticky?: boolean
  }>(),
  {
    tag: 'header',
    sticky: true,
  },
)
</script>

<template>
  <component
    :is="tag"
    class="docs-header w-full shrink-0 border-b border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-bg-container)] text-[var(--lulu-color-text-heading)] transition-colors duration-200 z-30 shadow-2xs"
    :class="[props.sticky ? 'sticky top-0 backdrop-blur-md' : '']"
  >
    <slot />
  </component>
</template>
