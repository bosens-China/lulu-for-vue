import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { runInNewContext } from 'node:vm'
import { describe, expect, it, vi } from 'vitest'

const html = readFileSync(resolve(import.meta.dirname, '../../index.html'), 'utf8')
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? ''

describe('首屏主题初始化', () => {
  it.each(['dark', 'light', 'blocked'])('恢复 %s 偏好并在模块前禁用 Prism 自动扫描', (mode) => {
    const toggle = vi.fn()
    const root = { dataset: {} as Record<string, string>, classList: { toggle } }
    const browser: { Prism?: { manual: boolean } } = {}
    runInNewContext(script, {
      window: browser,
      document: { documentElement: root },
      localStorage: { getItem: () => {
        if (mode === 'blocked') throw new Error('blocked')
        return mode
      } },
      matchMedia: () => ({ matches: true }),
    })
    expect(browser.Prism?.manual).toBe(true)
    expect(toggle).toHaveBeenCalledWith('dark', mode !== 'light')
    expect(root.dataset.luluTheme).toBe(mode === 'blocked' ? undefined : mode)
  })
})
