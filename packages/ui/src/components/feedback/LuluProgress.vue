<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  max?: number
  value?: number
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
})

const max = computed(() =>
  Number.isFinite(props.max) && props.max > 0 ? props.max : 100,
)

const value = computed(() => {
  if (props.value === undefined || !Number.isFinite(props.value)) {
    return undefined
  }

  return Math.min(Math.max(props.value, 0), max.value)
})
</script>

<template>
  <progress class="lulu-progress" :max="max" :value="value">
    <slot>{{ value === undefined ? 'Loading' : `${value}/${max}` }}</slot>
  </progress>
</template>
