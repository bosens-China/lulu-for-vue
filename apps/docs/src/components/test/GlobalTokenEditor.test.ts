import { mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import GlobalTokenEditor from '../GlobalTokenEditor.vue'
import { resetTokenOverrides, tokenOverrides } from '../../tokenOverrides'

afterEach(() => { resetTokenOverrides(); vi.unstubAllGlobals() })

it('按组筛选并修改非颜色变量，提示非法值且可以恢复', async () => {
  vi.stubGlobal('CSS', { escape: CSS.escape, supports: (_property: string, value?: string) => value !== 'invalid-radius' })
  const wrapper = mount(GlobalTokenEditor)
  try {
    await wrapper.get('select').setValue('尺寸与间距')
    await wrapper.get('input[aria-label="筛选全局变量"]').setValue('圆角')
    expect(wrapper.findAll('label')).toHaveLength(3)
    const input = wrapper.get('#edit---lulu-radius')
    await input.setValue('12px')
    expect(tokenOverrides.value.light['--lulu-radius']).toBe('12px')
    await input.setValue('invalid-radius')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('[role="alert"]').text()).toContain('border-radius')
    expect(tokenOverrides.value.light['--lulu-radius']).toBe('12px')
    await wrapper.get('button[aria-label="恢复 --lulu-radius"]').trigger('click')
    expect(tokenOverrides.value.light['--lulu-radius']).toBeUndefined()
    expect(input.attributes('aria-invalid')).toBeUndefined()
  } finally { wrapper.unmount() }
})
