import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import LuluForm from '../LuluForm.vue'
import LuluFormItem from '../LuluFormItem.vue'
import ValidationDemo from '../form/demos/ValidationDemo.vue'

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
    await flushPromises()

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
    await flushPromises()

    expect(wrapper.get('[role="alert"]').text()).toBe('请使用 example.com 邮箱')
    expect(wrapper.find('[role="status"]').exists()).toBe(false)

    await input.setValue('name@example.com')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.get('[role="status"]').text()).toBe('校验通过，可以提交')
  })
})

describe('LuluFormItem', () => {
  it('provides label, control, and error associations through slot props', () => {
    const wrapper = mount({
      components: { LuluFormItem },
      template: `
        <LuluFormItem
          control-id="email"
          error="Email is required"
          label="Email"
          required
          v-slot="{ controlProps }"
        >
          <input v-bind="controlProps">
        </LuluFormItem>
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
