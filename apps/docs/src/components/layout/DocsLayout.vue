<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { LAYOUT_CONTEXT_KEY } from './layout-context'

const props = withDefaults(
  defineProps<{
    hasSider?: boolean | undefined
    tag?: string
  }>(),
  {
    hasSider: undefined,
    tag: 'section',
  },
)

const siderCount = ref(0)

function registerSider() {
  siderCount.value++
  return () => {
    siderCount.value--
  }
}

const computedHasSider = computed(() => {
  if (typeof props.hasSider === 'boolean') {
    return props.hasSider
  }
  return siderCount.value > 0
})

provide(LAYOUT_CONTEXT_KEY, {
  registerSider,
  hasSider: computedHasSider,
})
</script>

<template>
  <component
    :is="tag"
    class="docs-layout flex flex-1 w-full min-h-0 bg-[var(--lulu-color-bg-page)] text-[var(--lulu-color-text)] transition-colors duration-200"
    :class="[computedHasSider ? 'flex-row' : 'flex-col']"
  >
    <slot />
  </component>
</template>
