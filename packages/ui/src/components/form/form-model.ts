import type { FormModel } from './form-types'

/** 表单模型使用普通对象、数组与 Date；保留循环引用，避免快照和父级数据共享。 */
export function cloneFormValue<T>(value: T, seen = new WeakMap<object, unknown>()): T {
  if (!value || typeof value !== 'object') return value
  if (value instanceof Date) return new Date(value.getTime()) as T
  const prototype = Object.getPrototypeOf(value)
  if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) return value
  const known = seen.get(value)
  if (known) return known as T
  if (Array.isArray(value)) {
    const copy: unknown[] = []
    seen.set(value, copy)
    for (const item of value) copy.push(cloneFormValue(item, seen))
    return copy as T
  }
  const copy: Record<string, unknown> = {}
  seen.set(value, copy)
  for (const [name, item] of Object.entries(value)) {
    Object.defineProperty(copy, name, {
      value: cloneFormValue(item, seen), enumerable: true, configurable: true, writable: true,
    })
  }
  return copy as T
}

export function restoreFormModel(model: FormModel, initial: FormModel) {
  for (const name of Object.keys(model)) {
    if (!Object.prototype.hasOwnProperty.call(initial, name)) delete model[name]
  }
  for (const [name, value] of Object.entries(cloneFormValue(initial))) model[name] = value
}

export function isEmptyFormValue(value: unknown) {
  return value === undefined || value === null || value === '' || value === false
    || (Array.isArray(value) && value.length === 0)
}
