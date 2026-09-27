import { readdirSync } from 'node:fs'
import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

const stylesRoot = 'src/entries/styles'
const componentStylesRoot = 'src/styles/components'

function createStyleConfig(entry: string, fileName: string, root = stylesRoot) {
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
    root,
    target: false,
  }
}

const componentStyleConfigs = readdirSync(componentStylesRoot)
  .filter((fileName) => fileName.endsWith('.css'))
  .sort()
  .map((fileName) => createStyleConfig(
    `${componentStylesRoot}/${fileName}`,
    `components/${fileName}`,
    componentStylesRoot,
  ))

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
  ...componentStyleConfigs,
])
