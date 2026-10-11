<script setup lang="ts">
interface Props {
  direction?: 'horizontal' | 'vertical'
  size?: 'small' | 'default' | 'large' | 'middle'
  wrap?: boolean
}

withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  size: 'default',
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
