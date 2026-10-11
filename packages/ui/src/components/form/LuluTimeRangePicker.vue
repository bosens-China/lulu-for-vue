<script setup lang="ts">
import LuluDateRangePicker, { type DateRangeValue } from './LuluDateRangePicker.vue'

interface Props {
  disabled?: boolean
  invalid?: boolean
  min?: string
  max?: string
  required?: boolean
  step?: number | string
  startName?: string
  endName?: string
  startLabel?: string
  endLabel?: string
  order?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  startLabel: '开始时间',
  endLabel: '结束时间',
  order: false,
})
const modelValue = defineModel<DateRangeValue>({ required: true })
</script>

<template>
  <LuluDateRangePicker v-bind="props" v-model="modelValue" class="lulu-time-range-picker" type="time" />
</template>
