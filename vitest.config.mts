import { defineConfig } from 'vitest/config'
import Vue from 'unplugin-vue/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { createMarkdownOptions } from './apps/docs/build/markdownOptions.ts'
import { uiSourceAliases } from './apps/docs/build/uiSourceAliases.ts'
import { pageMetadataPlugin } from './apps/docs/build/pageMetadataPlugin.ts'

export default defineConfig({
  plugins: [
    pageMetadataPlugin(),
    Vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown(createMarkdownOptions()),
  ],
  resolve: { alias: uiSourceAliases },
  test: {
    environment: 'happy-dom',
    css: { include: /tokens\.css/ },
  },
})
