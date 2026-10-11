import { onMounted, onScopeDispose, readonly, shallowRef, watch } from 'vue'
import type { FormFieldRegistration } from './form-context'
import { cloneFormValue, isEmptyFormValue, restoreFormModel } from './form-model'
import type { FormErrors, FormModel, FormRule, FormRules } from './form-types'

interface Options {
  model: () => object | undefined
  rules: () => FormRules | undefined
  element: () => HTMLFormElement | null
}

/** 模型值参与业务校验，原生约束只补充输入类型和 HTML 约束。 */
export function useModelForm(options: Options) {
  const errors = shallowRef<FormErrors>({})
  const validating = shallowRef(false)
  const fields = new Set<FormFieldRegistration>()
  let initial: FormModel | undefined
  let revision = 0

  onMounted(() => {
    const model = options.model()
    if (model) initial = cloneFormValue(model) as FormModel
  })
  watch(options.model, () => {
    revision++
    validating.value = false
    const model = options.model()
    if (!initial && model) initial = cloneFormValue(model) as FormModel
  }, { deep: true, flush: 'sync' })
  watch(() => Object.entries(options.rules() ?? {}).flatMap(([name, rules]) => [name, ...asRules(rules)]), invalidateConfiguration, { flush: 'sync' })
  onScopeDispose(() => { revision++ })

  function register(field: FormFieldRegistration) {
    fields.add(field)
    const stop = watch(() => {
      const props = field.getProps()
      return [props.name, props.required, ...asRules(props.rules)]
    }, invalidateConfiguration, { flush: 'sync' })
    return () => { fields.delete(field); stop(); revision++ }
  }

  function invalidateConfiguration(next: unknown[], previous: unknown[]) {
    // 内联规则数组在重新渲染时可重建；只在实际规则或字段配置变化时废弃请求。
    if (next.length === previous.length && next.every((value, index) => value === previous[index])) return
    revision++
    validating.value = false
  }

  function clearValidate(names?: string | readonly string[]) {
    revision++
    validating.value = false
    if (names === undefined) errors.value = {}
    else {
      const next = { ...errors.value }
      for (const name of typeof names === 'string' ? [names] : names) delete next[name]
      errors.value = next
    }
  }

  function resetFields() {
    clearValidate()
    const model = options.model()
    if (model && initial) restoreFormModel(model as FormModel, initial)
  }

  async function runValidation() {
    const current = ++revision
    const model = options.model()
    const values = cloneFormValue(model ?? {}) as FormModel
    const nextErrors: FormErrors = Object.create(null)
    validating.value = true
    const rules = options.rules() ?? {}
    const registered = new Map<string, FormFieldRegistration>()
    for (const field of fields) {
      const name = field.getProps().name
      if (name) registered.set(name, field)
    }
    const { errors: nativeErrors, valid: nativeValid } = collectNativeErrors(options.element(), fields)
    const names = new Set([...Object.keys(rules), ...registered.keys(), ...Object.keys(nativeErrors)])

    await Promise.all(Array.from(names, async (name) => {
      const field = registered.get(name)?.getProps()
      let message = field?.required && isEmptyFormValue(values[name]) ? '请填写此项' : nativeErrors[name]
      const fieldRules = [...asRules(Object.prototype.hasOwnProperty.call(rules, name) ? rules[name] : undefined), ...asRules(field?.rules)]
      for (const rule of fieldRules) {
        if (message) break
        try {
          message = await rule(values[name], { name, model: values })
        } catch (error: unknown) {
          message = error instanceof Error && error.message ? error.message : '校验失败，请重试'
        }
      }
      if (message) nextErrors[name] = message
    }))

    const stale = current !== revision
    if (!stale) { errors.value = nextErrors; validating.value = false }
    return { valid: !stale && nativeValid && Object.keys(nextErrors).length === 0, stale, values, errors: nextErrors }
  }

  async function validate() { return (await runValidation()).valid }

  return { errors: readonly(errors), validating: readonly(validating), register, validate, runValidation, resetFields, clearValidate }
}

function asRules(rules: FormRule | readonly FormRule[] | undefined): readonly FormRule[] {
  return typeof rules === 'function' ? [rules] : rules ?? []
}

function collectNativeErrors(form: HTMLFormElement | null, fields: Set<FormFieldRegistration>) {
  const errors: FormErrors = Object.create(null)
  let valid = true
  if (!form) return { errors, valid }
  const fieldNames = new Map(Array.from(fields, field => [field.getId(), field.getProps().name]))
  for (const control of Array.from(form.elements)) {
    if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement)) continue
    if (!control.willValidate || control.validity.valid) continue
    valid = false
    // 复合字段第二个输入可以没有 name/id，仍归入其最近的 FormItem。
    const fieldId = control.closest('[data-lulu-field-id]')?.getAttribute('data-lulu-field-id')
    const name = fieldNames.get(fieldId ?? '') || fieldNames.get(control.id) || control.name || control.id
    if (name && !errors[name]) errors[name] = control.validationMessage || '请检查此项'
  }
  return { errors, valid }
}
