import { describe, expect, it } from 'vitest'
import {
  createDocsNavigation,
  docsNavigation,
  orderedDocsNavigationItems,
} from '../navigation'
import type { DocsNavigationGroupConfig, DocsPage } from '../types'

function createPage(component: string): DocsPage {
  return {
    component: null,
    description: `${component} description`,
    heading: component,
    path: `/components/${component}/`,
    seo: { description: null, image: null, keywords: [], title: null },
    statusCode: 200,
    title: component,
  }
}

describe('文档导航配置', () => {
  it('按配置生成分组、显示名称和稳定顺序', () => {
    expect(docsNavigation.map(group => group.name)).toEqual([
      '通用',
      '表单与输入',
      '数据展示',
      '导航',
      '反馈与浮层',
    ])
    expect(orderedDocsNavigationItems).toHaveLength(37)
    expect(orderedDocsNavigationItems.slice(0, 3).map(item => item.name)).toEqual([
      'Button 按钮',
      'Input 输入框',
      'Textarea 文本域',
    ])
  })

  it('拒绝未知、重复和遗漏的组件配置', () => {
    const routes = [createPage('button'), createPage('input')]
    const validItem = { component: 'button', name: 'Button 按钮' }

    const cases: Array<{
      config: readonly DocsNavigationGroupConfig[]
      message: string
    }> = [
      {
        config: [{ name: '通用', items: [validItem, { component: 'missing', name: '未知' }] }],
        message: '未扫描到的组件“missing”',
      },
      {
        config: [{ name: '通用', items: [validItem, validItem] }],
        message: '组件“button”配置重复',
      },
      {
        config: [{ name: '通用', items: [validItem] }],
        message: '遗漏了已扫描的组件页面：/components/input/',
      },
    ]

    for (const testCase of cases) {
      expect(() => createDocsNavigation(routes, testCase.config)).toThrow(testCase.message)
    }
  })
})
