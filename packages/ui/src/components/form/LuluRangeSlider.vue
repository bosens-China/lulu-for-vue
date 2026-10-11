<script setup lang="ts">
import LuluSlider from './LuluSlider.vue'
import type { SliderRangeValue } from './range-values'

defineOptions({ inheritAttrs: false })

interface Props {
  disabled?: boolean
  endLabel?: string
  endName?: string
  invalid?: boolean
  max?: number
  min?: number
  startLabel?: string
  startName?: string
  step?: number
}

const props = defineProps<Props>()
const modelValue = defineModel<SliderRangeValue>({ required: true })
</script>

<template>
  <LuluSlider v-bind="{ ...$attrs, ...props }" v-model="modelValue" class="lulu-range-slider" range />
</template>
