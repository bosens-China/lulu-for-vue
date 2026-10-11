export type SliderRangeValue = [start: number, end: number]
export type SliderValue<TRange extends boolean = false> = TRange extends true ? SliderRangeValue : number

export interface RangeLimits {
  min: number
  max: number
  step: number
}

export function rangeLimits(min: number, max: number, step: number, fallbackMax = 100, fallbackStep = 1): RangeLimits {
  const minimum = Number.isFinite(min) ? min : 0
  return {
    min: minimum,
    max: Math.max(Number.isFinite(max) ? max : fallbackMax, minimum),
    step: Number.isFinite(step) && step > 0 ? step : fallbackStep,
  }
}

export function clampRangeValue(value: number, limits: RangeLimits) {
  return Math.min(Math.max(Number.isFinite(value) ? value : limits.min, limits.min), limits.max)
}

/** 与原生 range 一致，以 min 为步长起点；小数计算收敛后再回传。 */
export function snapRangeValue(value: number, limits: RangeLimits) {
  const count = Math.round((clampRangeValue(value, limits) - limits.min) / limits.step)
  const last = Math.floor((limits.max - limits.min) / limits.step + 1e-10)
  return Number((limits.min + Math.min(count, last) * limits.step).toPrecision(12))
}

export function orderedRange(value: number | SliderRangeValue, limits: RangeLimits): SliderRangeValue {
  const [first, second] = Array.isArray(value) ? value : [value, value]
  const start = snapRangeValue(first, limits)
  const end = snapRangeValue(second, limits)
  return start <= end ? [start, end] : [end, start]
}

export function rangeKeyValue(key: string, value: number, limits: RangeLimits): number | undefined {
  if (key === 'Home') return limits.min
  if (key === 'End') return limits.max
  if (key === 'ArrowRight' || key === 'ArrowUp') return value + limits.step
  if (key === 'ArrowLeft' || key === 'ArrowDown') return value - limits.step
  if (key === 'PageUp') return value + limits.step * 10
  if (key === 'PageDown') return value - limits.step * 10
  return undefined
}

/** 自绘轨道与图形仍通过真实输入提交，保留原生事件对象和表单监听语义。 */
export function setNativeRangeValue(input: HTMLInputElement | null | undefined, value: number, change = false) {
  if (!input || input.disabled || input.valueAsNumber === value) return false
  input.value = String(value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
  if (change) input.dispatchEvent(new Event('change', { bubbles: true }))
  return true
}
