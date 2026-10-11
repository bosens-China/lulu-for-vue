import { describe, expect, it } from 'vitest'
import { controlErrorAttrs, controlInvalid, nativeControlAttrs } from '../control-attrs'

describe('复合表单控件属性', () => {
  it('只分离布局属性，保留原生属性和事件', () => {
    const listener = () => undefined
    expect(nativeControlAttrs({ class: 'field', style: '--lulu-color-primary: red', id: 'email', onBlur: listener }))
      .toEqual({ id: 'email', onBlur: listener })
  })

  it('保留有效 ARIA 状态，显式错误优先并忽略无效属性类型', () => {
    expect(controlInvalid(false, { 'aria-invalid': 'spelling' })).toBe('spelling')
    expect(controlInvalid(true, { 'aria-invalid': false })).toBe(true)
    expect(controlInvalid(false, { 'aria-invalid': 1 })).toBeUndefined()
    expect(controlErrorAttrs({ 'aria-describedby': 'help', 'aria-errormessage': 2, 'aria-invalid': 'true' }))
      .toEqual({ 'aria-describedby': 'help', 'aria-errormessage': undefined, 'aria-invalid': 'true' })
  })
})
