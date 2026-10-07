import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SiteSidebar from '../SiteSidebar.vue'

describe('SiteSidebar 侧边栏按章节展示测试', () => {
  it('在指南路由下只渲染开发指南导航', () => {
    const wrapper = mount(SiteSidebar, {
      props: { currentPath: '/guide/installation/' },
    })

    // 标题展示为开发指南
    expect(wrapper.text()).toContain('开发指南')
    expect(wrapper.text()).toContain('安装')
    expect(wrapper.text()).toContain('快速开始')
    expect(wrapper.text()).toContain('主题定制')
    expect(wrapper.text()).toContain('按需引入')

    // 不包含组件列表的通用分类或 Button
    expect(wrapper.text()).not.toContain('UI 组件列表')
    expect(wrapper.text()).not.toContain('Button 按钮')
  })

  it('在组件路由下只渲染UI组件列表导航', () => {
    const wrapper = mount(SiteSidebar, {
      props: { currentPath: '/components/button/' },
    })

    // 标题展示为 UI 组件列表
    expect(wrapper.text()).toContain('UI 组件列表')
    expect(wrapper.text()).toContain('Button 按钮')
    expect(wrapper.text()).toContain('通用')

    // 不包含开发指南分类
    expect(wrapper.text()).not.toContain('开发指南')
  })

  it('侧边栏没有展开收起按钮', () => {
    const wrapper = mount(SiteSidebar, {
      props: { currentPath: '/components/button/' },
    })

    // 验证不包含展开收起图标或按钮
    expect(wrapper.find('.i-lucide-panel-left-close').exists()).toBe(false)
    expect(wrapper.find('.i-lucide-panel-left-open').exists()).toBe(false)
    expect(wrapper.find('.docs-sider-toggle').exists()).toBe(false)
  })
})
