import type { AriaAttributes, StyleValue } from 'vue'
import { useFormItemControl } from './form-context'

/** 字段关联由上下文补全，业务显式属性优先；描述 ID 合并以保留帮助与错误信息。 */
export function useControlAttrs() {
  const field = useFormItemControl()
  return (attrs: Record<string, unknown>): Record<string, unknown> => {
    const merged = { ...field.value, ...attrs }
    const descriptions = [field.value['aria-describedby'], attrs['aria-describedby']]
      .filter((value): value is string => typeof value === 'string')
      .flatMap(value => value.split(/\s+/)).filter(Boolean)
    if (descriptions.length) merged['aria-describedby'] = [...new Set(descriptions)].join(' ')
    return merged
  }
}

/** 复合控件把布局属性留在外层，原生属性和事件传给实际输入。 */
export function nativeControlAttrs(attrs: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(attrs).filter(([name]) => !['class', 'style', 'data-lulu-theme'].includes(name)))
}

export function controlLayoutAttrs(attrs: Record<string, unknown>) {
  return { class: attrs.class, style: attrs.style as StyleValue, 'data-lulu-theme': attrs['data-lulu-theme'] }
}

/** 显式错误状态优先，否则保留 FormItem 或业务传入的 ARIA 状态。 */
export function controlInvalid(invalid: boolean | undefined, attrs: Record<string, unknown>): AriaAttributes['aria-invalid'] {
  const value = attrs['aria-invalid']
  return invalid || (value === true || value === false || value === 'true' || value === 'false' || value === 'grammar' || value === 'spelling' ? value : undefined)
}

export function controlErrorAttrs(attrs: Record<string, unknown>) {
  return {
    ...(typeof attrs.form === 'string' ? { form: attrs.form } : {}),
    ...(typeof attrs.readonly === 'string' || typeof attrs.readonly === 'boolean'
      ? { readonly: attrs.readonly === true || typeof attrs.readonly === 'string' } : {}),
    'aria-describedby': typeof attrs['aria-describedby'] === 'string' ? attrs['aria-describedby'] : undefined,
    'aria-errormessage': typeof attrs['aria-errormessage'] === 'string' ? attrs['aria-errormessage'] : undefined,
    'aria-invalid': controlInvalid(undefined, attrs),
  }
}
