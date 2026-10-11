<script lang="ts">
export type { SliderRangeValue, SliderValue } from './range-values'

export interface LuluSliderProps<TRange extends boolean = false> {
  disabled?: boolean | undefined
  endLabel?: string | undefined
  endName?: string | undefined
  invalid?: boolean | undefined
  max?: number | undefined
  min?: number | undefined
  // Boolean 交集保留 Vue 的运行时类型推断，让无值 range 属性也能启用范围模式。
  range?: (TRange & boolean) | undefined
  startLabel?: string | undefined
  startName?: string | undefined
  step?: number | undefined
}
</script>

<script setup lang="ts" generic="TRange extends boolean = false">
import { computed, shallowRef, useAttrs } from 'vue'
import { controlErrorAttrs, controlInvalid, controlLayoutAttrs, nativeControlAttrs, useControlAttrs } from './control-attrs'
import { orderedRange, rangeKeyValue, rangeLimits, setNativeRangeValue, snapRangeValue, type SliderRangeValue, type SliderValue } from './range-values'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LuluSliderProps<TRange>>(), {
  disabled: false,
  endLabel: '最大值',
  invalid: false,
  max: 100,
  min: 0,
  startLabel: '最小值',
  step: 1,
})
const modelValue = defineModel<NoInfer<SliderValue<TRange>>>({ required: true })
const attrs = useControlAttrs()
const explicitAttrs = useAttrs()
const track = shallowRef<HTMLElement | null>(null)
const container = shallowRef<HTMLElement | null>(null)
const activeThumb = shallowRef<0 | 1>(0)
let dragging: 0 | 1 | null = null
let dragChanged = false
const limits = computed(() => rangeLimits(props.min, props.max, props.step))
const values = computed<SliderRangeValue>(() => orderedRange(modelValue.value, limits.value))
const startPercent = computed(() => props.range ? percentage(values.value[0]) : 0)
const endPercent = computed(() => percentage(props.range ? values.value[1] : values.value[0]))

function textAttr(name: string) {
  const value = attrs(explicitAttrs)[name]
  return typeof value === 'string' ? value : undefined
}

function percentage(value: number) {
  const { min, max } = limits.value
  return max > min ? (value - min) / (max - min) * 100 : 0
}

function nextValue(index: 0 | 1, raw: number) {
  const value = snapRangeValue(raw, limits.value)
  const [start, end] = values.value
  return props.range
    ? index === 0 ? [Math.min(value, end), end] as SliderRangeValue : [start, Math.max(value, start)] as SliderRangeValue
    : value
}

function commit(index: 0 | 1, raw: number) {
  const next = nextValue(index, raw)
  if (!props.disabled) modelValue.value = next as SliderValue<TRange>
  return Array.isArray(next) ? next[index] : next
}

function setValue(index: 0 | 1, raw: number, change = false) {
  const next = nextValue(index, raw)
  return setNativeRangeValue(container.value?.querySelectorAll('input')[index], Array.isArray(next) ? next[index] : next, change)
}

function updateValue(index: 0 | 1, event: Event) {
  const input = event.target
  if (!(input instanceof HTMLInputElement)) return
  input.value = String(props.disabled || !Number.isFinite(input.valueAsNumber)
    ? values.value[index] : commit(index, input.valueAsNumber))
}

function handleKeydown(index: 0 | 1, event: KeyboardEvent) {
  if (props.disabled) return
  const value = rangeKeyValue(event.key, values.value[index], limits.value)
  if (value === undefined) return
  event.preventDefault()
  setValue(index, value, true)
}

function pointerValue(event: PointerEvent) {
  const rect = track.value?.getBoundingClientRect()
  if (!rect?.width) return undefined
  const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1)
  return limits.value.min + ratio * (limits.value.max - limits.value.min)
}

function startDrag(event: PointerEvent) {
  if (props.disabled || event.button !== 0) return
  const value = pointerValue(event)
  if (value === undefined) return
  event.preventDefault()
  const [start, end] = values.value
  const firstDistance = Math.abs(value - start)
  const secondDistance = Math.abs(value - end)
  dragging = props.range && (secondDistance < firstDistance || (firstDistance === secondDistance && value >= end && end < limits.value.max)) ? 1 : 0
  activeThumb.value = dragging
  container.value?.querySelectorAll('input')[dragging]?.focus()
  dragChanged = setValue(dragging, value)
  if (typeof event.pointerId === 'number') container.value?.setPointerCapture?.(event.pointerId)
}

function moveDrag(event: PointerEvent) {
  if (dragging === null || props.disabled) return
  const value = pointerValue(event)
  if (value !== undefined) dragChanged = setValue(dragging, value) || dragChanged
}

function stopDrag(event: PointerEvent) {
  if (dragging !== null && dragChanged && !props.disabled) {
    container.value?.querySelectorAll('input')[dragging]?.dispatchEvent(new Event('change', { bubbles: true }))
  }
  dragging = null
  dragChanged = false
  if (container.value?.hasPointerCapture?.(event.pointerId)) container.value.releasePointerCapture(event.pointerId)
}
</script>

<template>
  <div
    v-bind="controlLayoutAttrs($attrs)"
    ref="container"
    class="lulu-slider"
    :data-range="!!props.range"
    :data-disabled="props.disabled"
    :data-invalid="controlInvalid(props.invalid, attrs($attrs))"
    :style="{ '--_lulu-slider-start': `${startPercent}%`, '--_lulu-slider-end': `${endPercent}%` }"
    @pointerdown="startDrag"
    @pointermove="moveDrag"
    @pointerup="stopDrag"
    @pointercancel="stopDrag"
    @lostpointercapture="stopDrag"
  >
    <span ref="track" class="lulu-slider__track" aria-hidden="true"><span class="lulu-slider__fill" /></span>
    <input
      v-bind="nativeControlAttrs(attrs($attrs))"
      type="range"
      class="lulu-slider__input"
      :class="{ 'lulu-range-slider__start': props.range }"
      :value="values[0]"
      :min="limits.min"
      :max="limits.max"
      :step="limits.step"
      :disabled="props.disabled"
      :name="props.range ? props.startName ?? textAttr('name') : textAttr('name')"
      :aria-invalid="controlInvalid(props.invalid, attrs($attrs))"
      :aria-label="props.range ? props.startLabel : textAttr('aria-label')"
      :aria-valuemax="props.range ? values[1] : undefined"
      :style="{ zIndex: activeThumb === 0 ? 2 : 1 }"
      @input="updateValue(0, $event)"
      @keydown="handleKeydown(0, $event)"
      @focus="activeThumb = 0"
    >
    <input
      v-if="props.range"
      v-bind="controlErrorAttrs(attrs($attrs))"
      type="range"
      class="lulu-slider__input lulu-range-slider__end"
      :value="values[1]"
      :min="limits.min"
      :max="limits.max"
      :step="limits.step"
      :disabled="props.disabled"
      :name="props.endName"
      :required="attrs($attrs).required === true"
      :aria-invalid="controlInvalid(props.invalid, attrs($attrs))"
      :aria-label="props.endLabel"
      :aria-valuemin="values[0]"
      :style="{ zIndex: activeThumb === 1 ? 2 : 1 }"
      @input="updateValue(1, $event)"
      @keydown="handleKeydown(1, $event)"
      @focus="activeThumb = 1"
    >
  </div>
</template>
