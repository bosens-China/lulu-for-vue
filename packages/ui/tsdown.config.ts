import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

const stylesRoot = 'src/entries/styles'

function createStyleConfig(entry: string, fileName: string) {
  return {
    clean: false,
    css: {
      fileName,
      splitting: false,
    },
    dts: false,
    entry,
    format: ['esm'] as const,
    outDir: 'dist/styles',
    platform: 'neutral' as const,
    root: stylesRoot,
    target: false,
  }
}

export default defineConfig([
  {
    entry: [
      { index: 'src/index.ts' },
      { resolver: 'src/resolver.ts' },
      { 'entries/*': 'src/entries/*.ts' },
    ],
    format: ['esm'],
    platform: 'neutral',
    root: 'src',
    target: false,
    unbundle: true,
    plugins: [Vue({ isProduction: true })],
    dts: { vue: true },
  },
  createStyleConfig(`${stylesRoot}/all.ts`, 'style.css'),
  createStyleConfig(`${stylesRoot}/base.ts`, 'base.css'),
  createStyleConfig(`${stylesRoot}/tokens.ts`, 'tokens.css'),
  createStyleConfig(`${stylesRoot}/action.ts`, 'action.css'),
  createStyleConfig(`${stylesRoot}/data.ts`, 'data.css'),
  createStyleConfig(`${stylesRoot}/feedback.ts`, 'feedback.css'),
  createStyleConfig(`${stylesRoot}/form.ts`, 'form.css'),
  createStyleConfig(`${stylesRoot}/navigation.ts`, 'navigation.css'),
  createStyleConfig(`${stylesRoot}/overlay.ts`, 'overlay.css'),
])
