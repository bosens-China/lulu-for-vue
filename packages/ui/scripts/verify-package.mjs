import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packageJson = JSON.parse(readFileSync(resolve(packageDirectory, 'package.json'), 'utf8'))
const exportsMap = packageJson.exports

assert.notEqual(packageJson.version, '0.0.0', '发布包必须使用真实的 SemVer 版本。')
assert.equal(packageJson.license, 'MIT', '发布包必须声明许可证。')
assert.equal(packageJson.repository?.directory, 'packages/ui', '发布包必须声明 monorepo 子目录。')
assert.equal(packageJson.publishConfig?.access, 'public', 'scoped 公共包必须声明 public access。')
assert.equal(packageJson.publishConfig?.registry, 'https://registry.npmjs.org/', '发布 registry 必须固定为 npmjs.org。')
assert.ok(existsSync(resolve(packageDirectory, 'LICENSE')), '发布包目录必须包含许可证。')

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
const dialogHost = await import('@lulu/vue/dialog-host')
const resolver = await import('@lulu/vue/resolver')

assert.equal(root.LuluButton, button.default, '根入口和单组件入口必须指向同一个构建模块。')
assert.equal(root.LuluSpace, space.default, 'Space 根入口和单组件入口必须指向同一个构建模块。')
assert.equal(root.LuluDialogHost, dialogHost.default, '弹窗宿主入口必须一致。')
assert.equal(typeof resolver.LuluResolver, 'function', '自动导入 resolver 必须是公开入口。')

const componentSubpaths = Object.keys(exportsMap).filter((path) => path !== './style.css' && path.endsWith('/style.css'))
const componentStyleDependencies = new Map([
  ['data-table', ['table']],
  ['dialog-host', ['dialog']],
  ['form-field', ['field-error']],
  ['loading-overlay', ['loading']],
  ['message-host', ['message']],
  ['popconfirm', ['popover']],
])
const apiEntries = new Map([
  ['use-dialog', 'useDialog'],
  ['use-form-validation', 'useFormValidation'],
  ['use-message', 'useMessage'],
])
const builtEntries = readdirSync(resolve(packageDirectory, 'dist/entries'))
  .filter((file) => file.endsWith('.js'))
  .map((file) => file.slice(0, -3))
  .sort()
const expectedEntries = [
  ...componentSubpaths.map((subpath) => subpath.slice(2, -'/style.css'.length)),
  ...apiEntries.keys(),
].sort()

assert.deepEqual(builtEntries, expectedEntries, '公开组件、Composable 与构建入口必须完整对齐。')

for (const subpath of componentSubpaths) {
  const entry = subpath.slice(2, -'/style.css'.length)
  const componentName = `Lulu${entry.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('')}`
  const component = await import(`@lulu/vue/${entry}`)
  const result = resolver.LuluResolver()(componentName)
  assert.equal(root[componentName], component.default, `${componentName} 的根入口和子路径必须指向同一组件。`)
  assert.equal(result?.from, `@lulu/vue/${entry}`, `${componentName} 必须可由 resolver 按需引入。`)
  assert.equal(result.name, 'default', `${componentName} 子路径必须按默认导出导入。`)
  assert.equal(result.as, componentName, `${componentName} 必须保留模板中的组件名。`)
  assert.deepEqual(result.sideEffects, [
    '@lulu/vue/base.css',
    ...(componentStyleDependencies.get(entry) ?? []).map((dependency) => `@lulu/vue/${dependency}/style.css`),
    `@lulu/vue/${entry}/style.css`,
  ], `${componentName} 必须按依赖顺序导入基础、组合依赖与自身样式。`)
  assert.equal(
    exportsMap[subpath],
    `./dist/styles/components/${entry}.css`,
    `${componentName} 必须拥有独立样式产物。`,
  )
}

for (const [entry, apiName] of apiEntries) {
  const api = await import(`@lulu/vue/${entry}`)
  assert.equal(typeof api[apiName], 'function', `${apiName} 子路径必须保留具名导出。`)
  assert.equal(root[apiName], api[apiName], `${apiName} 的根入口和子路径必须一致。`)
  assert.equal(resolver.LuluApiResolver()(apiName)?.from, `@lulu/vue/${entry}`, `${apiName} 必须可由 API resolver 按需引入。`)
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
assert.match(baseStyle, /\.lulu-floating-panel\s*\{/, '共享基础样式必须包含浮层基座。')
assert.match(baseStyle, /\[data-lulu-theme=["']dark["']\]/, '共享基础样式必须支持显式暗色主题。')
assert.match(baseStyle, /prefers-color-scheme:\s*dark/, '共享基础样式必须支持系统暗色偏好。')
assert.doesNotMatch(baseStyle, /(?:^|\})\s*\.dark\s*\{/m, '主题选择器不能占用使用方的通用 dark 类名。')
const buttonStyle = readFileSync(resolve(packageDirectory, 'dist/styles/components/button.css'), 'utf8')
assert.match(buttonStyle, /\.lulu-button/, '按需样式必须包含组件选择器。')
assert.doesNotMatch(buttonStyle, /\.lulu-(?:popover|input|table)/, 'Button 样式不得携带其他组件选择器。')
const inputStyle = readFileSync(resolve(packageDirectory, 'dist/styles/components/input.css'), 'utf8')
assert.doesNotMatch(inputStyle, /\.lulu-(?:textarea|select)/, '基础控件样式不得复制到 Input 组件产物。')
for (const subpath of componentSubpaths) {
  const entry = subpath.slice(2, -'/style.css'.length)
  const style = readFileSync(resolve(packageDirectory, `dist/styles/components/${entry}.css`), 'utf8')
  assert.doesNotMatch(style, /--lulu-color-primary\s*:/, `${entry} 不得重复携带公共 token。`)
}
for (const domain of ['action', 'data', 'feedback', 'form', 'navigation', 'overlay']) {
  assert.equal(existsSync(resolve(packageDirectory, `dist/styles/${domain}.css`)), false, `${domain} 领域整包不得继续发布。`)
}

console.info(`已验证 ${Object.keys(exportsMap).length} 个公开导出。`)

function assertOutputExists(label, target) {
  assert.equal(typeof target, 'string', `${label} 必须声明为字符串构建路径。`)
  assert.ok(target.startsWith('./dist/'), `${label} 必须指向 dist 目录。`)
  assert.ok(existsSync(resolve(packageDirectory, target)), `${label} 对应的构建文件不存在：${target}`)
}
