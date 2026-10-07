<script setup lang="ts">
const { tag = 'main' } = defineProps<{
  tag?: string
}>()
</script>

<template>
  <component
    :is="tag"
    class="docs-content flex-1 min-w-0 bg-[var(--docs-color-container)] text-[var(--lulu-color-text)] transition-colors duration-200"
  >
    <slot />
  </component>
</template>
