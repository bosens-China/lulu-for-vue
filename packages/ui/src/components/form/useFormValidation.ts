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

    for (const control of getValidatableControls(formElement)) {
      const fieldName = control.name || control.id

      if (!fieldName) {
        continue
      }

      const nativeError = getNativeError(control)
      const customError = nativeError ? undefined : rules[fieldName]?.(control.value, control)
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
  return Array.from(form.elements).filter(isValidatableFormControl)
}

function isValidatableFormControl(element: Element): element is ValidatableFormControl {
  return element instanceof HTMLInputElement
    || element instanceof HTMLSelectElement
    || element instanceof HTMLTextAreaElement
}

function getNativeError(control: ValidatableFormControl) {
  if (!control.willValidate || control.validity.valid) {
    return undefined
  }

  return control.validationMessage || 'Invalid value'
}
