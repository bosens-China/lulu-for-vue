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
