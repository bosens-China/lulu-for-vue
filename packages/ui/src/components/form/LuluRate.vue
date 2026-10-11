<script setup lang="ts">
import { computed, shallowRef, useAttrs, watch } from 'vue'
import { controlInvalid, controlLayoutAttrs, nativeControlAttrs, useControlAttrs } from './control-attrs'
import { rangeKeyValue, rangeLimits, setNativeRangeValue, snapRangeValue } from './range-values'

defineOptions({ inheritAttrs: false })

interface Props {
  clearable?: boolean
  disabled?: boolean
  invalid?: boolean
  label?: string
  max?: number
  min?: number
  readonly?: boolean
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  clearable: false,
  disabled: false,
  invalid: false,
  label: '评分',
  max: 5,
  min: 0,
  readonly: false,
  step: 0.5,
})
const modelValue = defineModel<number>({ required: true })
defineSlots<{
  icon?(props: { index: number, active: boolean, fraction: number }): unknown
}>()
const attrs = useControlAttrs()
const explicitAttrs = useAttrs()
const input = shallowRef<HTMLInputElement | null>(null)
const preview = shallowRef<number | null>(null)
const limits = computed(() => rangeLimits(props.min, props.max, props.step, 5, 0.5))
const value = computed(() => snapRangeValue(modelValue.value, limits.value))
const displayed = computed(() => preview.value ?? value.value)
const stars = computed(() => Math.max(0, Math.ceil(limits.value.max)))
const valueText = computed(() => `${value.value} / ${limits.value.max}`)
function inputLabel() {
  const current = attrs(explicitAttrs)
  return typeof current['aria-label'] === 'string'
    ? current['aria-label'] : current['aria-labelledby'] ? undefined : props.label
}
function tabindex() {
  const value = attrs(explicitAttrs).tabindex
  return props.readonly ? -1 : typeof value === 'string' || typeof value === 'number' ? value : undefined
}
watch(() => props.disabled || props.readonly, () => { preview.value = null })

function fraction(index: number) {
  return Math.min(Math.max(displayed.value - index + 1, 0), 1)
}

function commit(raw: number) {
  if (!props.disabled && !props.readonly) modelValue.value = snapRangeValue(raw, limits.value)
}

function updateValue(event: Event) {
  const target = event.target
  if (!(target instanceof HTMLInputElement)) return
  if (props.readonly || props.disabled || !Number.isFinite(target.valueAsNumber)) {
    target.value = String(value.value)
    return
  }
  commit(target.valueAsNumber)
}

function pointerValue(index: number, event: MouseEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const ratio = rect.width ? Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1) : 1
  const raw = index - 1 + Math.max(ratio, 1e-10)
  const ticks = Math.ceil((raw - limits.value.min) / limits.value.step)
  return snapRangeValue(limits.value.min + ticks * limits.value.step, limits.value)
}

function showPreview(index: number, event: PointerEvent) {
  if (!props.disabled && !props.readonly) preview.value = pointerValue(index, event)
}

function select(index: number, event: MouseEvent) {
  if (props.disabled || props.readonly) return
  const next = pointerValue(index, event)
  setNativeRangeValue(input.value, props.clearable && next === value.value ? limits.value.min : next, true)
  preview.value = null
  input.value?.focus()
}

function handleKeydown(event: KeyboardEvent) {
  const next = props.clearable && (event.key === 'Delete' || event.key === 'Backspace')
    ? limits.value.min : rangeKeyValue(event.key, value.value, limits.value)
  if (next === undefined) return
  event.preventDefault()
  if (!props.readonly) setNativeRangeValue(input.value, snapRangeValue(next, limits.value), true)
  preview.value = null
}
</script>

<template>
  <span
    v-bind="controlLayoutAttrs($attrs)"
    class="lulu-rate"
    :data-disabled="props.disabled"
    :data-readonly="props.readonly"
    :data-invalid="controlInvalid(props.invalid, attrs($attrs))"
    @pointerleave="preview = null"
  >
    <input
      v-bind="nativeControlAttrs(attrs($attrs))"
      ref="input"
      type="range"
      class="lulu-rate__control"
      :value="value"
      :min="limits.min"
      :max="limits.max"
      :step="limits.step"
      :disabled="props.disabled"
      :readonly="props.readonly || undefined"
      :tabindex="tabindex()"
      :aria-label="inputLabel()"
      :aria-invalid="controlInvalid(props.invalid, attrs($attrs))"
      :aria-readonly="props.readonly || undefined"
      :aria-valuetext="valueText"
      @input="updateValue"
      @keydown="handleKeydown"
    >
    <span class="lulu-rate__stars" aria-hidden="true">
      <span
        v-for="index in stars"
        :key="index"
        class="lulu-rate__star"
        :data-preview="preview !== null"
        @pointermove="showPreview(index, $event)"
        @click="select(index, $event)"
      >
        <span class="lulu-rate__empty"><slot name="icon" :index="index" :active="false" :fraction="fraction(index)"><svg viewBox="0 0 24 24" focusable="false"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01Z" /></svg></slot></span>
        <span class="lulu-rate__filled" :style="{ clipPath: `inset(0 ${(1 - fraction(index)) * 100}% 0 0)` }"><slot name="icon" :index="index" :active="true" :fraction="fraction(index)"><svg viewBox="0 0 24 24" focusable="false"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01Z" /></svg></slot></span>
      </span>
    </span>
  </span>
</template>
