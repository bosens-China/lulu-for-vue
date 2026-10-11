import source from '@lulu/vue/tokens.css?raw'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { globalThemeTokens, themeTokenDefaults, validTokenValue } from '../themeTokens'
import { editorDefaults, overrideCss, resetTokenOverrides, setTokenOverride, tokenOverrides } from '../tokenOverrides'

const primary = globalThemeTokens.find(token => token.name === '--lulu-color-primary')!
const radius = globalThemeTokens.find(token => token.name === '--lulu-radius')!

afterEach(() => { resetTokenOverrides(); vi.unstubAllGlobals() })

describe('全局 Token 清单与预览', () => {
  it('完整覆盖根主题变量和两个可选语义变量，默认值直接来自主题源码', () => {
    const rootNames = [...source.slice(0, source.indexOf('}')).matchAll(/(--lulu-[\w-]+)\s*:/g)].map(match => match[1])
    expect(globalThemeTokens.map(token => token.name).sort()).toEqual([...rootNames, '--lulu-color-primary-solid', '--lulu-shadow-focus'].sort())
    expect(globalThemeTokens.every(token => token.description !== token.name.slice(7))).toBe(true)
    expect(primary.light).toBe('#1668c7')
    expect(primary.dark).toBe('#38bdf8')
    expect(radius.light).toBe(radius.dark)
    expect(themeTokenDefaults(source.replaceAll("'dark'", '"dark"')).dark[primary.name]).toBe('#38bdf8')
  })

  it('拒绝错误值与 CSS 注入，保留上一次有效预览', () => {
    // Happy DOM 不解析 CSS 值；真实浏览器另行验证有效性。
    const supports = vi.fn((_property: string, value?: string) => !['definitely-not-a-color', '-8px'].includes(String(value)))
    vi.stubGlobal('CSS', { escape: CSS.escape, supports })
    expect(setTokenOverride('light', primary, '#ff0000')).toBe(true)
    expect(validTokenValue(primary, 'definitely-not-a-color')).toBe(false)
    expect(setTokenOverride('light', primary, 'red; } body { display:none')).toBe(false)
    expect(tokenOverrides.value.light[primary.name]).toBe('#ff0000')
    expect(document.getElementById('docs-token-overrides')?.textContent).toContain('#ff0000')
    expect(setTokenOverride('light', radius, '-8px')).toBe(false)
    expect(supports).toHaveBeenCalledWith('border-radius', '-8px')
  })

  it('明暗覆盖互不串色，导出包含系统深色；清空单项与全部时恢复继承', () => {
    setTokenOverride('light', primary, '#ff0000')
    setTokenOverride('dark', primary, '#00ff00')
    const css = overrideCss()
    expect(css).toContain(":root, [data-lulu-theme='light'] {\n  --lulu-color-primary: #ff0000;")
    expect(css).toContain("[data-lulu-theme='dark'] {\n  --lulu-color-primary: #00ff00;")
    expect(css).toContain('prefers-color-scheme: dark')
    // 预览的系统深色选择器必须与浅色规则同等优先级。
    expect(overrideCss(true)).toContain(":root:not([data-lulu-theme]) {\n  --lulu-color-primary: #00ff00;")
    expect(setTokenOverride('light', primary, '')).toBe(true)
    expect(tokenOverrides.value.light[primary.name]).toBeUndefined()
    expect(tokenOverrides.value.dark[primary.name]).toBe('#00ff00')
    expect(editorDefaults('dark')[primary.name]).toBe('#38bdf8')
    resetTokenOverrides()
    expect(overrideCss()).toBe('')
    expect(document.getElementById('docs-token-overrides')).toBeNull()
  })
})
