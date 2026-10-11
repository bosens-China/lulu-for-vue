export type FormModel = Record<string, unknown>
export type FormErrors = Record<string, string>

export interface FormRuleContext {
  name: string
  model: Readonly<FormModel>
}

export type FormRule = (
  value: unknown,
  context: FormRuleContext,
) => string | undefined | Promise<string | undefined>

export type FormRules = Record<string, FormRule | readonly FormRule[]>

export interface FormProps {
  model?: object | undefined
  rules?: FormRules | undefined
}

export interface FormFinishFailed {
  values: FormModel
  errors: FormErrors
}

export interface FormInstance {
  element: HTMLFormElement | null
  errors: Readonly<FormErrors>
  validating: boolean
  validate: () => Promise<boolean>
  resetFields: () => void
  clearValidate: (names?: string | readonly string[]) => void
}

export interface FormItemProps {
  name?: string | undefined
  controlId?: string | undefined
  label?: string | undefined
  required?: boolean | undefined
  help?: string | undefined
  error?: string | undefined
  rules?: FormRule | readonly FormRule[] | undefined
}

