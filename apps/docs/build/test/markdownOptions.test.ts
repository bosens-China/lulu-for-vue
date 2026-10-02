import { describe, expect, it } from 'vitest'
import { createHeadingId, parseDemoId, renderCalloutOpen, toDemoFileName, wrapCodeBlock } from '../markdownOptions'

describe('Demo 容器映射', () => {
  it('把 kebab-case ID 映射为约定的 Vue Demo 文件', () => {
    expect(parseDemoId('demo disabled-state', 'README.md')).toBe('disabled-state')
    expect(toDemoFileName('disabled-state')).toBe('DisabledStateDemo.vue')
  })

  it('拒绝目录穿越和多余参数', () => {
    expect(() => parseDemoId('demo ../secret', 'README.md')).toThrow('kebab-case-id')
    expect(() => parseDemoId('demo basic extra', 'README.md')).toThrow('kebab-case-id')
  })

  it('为普通代码块添加统一的复制入口', () => {
    const html = wrapCodeBlock('<pre><code>const value = 1</code></pre>')

    expect(html).toContain('data-docs-copy')
    expect(html).toContain('<pre><code>const value = 1</code></pre>')
  })

  it('渲染带安全标题的 Callout', () => {
    expect(renderCalloutOpen('tip', 'tip 安装提示')).toContain('安装提示')
    expect(renderCalloutOpen('warning', 'warning <script>')).toContain('&lt;script&gt;')
    expect(renderCalloutOpen('details', 'details')).toContain('<summary>详情</summary>')
  })

  it('为中英文标题生成稳定且可去重的锚点', () => {
    expect(createHeadingId('位置与关闭策略')).toBe('位置与关闭策略')
    expect(createHeadingId('API Reference', 1)).toBe('api-reference-2')
  })
})
