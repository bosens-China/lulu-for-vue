<script setup lang="ts">
import { computed } from 'vue'
import { controlErrorAttrs, nativeControlAttrs, useControlAttrs, controlLayoutAttrs } from './control-attrs'

defineOptions({ inheritAttrs: false })
const attrs = useControlAttrs()

interface Props {
  alpha?: boolean
  alphaLabel?: string
  disabled?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  alpha: false,
  alphaLabel: '透明度',
  disabled: false,
  label: '颜色',
})

const emit = defineEmits<{
  change: [value: string]
}>()
const modelValue = defineModel<string>({ default: '#000000' })

const colorValue = computed(() => normalizeColor(modelValue.value).slice(0, 7))
const alphaValue = computed(() => Number.parseInt(normalizeColor(modelValue.value).slice(7, 9), 16) / 255)
const submittedValue = computed(() => props.alpha ? normalizeColor(modelValue.value) : colorValue.value)

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
  modelValue.value = formatValue(color, alpha)
}

function formatValue(color: string, alpha: number) {
  const base = normalizeColor(color).slice(0, 7)
  return props.alpha ? `${base}${toAlphaHex(alpha)}` : base
}

function commitValue(event: Event) {
  const input = event.target

  if (!(input instanceof HTMLInputElement)) return

  // input 和 change 可在同一轮触发；此时受控父级尚未把新模型渲染回来。
  const color = input.type === 'color' ? input.value : colorValue.value
  const alpha = input.type === 'range' ? input.valueAsNumber : alphaValue.value
  if (Number.isFinite(alpha)) emit('change', formatValue(color, alpha))
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
  <span v-bind="controlLayoutAttrs($attrs)" class="lulu-color-picker">
    <input
      type="hidden"
      :name="typeof attrs($attrs).name === 'string' ? String(attrs($attrs).name) : undefined"
      :form="typeof $attrs.form === 'string' ? $attrs.form : undefined"
      :value="submittedValue"
      :disabled="props.disabled"
    >
    <input
      v-bind="nativeControlAttrs(attrs($attrs))"
      class="lulu-color-picker__color"
      type="color"
      :value="colorValue"
      :name="undefined"
      :aria-label="props.label"
      :disabled="props.disabled"
      @input="updateColor"
      @change="commitValue"
    >
    <input
      v-if="props.alpha"
      v-bind="controlErrorAttrs(attrs($attrs))"
      class="lulu-color-picker__alpha"
      type="range"
      min="0"
      max="1"
      step="0.01"
      :value="alphaValue"
      :aria-label="props.alphaLabel"
      :disabled="props.disabled"
      @input="updateAlpha"
      @change="commitValue"
    >
  </span>
</template>
