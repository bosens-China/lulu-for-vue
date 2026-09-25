import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'
import { docsDevSsrPlugin } from './build/devSsrPlugin.ts'
import { createMarkdownOptions } from './build/markdownOptions.ts'
import { prerenderPlugin } from './build/prerenderPlugin.ts'
import { uiSourceAliases } from './build/uiSourceAliases.ts'

export default defineConfig(({ isSsrBuild }) => ({
  base: process.env.DOCS_BASE ?? '/',
  appType: 'custom',
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown(createMarkdownOptions()),
    UnoCSS({
      configFile: resolve(import.meta.dirname, 'uno.config.ts'),
    }),
    docsDevSsrPlugin(),
    ...(isSsrBuild ? [prerenderPlugin()] : []),
  ],
  resolve: { alias: uiSourceAliases },
}))
