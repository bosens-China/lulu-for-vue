import { describe, expect, it } from 'vitest'
import { collectStyleTokens, getComponentStyleTokens } from '../componentStyleTokens'

describe('组件样式 token 依赖', () => {
  it('包含共享选择器与嵌套回退，排除无关组件和注释', () => {
    const tokens = collectStyleTokens(`
      /* .lulu-input { color: var(--lulu-unused); } */
      :is(.lulu-input, .lulu-select) { color: var(--lulu-control-color, var(--lulu-color-text)); }
      @media (prefers-reduced-motion: reduce) { .lulu-input { transition-duration: var(--lulu-transition-duration); } }
      .lulu-button { background: var(--lulu-button-background); }
    `, new Set(['lulu-input']))

    expect([...tokens.keys()]).toEqual(['--lulu-control-color', '--lulu-color-text', '--lulu-transition-duration'])
    expect(tokens.get('--lulu-control-color')).toEqual(['var(--lulu-color-text)'])
  })

  it('覆盖基础控件家族、组合依赖和无直接导入的 Tabs 子组件', () => {
    expect(getComponentStyleTokens('input').has('--lulu-control-background')).toBe(true)
    expect(getComponentStyleTokens('table').has('--lulu-table-header-background')).toBe(true)
    expect(getComponentStyleTokens('popconfirm').has('--lulu-floating-background')).toBe(true)
    expect(getComponentStyleTokens('tabs').has('--lulu-color-primary')).toBe(true)
  })
})
