import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packageJson = JSON.parse(readFileSync(resolve(packageDirectory, 'package.json'), 'utf8'))
const exportsMap = packageJson.exports

assert.deepEqual(exportsMap['./*'], {
  import: './dist/entries/*.js',
  types: './dist/entries/*.d.ts',
}, '组件通配符必须只指向公开入口目录。')
assert.equal(exportsMap['./components/*'], undefined, '内部构建模块不能作为公共 API 导出。')

for (const [subpath, exportTarget] of Object.entries(exportsMap)) {
  if (subpath.includes('*')) continue

  if (typeof exportTarget === 'string') {
    assertOutputExists(subpath, exportTarget)
    continue
  }

  assertOutputExists(`${subpath} 的 import`, exportTarget.import)
  assertOutputExists(`${subpath} 的 types`, exportTarget.types)
}

const root = await import('@lulu/vue')
const button = await import('@lulu/vue/button')
const space = await import('@lulu/vue/space')
const message = await import('@lulu/vue/use-message')
const dialog = await import('@lulu/vue/use-dialog')
const dialogHost = await import('@lulu/vue/dialog-host')
const resolver = await import('@lulu/vue/resolver')

assert.equal(root.LuluButton, button.default, '根入口和单组件入口必须指向同一个构建模块。')
assert.equal(root.LuluSpace, space.default, 'Space 根入口和单组件入口必须指向同一个构建模块。')
assert.equal(typeof message.useMessage, 'function', 'Composable 子路径必须保留具名导出。')
assert.equal(root.useDialog, dialog.useDialog, '弹窗 composable 入口必须一致。')
assert.equal(root.LuluDialogHost, dialogHost.default, '弹窗宿主入口必须一致。')
assert.equal(resolver.LuluApiResolver()('useDialog')?.from, '@lulu/vue/use-dialog')
assert.equal(typeof resolver.LuluResolver, 'function', '自动导入 resolver 必须是公开入口。')
for (const subpath of Object.keys(exportsMap).filter((path) => path !== './style.css' && path.endsWith('/style.css'))) {
  const entry = subpath.slice(2, -'/style.css'.length)
  const componentName = `Lulu${entry.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('')}`
  const result = resolver.LuluResolver()(componentName)
  assert.equal(result?.from, `@lulu/vue/${entry}`, `${componentName} 必须可由 resolver 按需引入。`)
  assert.equal(result.name, 'default', `${componentName} 子路径必须按默认导出导入。`)
  assert.equal(result.as, componentName, `${componentName} 必须保留模板中的组件名。`)
  assert.ok(result.sideEffects.includes(`@lulu/vue/${entry}/style.css`), `${componentName} 必须导入对应样式。`)
}

await assert.rejects(
  () => import('@lulu/vue/components/action/LuluButton'),
  '内部构建模块不能被使用者解析。',
)

const popconfirmSource = readFileSync(resolve(packageDirectory, 'dist/components/overlay/LuluPopconfirm.js'), 'utf8')
assert.match(popconfirmSource, /from "\.\/LuluPopover\.js"/, '组合组件必须引用构建后的直接依赖。')

const baseStyle = readFileSync(resolve(packageDirectory, 'dist/styles/base.css'), 'utf8')
assert.match(baseStyle, /--lulu-color-primary/, '共享基础样式必须包含 token。')
assert.match(baseStyle, /\.lulu-u-inline-flex/, '基础样式必须包含预生成的带前缀 UnoCSS utility。')
assert.match(baseStyle, /\.lulu-field-error\s*\{/, '共享基础样式必须包含组合表单字段需要的错误样式。')
assert.match(baseStyle, /\.lulu-space\s*\{/, 'Space 的按需样式必须包含容器规则。')
assert.match(baseStyle, /\[data-lulu-theme=["']dark["']\]/, '共享基础样式必须支持显式暗色主题。')
assert.match(baseStyle, /prefers-color-scheme:\s*dark/, '共享基础样式必须支持系统暗色偏好。')
assert.doesNotMatch(baseStyle, /(?:^|\})\s*\.dark\s*\{/m, '主题选择器不能占用使用方的通用 dark 类名。')
const buttonStyle = readFileSync(resolve(packageDirectory, 'dist/styles/action.css'), 'utf8')
assert.match(buttonStyle, /\.lulu-button/, '按需样式必须包含组件选择器。')
for (const domain of ['action', 'data', 'feedback', 'form', 'navigation', 'overlay']) {
  const style = readFileSync(resolve(packageDirectory, `dist/styles/${domain}.css`), 'utf8')
  assert.doesNotMatch(style, /--lulu-color-primary:\s*#2a80eb/, `${domain} 不得重复携带公共 token。`)
}

console.info(`已验证 ${Object.keys(exportsMap).length} 个公开导出。`)

function assertOutputExists(label, target) {
  assert.equal(typeof target, 'string', `${label} 必须声明为字符串构建路径。`)
  assert.ok(target.startsWith('./dist/'), `${label} 必须指向 dist 目录。`)
  assert.ok(existsSync(resolve(packageDirectory, target)), `${label} 对应的构建文件不存在：${target}`)
}
