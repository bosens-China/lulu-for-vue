import { computed, inject, onScopeDispose, provide, shallowRef } from 'vue'
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { FormErrors, FormItemProps } from './form-types'

export interface FormFieldRegistration {
  getProps: () => FormItemProps
  getId: () => string
}

export interface FormContext {
  errors: Readonly<Ref<FormErrors>>
  register: (field: FormFieldRegistration) => () => void
}

export const formContextKey: InjectionKey<FormContext> = Symbol('lulu-form')
interface FormItemControlContext {
  props: ComputedRef<Record<string, unknown>>
  register: () => { position: ComputedRef<number>; release: () => void }
}

const formItemControlKey: InjectionKey<FormItemControlContext> = Symbol('lulu-form-item')

export function provideFormItemControl(props: ComputedRef<Record<string, unknown>>) {
  const controls = shallowRef<symbol[]>([])
  provide(formItemControlKey, {
    props,
    register() {
      const token = Symbol('control')
      controls.value = [...controls.value, token]
      return {
        position: computed(() => controls.value.indexOf(token)),
        release: () => { controls.value = controls.value.filter(control => control !== token) },
      }
    },
  })
}

/** 库内控件自动连接字段；原生或第三方控件仍可使用 controlProps 插槽。 */
export function useFormItemControl(): ComputedRef<Record<string, unknown>> {
  const field = inject(formItemControlKey, undefined)
  if (!field) return computed(() => ({}))
  const { position, release } = field.register()
  onScopeDispose(release)
  return computed(() => {
    const props = field.props.value
    // 同一逻辑字段的多个控件共享 name/错误描述，ID 必须各自唯一。
    return position.value > 0 ? { ...props, id: `${props.id}-control-${position.value + 1}` } : props
  })
}
