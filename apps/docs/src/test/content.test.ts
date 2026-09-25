import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'
import { createDocsRoutes } from '../content'
import type { MarkdownPageModule } from '../content'

const component = defineComponent({ template: '<p>Document</p>' })

function createModule(title: string, overrides: Partial<MarkdownPageModule> = {}): MarkdownPageModule {
  return {
    default: component,
    description: `${title} description`,
    title,
    ...overrides,
  }
}

describe('组件文档清单', () => {
  it('把中文 README 转换为组件路由并应用 SEO 覆盖', () => {
    const routes = createDocsRoutes({
      '/components/action/button/readme/README.md': createModule('Button 按钮', {
        seo: { title: 'SEO Button', keywords: ['Vue Button'] },
      }),
    })

    expect(routes.map((route) => route.path)).toEqual(['/components/button/'])
    expect(routes[0]?.title).toBe('SEO Button')
    expect(routes[0]?.seo.keywords).toEqual(['Vue Button'])
  })

  it('拒绝重复路由或字段类型错误的文档', () => {
    expect(() => createDocsRoutes({
      '/components/action/button/readme/README.md': createModule('Button 按钮'),
      '/components/other/button/readme/README.md': createModule('另一个 Button'),
    })).toThrow('存在重复的 README.md')

    expect(() => createDocsRoutes({
      '/components/action/button/readme/README.md': createModule('Button 按钮', { seo: { keywords: 'button' } }),
    })).toThrow('seo.keywords 必须是非空字符串数组')
  })

  it('只接受大写 README 文件名', () => {
    expect(() => createDocsRoutes({
      '/components/action/button/readme/readme.md': createModule('Button 按钮'),
    })).toThrow('无法从文档路径生成组件路由')
  })
})
