import { readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const stylesDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function readStyle(name: string) {
  return readFileSync(resolve(stylesDirectory, name), 'utf8')
}

function readComponentStyles(): string {
  const directory = resolve(stylesDirectory, 'components')
  return readdirSync(directory)
    .filter(name => name.endsWith('.css'))
    .map(name => readFileSync(resolve(directory, name), 'utf8'))
    .join('\n')
}

function luminance(hex: string): number {
  const channels = hex.match(/[\da-f]{2}/gi)?.map(channel => Number.parseInt(channel, 16) / 255)
  if (!channels || channels.length !== 3) throw new TypeError(`无效颜色：${hex}`)
  const [red = 0, green = 0, blue = 0] = channels.map(channel => (
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  ))
  return red * 0.2126 + green * 0.7152 + blue * 0.0722
}

function contrast(foreground: string, background: string): number {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return ((values[0] ?? 0) + 0.05) / ((values[1] ?? 0) + 0.05)
}

function lightToken(tokens: string, name: string): string {
  const lightTheme = tokens.slice(0, tokens.indexOf("[data-lulu-theme='dark']"))
  const value = lightTheme.match(new RegExp(`--${name}:\\s*(#[\\da-f]{6})`, 'i'))?.[1]
  if (!value) throw new Error(`找不到浅色主题变量：--${name}`)
  return value
}

function customProperties(block: string): Record<string, string> {
  return Object.fromEntries(
    [...block.matchAll(/(--lulu-[\w-]+):\s*([^;]+);/g)]
      .map(([, name, value]) => [name, value?.trim() ?? '']),
  )
}

describe('Lulu CSS theme', () => {
  it('加载遮罩在显式与系统深色模式使用主题变量', () => {
    expect(readStyle('components/loading-overlay.css')).toContain('background: var(--lulu-color-loading-overlay)')
    expect(readStyle('tokens.css').match(/--lulu-color-loading-overlay: rgb\(9 9 11 \/ 80%\)/g)).toHaveLength(2)
  })
  it('publishes the Edge-compatible semantic token baseline', () => {
    const tokens = readStyle('tokens.css')

    expect(tokens).toContain('--lulu-color-primary: #1668c7')
    expect(tokens).toContain('--lulu-color-primary-solid: var(--lulu-color-primary)')
    expect(tokens).toContain('--lulu-control-height: 40px')
    expect(tokens).toContain('--lulu-transition-duration: 160ms')
    expect(tokens).toContain(':root:where(:not([data-lulu-theme]))')
    expect(tokens).not.toContain('--ui-blue')
    for (const unused of ['--lulu-color-primary-hover', '--lulu-color-disabled', '--lulu-shadow-sm', '--lulu-z-index-dialog']) {
      expect(tokens).not.toContain(unused)
    }
  })

  it('keeps normal text colors above the WCAG AA contrast threshold', () => {
    const tokens = readStyle('tokens.css')
    const surface = lightToken(tokens, 'lulu-color-surface')

    expect(contrast(lightToken(tokens, 'lulu-color-text-muted'), surface)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(lightToken(tokens, 'lulu-color-primary'), surface)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(lightToken(tokens, 'lulu-color-text-inverse'), lightToken(tokens, 'lulu-color-primary'))).toBeGreaterThanOrEqual(4.5)
    expect(contrast(lightToken(tokens, 'lulu-color-primary'), lightToken(tokens, 'lulu-color-surface-selected'))).toBeGreaterThanOrEqual(4.5)
    expect(contrast(lightToken(tokens, 'lulu-color-text-inverse'), lightToken(tokens, 'lulu-color-danger'))).toBeGreaterThanOrEqual(4.5)
  })

  it('keeps explicit and system dark theme tokens in sync', () => {
    const tokens = readStyle('tokens.css')
    const explicit = tokens.match(/\[data-lulu-theme='dark'\] \{([\s\S]*?)\n\}/)?.[1]
    const system = tokens.match(/:root:where\(:not\(\[data-lulu-theme\]\)\) \{([\s\S]*?)\n {2}\}/)?.[1]

    expect(explicit).toBeTruthy()
    expect(system).toBeTruthy()
    expect(customProperties(system ?? '')).toEqual(customProperties(explicit ?? ''))
  })

  it('aggregates styles for every component domain', () => {
    const index = readStyle('index.css')

    for (const style of ['tokens.css', 'base.css', 'action.css', 'feedback.css', 'form.css', 'navigation.css', 'overlay.css', 'data.css']) {
      expect(index).toContain(`@import './${style}'`)
    }
  })

  it('styles every public component without legacy Edge selectors', () => {
    const style = `${readStyle('base.css')}\n${readComponentStyles()}`

    for (const selector of [
      '.lulu-button',
      '.lulu-data-table',
      '.lulu-table',
      '.lulu-field-error',
      '.lulu-loading',
      '.lulu-loading-overlay',
      '.lulu-message',
      '.lulu-message-host',
      '.lulu-progress',
      '.lulu-autocomplete',
      '.lulu-checkbox',
      '.lulu-color-picker',
      '.lulu-date-picker',
      '.lulu-date-range-picker',
      '.lulu-form',
      '.lulu-form-field',
      '.lulu-hour-picker',
      '.lulu-input',
      '.lulu-radio',
      '.lulu-range-slider',
      '.lulu-rate',
      '.lulu-select',
      '.lulu-slider',
      '.lulu-switch',
      '.lulu-textarea',
      '.lulu-year-picker',
      '.lulu-accordion',
      '.lulu-disclosure',
      '.lulu-tab-panel',
      '.lulu-tab',
      '.lulu-tabs',
      '.lulu-dialog',
      '.lulu-dropdown',
      '.lulu-popconfirm',
      '.lulu-popover',
      '.lulu-tooltip',
      '.lulu-pagination',
    ]) {
      expect(style).toContain(selector)
    }

    expect(style).not.toMatch(/\.ui-[\w-]+|\[is=/)
  })
})
