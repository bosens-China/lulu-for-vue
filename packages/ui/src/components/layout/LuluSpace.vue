<script setup lang="ts">
interface Props {
  direction?: 'horizontal' | 'vertical'
  size?: 'small' | 'middle' | 'large'
  wrap?: boolean
}

withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  size: 'middle',
  wrap: false,
})

defineSlots<{
  default(): unknown
}>()
</script>

<template>
  <div class="lulu-space" :data-direction="direction" :data-size="size" :data-wrap="wrap || undefined">
    <slot />
  </div>
</template>
