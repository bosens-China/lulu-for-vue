import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [presetWind3({ prefix: 'lulu-u-', preflight: false })],
})
