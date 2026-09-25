import { describe, expect, it } from 'vitest'
import { parseDemoId, toDemoFileName } from '../markdownOptions'

describe('Demo 容器映射', () => {
  it('把 kebab-case ID 映射为约定的 Vue Demo 文件', () => {
    expect(parseDemoId('demo disabled-state', 'README.md')).toBe('disabled-state')
    expect(toDemoFileName('disabled-state')).toBe('DisabledStateDemo.vue')
  })

  it('拒绝目录穿越和多余参数', () => {
    expect(() => parseDemoId('demo ../secret', 'README.md')).toThrow('kebab-case-id')
    expect(() => parseDemoId('demo basic extra', 'README.md')).toThrow('kebab-case-id')
  })
})
