import { describe, expect, it } from 'vitest'
import { docsRoutes, guideRoutes, resolvePage } from '../routes'

describe('文档路由', () => {
  it('解析中文组件页面并规范化尾斜杠', () => {
    expect(resolvePage('/components/button').title).toBe('Vue Button 按钮组件 - LuLu UI Vue')
    expect(resolvePage('/').statusCode).toBe(200)
    expect(resolvePage('/').heading).toBe('LuLu UI Vue')
    expect(resolvePage('/').path).toBe('/')
    expect(docsRoutes).toHaveLength(37)
    expect(docsRoutes.map((route) => route.path)).toContain('/components/button/')
    expect(guideRoutes).toHaveLength(4)
    expect(resolvePage('/guide/quick-start').heading).toBe('快速开始')
  })

  it('为未知页面提供中文 404 内容', () => {
    expect(resolvePage('/missing').statusCode).toBe(404)
    expect(resolvePage('/missing').heading).toBe('页面不存在')
  })
})
