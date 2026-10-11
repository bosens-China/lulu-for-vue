import { defineConfig, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['src/**/*.{vue,ts,md}'],
  },
  presets: [
    presetWind3({ prefix: ['', 'lulu-u-'] }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  shortcuts: {
    'docs-card': 'rounded-xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-card)] shadow-xs transition-all',
    'docs-card-hover': 'hover:border-[var(--lulu-color-primary)]/40 hover:shadow-md transition-all duration-200',
    'docs-glass': 'backdrop-blur-md bg-[var(--docs-glass-bg)] border border-solid border-[var(--lulu-color-border-subtle)]',
  },
  theme: {
    colors: {
      luluPage: 'var(--docs-color-page)',
      luluContainer: 'var(--docs-color-container)',
      luluPrimary: 'var(--lulu-color-primary)',
      luluText: 'var(--lulu-color-text)',
      luluHeading: 'var(--docs-color-heading)',
      luluMuted: 'var(--lulu-color-text-muted)',
      luluBorder: 'var(--lulu-color-border-subtle)',
      luluBorderStrong: 'var(--lulu-color-border)',
      luluHover: 'var(--lulu-color-surface-hover)',
      luluActive: 'var(--lulu-color-surface-selected)',
      luluCode: 'var(--docs-color-code)',
    },
  },
})
