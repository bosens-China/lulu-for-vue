import { readFileSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const uiRoot = resolve(import.meta.dirname, '../../../packages/ui/src')
const stylesRoot = resolve(uiRoot, 'styles')

/** 只收集命中组件选择器的规则，包含共享家族和嵌套 var() 回退。 */
export function collectStyleTokens(css: string, classes: ReadonlySet<string>): Map<string, string[]> {
  const tokens = new Map<string, string[]>()
  const source = css.replace(/\/\*[\s\S]*?\*\//g, '')
  // shortcut: 解析当前平铺选择器；引入 CSS nesting 时改用语法树解析。
  for (const [, selector = '', body = ''] of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectorClasses = [...selector.matchAll(/\.(lulu-[\w-]+)/g)].map(match => match[1] ?? '')
    if (!selectorClasses.some(name => classes.has(name))) continue
    for (const match of body.matchAll(/--lulu-[\w-]+/g)) {
      if (!tokens.has(match[0])) tokens.set(match[0], [])
    }
    for (const match of body.matchAll(/var\((--lulu-[\w-]+)/g)) {
      const name = match[1] ?? ''
      const start = (match.index ?? 0) + match[0].length
      let depth = 1
      let end = start
      for (; end < body.length && depth > 0; end++) {
        if (body[end] === '(') depth++
        if (body[end] === ')') depth--
      }
      const fallback = body.slice(start, end - 1).trim().replace(/^,\s*/, '')
      const values = tokens.get(name) ?? []
      if (fallback && !values.includes(fallback)) values.push(fallback)
      tokens.set(name, values)
    }
  }
  return tokens
}

function componentClasses(entryName: string, visited = new Set<string>()): Set<string> {
  const entry = readFileSync(resolve(uiRoot, `entries/${entryName}.ts`), 'utf8')
  const source = entry.match(/from '([^']+\.vue)'/)?.[1]
  if (!source) throw new Error(`找不到组件源码：${entryName}`)
  const classes = new Set<string>()
  function readComponent(path: string) {
    if (visited.has(path)) return
    visited.add(path)
    const component = readFileSync(path, 'utf8')
    for (const match of component.matchAll(/\blulu-(?!u-)[\w-]+/g)) classes.add(match[0])
    for (const [, dependency = ''] of component.matchAll(/from ['"]([^'"]+\.vue)['"]/g)) {
      readComponent(resolve(dirname(path), dependency))
    }
  }
  readComponent(resolve(uiRoot, 'entries', source))
  const parts: Readonly<Record<string, readonly string[]>> = {
    tabs: ['tab', 'tab-panel'],
    form: ['form-item'],
    'date-picker': ['date-range-picker'],
    'time-picker': ['time-range-picker'],
  }
  if (parts[entryName]) {
    for (const part of parts[entryName]) {
      for (const name of componentClasses(part, visited)) classes.add(name)
    }
  }
  return classes
}

export function getComponentStyleTokens(entryName: string): Map<string, string[]> {
  const directory = resolve(stylesRoot, 'components')
  const css = [readFileSync(resolve(stylesRoot, 'base.css'), 'utf8'), ...readdirSync(directory)
    .filter(name => name.endsWith('.css'))
    .map(name => readFileSync(resolve(directory, name), 'utf8'))].join('\n')
  return collectStyleTokens(css, componentClasses(entryName))
}
