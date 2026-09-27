import { readonly, shallowRef, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export type ValidatableFormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export type FormValidationRule = (
  value: string,
  control: ValidatableFormControl,
) => string | undefined

export type FormValidationRules = Record<string, FormValidationRule>
export type FormValidationErrors = Record<string, string>

export interface UseFormValidationOptions {
  rules?: MaybeRefOrGetter<FormValidationRules>
}

/**
 * 汇总原生约束校验与业务规则，错误状态交给 Vue 组件渲染。
 */
export function useFormValidation(
  form: MaybeRefOrGetter<HTMLFormElement | null | undefined>,
  options: UseFormValidationOptions = {},
) {
  const errors = shallowRef<FormValidationErrors>({})

  function validate() {
    const formElement = toValue(form)

    if (!formElement) {
      errors.value = {}
      return false
    }

    const rules = toValue(options.rules ?? {})
    const nextErrors: FormValidationErrors = {}

    for (const { controls, fieldName } of getValidationFields(formElement)) {
      if (nextErrors[fieldName]) continue

      const control = controls.find(isCheckedControl) ?? controls[0]

      if (!control) continue

      const nativeError = controls
        .map(getNativeError)
        .find((message): message is string => message !== undefined)
      const customError = nativeError
        ? undefined
        : rules[fieldName]?.(getRuleValue(control), control)
      const message = nativeError ?? customError

      if (message) {
        nextErrors[fieldName] = message
      }
    }

    errors.value = nextErrors

    return Object.keys(nextErrors).length === 0 && formElement.checkValidity()
  }

  function reset() {
    toValue(form)?.reset()
    errors.value = {}
  }

  return {
    errors: readonly(errors),
    reset,
    validate,
  }
}

function getValidatableControls(form: HTMLFormElement): ValidatableFormControl[] {
  return Array.from(form.elements)
    .filter(isValidatableFormControl)
    .filter(control => control.willValidate)
}

function getValidationFields(form: HTMLFormElement) {
  const fields = new Map<string, {
    controls: ValidatableFormControl[]
    fieldName: string
  }>()

  for (const [index, control] of getValidatableControls(form).entries()) {
    const fieldName = control.name || control.id

    if (!fieldName) continue

    const key = isChoiceControl(control) && control.name
      ? `${control.type}:${control.name}`
      : `${index}:${fieldName}`
    const field = fields.get(key)

    if (field) field.controls.push(control)
    else fields.set(key, { controls: [control], fieldName })
  }

  return fields.values()
}

function isValidatableFormControl(element: Element): element is ValidatableFormControl {
  return element instanceof HTMLInputElement
    || element instanceof HTMLSelectElement
    || element instanceof HTMLTextAreaElement
}

function getNativeError(control: ValidatableFormControl) {
  if (control.validity.valid) {
    return undefined
  }

  return control.validationMessage || 'Invalid value'
}

function isChoiceControl(control: ValidatableFormControl): control is HTMLInputElement {
  return control instanceof HTMLInputElement
    && (control.type === 'checkbox' || control.type === 'radio')
}

function isCheckedControl(control: ValidatableFormControl) {
  return isChoiceControl(control) && control.checked
}

function getRuleValue(control: ValidatableFormControl) {
  return isChoiceControl(control) && !control.checked ? '' : control.value
}
