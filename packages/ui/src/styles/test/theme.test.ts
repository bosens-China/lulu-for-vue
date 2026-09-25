import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const stylesDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function readStyle(name: string) {
  return readFileSync(resolve(stylesDirectory, name), 'utf8')
}

describe('Lulu CSS theme', () => {
  it('加载遮罩在显式与系统深色模式使用主题变量', () => {
    expect(readStyle('feedback.css')).toContain('background: var(--lulu-color-loading-overlay)')
    expect(readStyle('tokens.css').match(/--lulu-color-loading-overlay: rgb\(9 9 11 \/ 80%\)/g)).toHaveLength(2)
  })
  it('publishes the Edge-compatible semantic token baseline', () => {
    const tokens = readStyle('tokens.css')

    expect(tokens).toContain('--lulu-color-primary: #2a80eb')
    expect(tokens).toContain('--lulu-control-height: 40px')
    expect(tokens).toContain('--lulu-transition-duration: 160ms')
    expect(tokens).toContain(':root:where(:not([data-lulu-theme]))')
    expect(tokens).not.toContain('--ui-blue')
  })

  it('aggregates styles for every component domain', () => {
    const index = readStyle('index.css')

    for (const style of ['tokens.css', 'base.css', 'action.css', 'feedback.css', 'form.css', 'navigation.css', 'overlay.css', 'data.css']) {
      expect(index).toContain(`@import './${style}'`)
    }
  })

  it('styles every public component domain without legacy Edge selectors', () => {
    const style = ['base.css', 'action.css', 'feedback.css', 'form.css', 'navigation.css', 'overlay.css', 'data.css']
      .map(readStyle)
      .join('\n')

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
