import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluSpace from '../LuluSpace.vue'

describe('LuluSpace', () => {
  it('使用默认横向间距并透传容器属性', () => {
    const wrapper = mount(LuluSpace, {
      attrs: { id: 'actions', class: 'custom-space' },
      slots: { default: '<button>取消</button><button>确定</button>' },
    })

    expect(wrapper.attributes()).toMatchObject({ id: 'actions', 'data-direction': 'horizontal', 'data-size': 'middle' })
    expect(wrapper.classes()).toContain('custom-space')
    expect(wrapper.findAll('button')).toHaveLength(2)
  })

  it('响应纵向、间距尺寸与横向换行设置', async () => {
    const wrapper = mount(LuluSpace, { props: { direction: 'vertical' as const, size: 'large' as const, wrap: true } })

    expect(wrapper.attributes()).toMatchObject({ 'data-direction': 'vertical', 'data-size': 'large', 'data-wrap': 'true' })

    await wrapper.setProps({ direction: 'horizontal', size: 'small', wrap: false })
    expect(wrapper.attributes()).toMatchObject({ 'data-direction': 'horizontal', 'data-size': 'small' })
    expect(wrapper.attributes('data-wrap')).toBeUndefined()
  })
})
