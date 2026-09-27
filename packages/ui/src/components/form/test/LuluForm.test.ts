import { mount } from '@vue/test-utils'
import { shallowRef } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import LuluForm from '../LuluForm.vue'
import LuluFormField from '../LuluFormField.vue'
import ValidationDemo from '../form/demos/ValidationDemo.vue'
import {
  useFormValidation,
  type FormValidationRules,
} from '../useFormValidation'

describe('LuluForm', () => {
  it('keeps native form semantics and forwards submit events', async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault())
    const wrapper = mount(LuluForm, {
      attrs: {
        action: '/signup',
        method: 'post',
        onSubmit,
      },
      slots: {
        default: '<button type="submit">Submit</button>',
      },
    })

    await wrapper.get('form').trigger('submit')

    expect(wrapper.get('form').attributes('action')).toBe('/signup')
    expect(wrapper.get('form').attributes('method')).toBe('post')
    expect(onSubmit).toHaveBeenCalledOnce()
    expect(onSubmit.mock.calls[0]?.[0]).toBeInstanceOf(Event)
    expect(wrapper.vm.element).toBe(wrapper.get('form').element)
  })
})

describe('表单校验示例', () => {
  it('展示业务错误，并在修正输入后允许提交', async () => {
    const wrapper = mount(ValidationDemo)
    const input = wrapper.get('input')

    await input.setValue('name@other.com')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.get('[role="alert"]').text()).toBe('请使用 example.com 邮箱')
    expect(wrapper.find('[role="status"]').exists()).toBe(false)

    await input.setValue('name@example.com')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.get('[role="status"]').text()).toBe('校验通过，可以提交')
  })
})

describe('LuluFormField', () => {
  it('provides label, control, and error associations through slot props', () => {
    const wrapper = mount({
      components: { LuluFormField },
      template: `
        <LuluFormField
          control-id="email"
          error="Email is required"
          label="Email"
          required
          v-slot="{ controlProps }"
        >
          <input v-bind="controlProps">
        </LuluFormField>
      `,
    })

    const input = wrapper.get('input')

    expect(wrapper.get('label').attributes('for')).toBe('email')
    expect(input.attributes('id')).toBe('email')
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('aria-describedby')).toBe('email-error')
    expect(input.attributes('aria-errormessage')).toBe('email-error')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('[role="alert"]').attributes('id')).toBe('email-error')
  })
})

describe('useFormValidation', () => {
  it('returns native and custom errors, then resets both the form and errors', () => {
    const form = document.createElement('form')
    const email = document.createElement('input')
    const rules = shallowRef<FormValidationRules>({
      email: (value) => value === 'used@example.com' ? 'This email is already in use' : undefined,
    })

    email.defaultValue = 'default@example.com'
    email.value = ''
    email.name = 'email'
    email.required = true
    form.append(email)

    const { errors, reset, validate } = useFormValidation(shallowRef(form), { rules })

    expect(validate()).toBe(false)
    expect(errors.value.email).toBeTruthy()

    email.value = 'used@example.com'

    expect(validate()).toBe(false)
    expect(errors.value).toEqual({ email: 'This email is already in use' })

    email.value = 'valid@example.com'

    expect(validate()).toBe(true)
    expect(errors.value).toEqual({})

    email.value = 'used@example.com'
    validate()
    reset()

    expect(email.value).toBe('default@example.com')
    expect(errors.value).toEqual({})
  })

  it('skips non-validatable controls and validates choice groups once', () => {
    const form = document.createElement('form')
    const firstRadio = document.createElement('input')
    const secondRadio = document.createElement('input')
    const firstCheckbox = document.createElement('input')
    const secondCheckbox = document.createElement('input')
    const hidden = document.createElement('input')
    const disabled = document.createElement('input')
    const radioRule = vi.fn((value: string) => value ? undefined : '请选择角色')
    const checkboxRule = vi.fn((value: string) => value ? undefined : '请选择通知方式')
    const hiddenRule = vi.fn(() => '不应校验隐藏控件')
    const disabledRule = vi.fn(() => '不应校验禁用控件')

    for (const [control, type, name, value] of [
      [firstRadio, 'radio', 'role', 'reader'],
      [secondRadio, 'radio', 'role', 'editor'],
      [firstCheckbox, 'checkbox', 'channel', 'email'],
      [secondCheckbox, 'checkbox', 'channel', 'sms'],
      [hidden, 'hidden', 'hidden', 'secret'],
    ] as const) {
      control.type = type
      control.name = name
      control.value = value
    }
    disabled.name = 'disabled'
    disabled.disabled = true
    form.append(firstRadio, secondRadio, firstCheckbox, secondCheckbox, hidden, disabled)

    const { errors, validate } = useFormValidation(form, {
      rules: {
        channel: checkboxRule,
        disabled: disabledRule,
        hidden: hiddenRule,
        role: radioRule,
      },
    })

    expect(validate()).toBe(false)
    expect(errors.value).toEqual({
      channel: '请选择通知方式',
      role: '请选择角色',
    })
    expect(radioRule).toHaveBeenCalledOnce()
    expect(checkboxRule).toHaveBeenCalledOnce()
    expect(hiddenRule).not.toHaveBeenCalled()
    expect(disabledRule).not.toHaveBeenCalled()

    secondRadio.checked = true
    secondCheckbox.checked = true

    expect(validate()).toBe(true)
    expect(errors.value).toEqual({})
    expect(radioRule).toHaveBeenLastCalledWith('editor', secondRadio)
    expect(checkboxRule).toHaveBeenLastCalledWith('sms', secondCheckbox)
  })
})
