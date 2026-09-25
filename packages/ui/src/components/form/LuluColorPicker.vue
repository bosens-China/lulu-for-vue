<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

interface Props {
  alpha?: boolean
  disabled?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  alpha: false,
  disabled: false,
  label: 'Color',
})

const emit = defineEmits<{
  change: [value: string]
}>()
const modelValue = defineModel<string>({ default: '#000000' })

const colorValue = computed(() => normalizeColor(modelValue.value).slice(0, 7))
const alphaValue = computed(() => Number.parseInt(normalizeColor(modelValue.value).slice(7, 9), 16) / 255)

function updateColor(event: Event) {
  const input = event.target

  if (!(input instanceof HTMLInputElement)) return

  updateValue(input.value, alphaValue.value)
}

function updateAlpha(event: Event) {
  const input = event.target

  if (!(input instanceof HTMLInputElement) || !Number.isFinite(input.valueAsNumber)) return

  updateValue(colorValue.value, input.valueAsNumber)
}

function updateValue(color: string, alpha: number) {
  const base = normalizeColor(color).slice(0, 7)
  const value = props.alpha ? `${base}${toAlphaHex(alpha)}` : base

  modelValue.value = value
  emit('change', value)
}

function normalizeColor(value: string) {
  const normalized = value.trim().toLowerCase()

  if (/^#[\da-f]{8}$/i.test(normalized)) return normalized
  if (/^#[\da-f]{6}$/i.test(normalized)) return `${normalized}ff`
  if (/^#[\da-f]{3}$/i.test(normalized)) {
    return `#${normalized.slice(1).split('').map((part) => part.repeat(2)).join('')}ff`
  }

  return '#000000ff'
}

function toAlphaHex(value: number) {
  return Math.round(Math.min(Math.max(value, 0), 1) * 255).toString(16).padStart(2, '0')
}
</script>

<template>
  <span class="lulu-color-picker">
    <input
      v-bind="$attrs"
      class="lulu-color-picker__color"
      type="color"
      :value="colorValue"
      :aria-label="props.label"
      :disabled="props.disabled"
      @input="updateColor"
    >
    <input
      v-if="props.alpha"
      class="lulu-color-picker__alpha"
      type="range"
      min="0"
      max="1"
      step="0.01"
      :value="alphaValue"
      aria-label="Opacity"
      :disabled="props.disabled"
      @input="updateAlpha"
    >
  </span>
</template>
