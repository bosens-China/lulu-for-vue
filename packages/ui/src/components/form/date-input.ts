export type DatePickerType = 'date' | 'datetime-local' | 'month' | 'time' | 'week'
export type DatePickerGranularity = 'date' | 'week' | 'month' | 'year'

export function dateInputType(picker: DatePickerGranularity | undefined, type: DatePickerType, showTime: boolean) {
  const selected = picker === 'year' ? 'number' : picker ?? type
  return selected === 'date' && showTime ? 'datetime-local' : selected
}

export function dateInputValue(input: HTMLInputElement): string {
  if (input.type !== 'number') return input.value
  return input.value === '' || !Number.isFinite(input.valueAsNumber) ? '' : String(Math.trunc(input.valueAsNumber))
}

export function compareDateValues(first: string, second: string, year: boolean): number {
  return year ? Number(first) - Number(second) : first.localeCompare(second)
}
