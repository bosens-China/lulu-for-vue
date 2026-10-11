import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LuluMessageHost from '@lulu/vue/message-host'
import HomePage from '../HomePage.vue'

describe('首页交互预览', () => {
  it('反馈示例通过站点宿主展示真实消息', async () => {
    const wrapper = mount({
      components: { HomePage, LuluMessageHost },
      template: '<LuluMessageHost><HomePage /></LuluMessageHost>',
    })
    try {
      await wrapper.findAll('[role="tab"]')[1]!.trigger('click')
      await wrapper.findAll('button').find(button => button.text() === '弹出轻提示')!.trigger('click')
      expect(wrapper.get('[role="status"]').text()).toContain('消息提示触发成功')
    }
    finally {
      wrapper.unmount()
    }
  })
})
