import { ref } from 'vue'
import { globalThemeTokens, validTokenValue } from './themeTokens'
import type { ThemeToken } from './themeTokens'

export type TokenMode = 'light' | 'dark'
export const tokenOverrides = ref<Record<TokenMode, Record<string, string>>>({ light: {}, dark: {} })

export function overrideCss(preview = false): string {
  const block = (mode: TokenMode, selector: string) => {
    const lines = Object.entries(tokenOverrides.value[mode]).map(([name, value]) => `  ${name}: ${value};`)
    return lines.length ? `${selector} {\n${lines.join('\n')}\n}` : ''
  }
  const light = block('light', preview ? ":root:not([data-lulu-theme='dark'])" : ":root, [data-lulu-theme='light']")
  const dark = block('dark', preview ? ":root[data-lulu-theme='dark']" : "[data-lulu-theme='dark']")
  const system = block('dark', preview ? ":root:not([data-lulu-theme])" : ":root:where(:not([data-lulu-theme]))")
  return [light, dark, system && `@media (prefers-color-scheme: dark) {\n${system}\n}`].filter(Boolean).join('\n\n')
}

function applyOverrides() {
  let style = document.getElementById('docs-token-overrides')
  if (!style) {
    style = document.createElement('style')
    style.id = 'docs-token-overrides'
    document.head.append(style)
  }
  style.textContent = overrideCss(true)
}

export function setTokenOverride(mode: TokenMode, token: ThemeToken, raw: string): boolean {
  const value = raw.trim()
  if (value && !validTokenValue(token, value)) return false
  if (value) tokenOverrides.value[mode][token.name] = value
  else delete tokenOverrides.value[mode][token.name]
  applyOverrides()
  return true
}

export function resetTokenOverrides() {
  tokenOverrides.value = { light: {}, dark: {} }
  document.getElementById('docs-token-overrides')?.remove()
}

// 编辑区使用默认变量，避免把控件高度或文字颜色改坏后无法撤销。
export function editorDefaults(mode: TokenMode): Record<string, string> {
  return Object.fromEntries(globalThemeTokens.map(token => [token.name, token.optional ? 'initial' : token[mode]]))
}
