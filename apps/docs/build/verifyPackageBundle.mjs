import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'
import { resolve } from 'node:path'
import { build } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { LuluApiResolver, LuluResolver } from '@lulu/vue/resolver'

const root = resolve(import.meta.dirname, '..')

// 使用实际发布入口构建消费产物，避免只检查包内文件引用。
async function bundle(entry) {
  const isResolverFixture = entry === 'resolver'
  const result = await build({
    configFile: false,
    root,
    logLevel: 'error',
    plugins: isResolverFixture ? [
      Vue(),
      Components({ resolvers: [LuluResolver()] }),
      AutoImport({ resolvers: [LuluApiResolver()] }),
    ] : [],
    build: {
      cssCodeSplit: true,
      lib: {
        entry: resolve(root, `build/fixtures/${isResolverFixture ? 'ResolverConsumer.vue' : `${entry}.js`}`),
        formats: ['es'],
      },
      minify: false,
      write: false,
      rolldownOptions: { external: ['vue'] },
    },
  })
  const outputs = (Array.isArray(result) ? result : [result]).flatMap((item) => item.output)
  return {
    js: outputs.filter((item) => item.type === 'chunk').map((item) => item.code).join('\n'),
    css: outputs.filter((item) => item.type === 'asset' && item.fileName.endsWith('.css'))
      .map((item) => Buffer.from(item.source).toString()).join('\n'),
  }
}

const button = await bundle('button')
assert.match(button.css, /\.lulu-button\s*\{/)
assert.match(button.css, /\.lulu-u-inline-flex\s*\{/)
assert.doesNotMatch(button.css, /\.lulu-popover\s*\{/)
assert.doesNotMatch(button.js, /LuluPopover|LuluDialog/)

for (const entry of ['root', 'button-input']) {
  const { js, css } = await bundle(entry)
  assert.match(js, /LuluButton/)
  assert.match(js, /LuluInput/)
  assert.doesNotMatch(js, /__name:\s*"LuluPopover"/)
  assert.doesNotMatch(css, /\.lulu-popover__panel\s*\{/)
  assert.equal((css.match(/--lulu-color-primary:\s*#2a80eb/g) ?? []).length, 1)
}

const combined = await bundle('combined')
assert.equal((combined.css.match(/--lulu-color-primary:\s*#2a80eb/g) ?? []).length, 1,
  '多个组件不能重复打包公共 token。')
assert.equal((combined.js.match(/__name:\s*"LuluPopover"/g) ?? []).length, 1,
  'Popconfirm 和 Popover 必须共享一份组件实现。')

const resolver = await bundle('resolver')
assert.match(resolver.js, /LuluButton/)
assert.match(resolver.js, /useMessage/)
assert.match(resolver.css, /\.lulu-button\s*\{/)
assert.match(resolver.css, /\.lulu-u-inline-flex\s*\{/)

console.info('单组件、组合组件与自动导入的消费打包验证通过。')
