import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluAutocomplete from '../LuluAutocomplete.vue'
import LuluCheckbox from '../LuluCheckbox.vue'
import LuluColorPicker from '../LuluColorPicker.vue'
import LuluDatePicker from '../LuluDatePicker.vue'
import LuluDateRangePicker from '../LuluDateRangePicker.vue'
import LuluFormItem from '../LuluFormItem.vue'
import LuluInput from '../LuluInput.vue'
import LuluRadio from '../LuluRadio.vue'
import LuluRangeSlider from '../LuluRangeSlider.vue'
import LuluRate from '../LuluRate.vue'
import LuluSelect from '../LuluSelect.vue'
import LuluSlider from '../LuluSlider.vue'
import LuluSwitch from '../LuluSwitch.vue'
import LuluTextarea from '../LuluTextarea.vue'
import LuluTimePicker from '../LuluTimePicker.vue'
import LuluTimeRangePicker from '../LuluTimeRangePicker.vue'

describe('FormItem 与库内控件', () => {
  it.each([
    ['LuluInput', ''],
    ['LuluTextarea', ''],
    ['LuluSelect', ''],
    ['LuluAutocomplete', ''],
    ['LuluCheckbox', false],
    ['LuluRadio', 'a'],
    ['LuluSwitch', false],
    ['LuluColorPicker', '#112233'],
    ['LuluDatePicker', ''],
    ['LuluDateRangePicker', ['', '']],
    ['LuluSlider', 20],
    ['LuluRangeSlider', [20, 80]],
    ['LuluRate', 3],
  ])('%s 保留标签和错误关联，动态清除错误', async (control, modelValue) => {
    const wrapper = mount({
      components: {
        LuluFormItem, LuluInput, LuluTextarea, LuluSelect, LuluAutocomplete,
        LuluCheckbox, LuluRadio, LuluSwitch, LuluColorPicker, LuluDatePicker,
        LuluDateRangePicker, LuluSlider, LuluRangeSlider, LuluRate,
      },
      data: () => ({ control, modelValue, error: '请检查此项' }),
      template: `
        <LuluFormItem control-id="field" label="字段" :error="error" v-slot="{ controlProps }">
          <component :is="control" v-bind="controlProps" v-model="modelValue" value="a" />
        </LuluFormItem>
      `,
    })
    const inputs = wrapper.findAll('input:not([type="hidden"]), select, textarea')

    expect(inputs[0]?.attributes('id')).toBe('field')
    expect(wrapper.get('label[for="field"]').attributes('for')).toBe('field')
    for (const input of inputs) {
      expect(input.attributes('aria-invalid')).toBe('true')
      expect(input.attributes('aria-describedby')).toBe('field-error')
      expect(input.attributes('aria-errormessage')).toBe('field-error')
    }

    await wrapper.setData({ error: '' })
    for (const input of inputs) {
      expect(input.attributes('aria-invalid')).toBeUndefined()
      expect(input.attributes('aria-describedby')).toBeUndefined()
      expect(input.attributes('aria-errormessage')).toBeUndefined()
    }
    wrapper.unmount()
  })
})

describe('FormItem 自动连接库内控件', () => {
  it('同一字段的多个 Radio 共用 name 和错误关联，控件ID保持唯一', async () => {
    const wrapper = mount({
      components: { LuluFormItem, LuluRadio },
      data: () => ({ role: 'reader', showFirst: true }),
      template: `<LuluFormItem control-id="role-field" name="role" label="角色" error="请选择角色">
        <LuluRadio v-if="showFirst" v-model="role" value="reader">读者</LuluRadio>
        <LuluRadio v-model="role" value="editor">编辑者</LuluRadio>
      </LuluFormItem>`,
    })
    const inputs = wrapper.findAll('input')
    expect(inputs.map(input => input.attributes('id'))).toEqual(['role-field', 'role-field-control-2'])
    for (const input of inputs) {
      expect(input.attributes('name')).toBe('role')
      expect(input.attributes('aria-errormessage')).toBe('role-field-error')
    }
    await inputs[1]!.setValue(true)
    expect((inputs[1]!.element as HTMLInputElement).checked).toBe(true)
    expect((inputs[0]!.element as HTMLInputElement).checked).toBe(false)
    await wrapper.setData({ showFirst: false })
    expect(wrapper.get('input').attributes('id')).toBe('role-field')
    expect(wrapper.get('label').attributes('for')).toBe('role-field')
    wrapper.unmount()
  })

  it.each([
    ['LuluInput', ''], ['LuluTextarea', ''], ['LuluSelect', ''], ['LuluAutocomplete', ''],
    ['LuluCheckbox', false], ['LuluRadio', 'a'], ['LuluSwitch', false],
    ['LuluColorPicker', '#112233'], ['LuluDatePicker', ''], ['LuluDateRangePicker', ['', '']],
    ['LuluSlider', 20], ['LuluRangeSlider', [20, 80]], ['LuluRate', 3],
    ['LuluTimePicker', ''], ['LuluTimeRangePicker', ['', '']],
  ])('%s 不绑定 controlProps 也关联标签、帮助和错误', async (control, modelValue) => {
    const wrapper = mount({
      components: {
        LuluFormItem, LuluInput, LuluTextarea, LuluSelect, LuluAutocomplete,
        LuluCheckbox, LuluRadio, LuluSwitch, LuluColorPicker, LuluDatePicker,
        LuluDateRangePicker, LuluSlider, LuluRangeSlider, LuluRate,
        LuluTimePicker, LuluTimeRangePicker,
      },
      data: () => ({ control, modelValue, error: '请检查此项' }),
      template: `<LuluFormItem control-id="auto-field" name="field" label="字段" help="帮助" :error="error">
        <component :is="control" v-model="modelValue" value="a" />
      </LuluFormItem>`,
    })
    const inputs = wrapper.findAll('input:not([type="hidden"]), select, textarea')
    expect(inputs[0]?.attributes('id')).toBe('auto-field')
    expect(wrapper.get('label').attributes('for')).toBe('auto-field')
    expect(wrapper.findAll('#auto-field')).toHaveLength(1)
    for (const input of inputs) {
      expect(input.attributes('aria-invalid')).toBe('true')
      expect(input.attributes('aria-describedby')).toBe('auto-field-help auto-field-error')
      expect(input.attributes('aria-errormessage')).toBe('auto-field-error')
    }
    await wrapper.setData({ error: '' })
    for (const input of inputs) {
      expect(input.attributes('aria-invalid')).toBeUndefined()
      expect(input.attributes('aria-describedby')).toBe('auto-field-help')
      expect(input.attributes('aria-errormessage')).toBeUndefined()
    }
    wrapper.unmount()
  })
})
