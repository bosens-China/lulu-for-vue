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
      luluPage: 'var(--lulu-color-bg-page)',
      luluContainer: 'var(--lulu-color-bg-container)',
      luluPrimary: 'var(--lulu-color-primary)',
      luluPrimaryHover: 'var(--lulu-color-primary-hover)',
      luluText: 'var(--lulu-color-text)',
      luluHeading: 'var(--lulu-color-text-heading)',
      luluMuted: 'var(--lulu-color-text-muted)',
      luluBorder: 'var(--lulu-color-border-subtle)',
      luluBorderStrong: 'var(--lulu-color-border)',
      luluHover: 'var(--lulu-color-surface-hover)',
      luluActive: 'var(--lulu-color-surface-selected)',
      luluCode: 'var(--lulu-color-code-bg)',
    },
  },
})
