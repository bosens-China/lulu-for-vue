<script setup lang="ts">
import LuluDatePicker from './LuluDatePicker.vue'

interface Props {
  disabled?: boolean
  invalid?: boolean
  min?: string
  max?: string
  required?: boolean
  step?: number | string
}

const props = defineProps<Props>()
const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <LuluDatePicker v-bind="props" v-model="modelValue" class="lulu-time-picker" type="time" />
</template>
