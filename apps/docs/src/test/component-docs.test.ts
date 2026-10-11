import { readdirSync, readFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getComponentStyleTokens } from '../../build/componentStyleTokens'

const componentsRoot = resolve(import.meta.dirname, '../../../../packages/ui/src/components')
const entriesRoot = resolve(import.meta.dirname, '../../../../packages/ui/src/entries')

function findFiles(directory: string, fileName: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name)

    if (entry.isDirectory()) return findFiles(path, fileName)
    return entry.name === fileName ? [path] : []
  })
}

function componentNameFromDocument(path: string): string {
  return basename(dirname(dirname(path)))
}

function componentSourceFromEntry(entryName: string): string {
  const entryPath = resolve(entriesRoot, `${entryName}.ts`)
  const entry = readFileSync(entryPath, 'utf8')
  const sourcePath = entry.match(/from '([^']+)'/)?.[1]

  if (!sourcePath) {
    throw new Error(`无法解析组件入口：${entryPath}`)
  }

  return readFileSync(resolve(dirname(entryPath), sourcePath), 'utf8')
}

describe('组件中文文档交付', () => {
  const compositeParts = new Set(['tab', 'tab-panel', 'form-item', 'date-range-picker', 'time-range-picker'])
  const publicEntries = readdirSync(entriesRoot)
    .filter((fileName) => fileName.endsWith('.ts') && !fileName.startsWith('use-'))
    .map((fileName) => fileName.slice(0, -'.ts'.length))
    .sort()
  const readmes = findFiles(componentsRoot, 'README.md')
  const documentNames = readmes.map(componentNameFromDocument).sort()

  it('每个主文档入口都有中文 README 和基础 Demo', () => {
    expect(documentNames).toEqual(publicEntries.filter(name => !compositeParts.has(name)))

    for (const readme of readmes) {
      const document = readFileSync(readme, 'utf8')
      const componentName = componentNameFromDocument(readme)
      const componentSource = componentSourceFromEntry(componentName)

      expect(document).toContain('::: demo basic')
      expect(document).toMatch(/^# .+/m)
      expect(document).toContain('## API')
      expect(document).toContain('## CSS Tokens')
      expect(document).toMatch(/`--lulu-[\w-]+`/)

      if (componentSource.includes('defineProps')) {
        expect(document).toContain('| 参数 | 说明 | 类型 | 默认值 |')
      }

      if (componentSource.includes('defineModel') || componentSource.includes('defineEmits')) {
        expect(document).toContain('| 事件名 | 说明 | 回调参数 |')
      }

      expect(findFiles(dirname(dirname(readme)), 'BasicDemo.vue')).toHaveLength(1)
    }
  })

  it('Tabs 主文档包含组合子组件的 API', () => {
    const tabs = readFileSync(resolve(componentsRoot, 'navigation/tabs/readme/README.md'), 'utf8')
    expect(tabs).toContain('### LuluTabs')
    expect(tabs).toContain('### LuluTab\n')
    expect(tabs).toContain('### LuluTabPanel')
  })

  it.each([
    ['form', 'LuluForm', 'LuluFormItem'],
    ['date-picker', 'LuluDatePicker', 'LuluDateRangePicker'],
    ['time-picker', 'LuluTimePicker', 'LuluTimeRangePicker'],
  ])('%s 主文档包含单值与组合子组件 API', (entry, main, part) => {
    const document = readFileSync(resolve(componentsRoot, `form/${entry}/readme/README.md`), 'utf8')
    expect(document).toContain(`### ${main}\n`)
    expect(document).toContain(`### ${part}\n`)
  })

  it('不再保留英文 README 副本', () => {
    expect(findFiles(componentsRoot, 'README_US.md')).toEqual([])
  })

  it('API 表格中的代码类型不会用未转义的竖线拆开列', () => {
    for (const readme of readmes) {
      const rows = readFileSync(readme, 'utf8').split('\n').filter((line) => line.startsWith('|'))

      for (const row of rows) {
        const codeSpans = [...row.matchAll(/`([^`]+)`/g)]
        expect(codeSpans.every(([, code]) => !/(?<!\\)\|/.test(code ?? '')), `${readme}: ${row}`).toBe(true)
      }
    }
  })

  it('组件、共享样式和组合子组件使用的 Token 均列入对应文档', () => {
    for (const readme of readmes) {
      const componentName = componentNameFromDocument(readme)
      const document = readFileSync(readme, 'utf8')
      const tokens = getComponentStyleTokens(componentName).keys()

      for (const token of tokens) {
        expect(document, `${readme}: 缺少 ${token}`).toContain(`\`${token}\``)
      }
    }
  })

  it('Token 表不保留失效项，明暗全局默认值与主题源码一致', () => {
    const theme = readFileSync(resolve(componentsRoot, '../styles/tokens.css'), 'utf8')
    const blocks = [...theme.matchAll(/\{([^{}]*)\}/g)]
    const definitions = (source: string) => new Map([...source.matchAll(/(--lulu-[\w-]+):\s*([^;]+);/g)]
      .map(([, name = '', value = '']) => [name, value] as const))
    const light = definitions(blocks[0]?.[1] ?? '')
    const dark = new Map([...light, ...definitions(blocks[1]?.[1] ?? '')])

    for (const readme of readmes) {
      const document = readFileSync(readme, 'utf8')
      const tokens = getComponentStyleTokens(componentNameFromDocument(readme))
      const rows = [...document.matchAll(/^\| `(--lulu-[\w-]+)` \| (.*?) \| `([^`]+)` \| `([^`]+)` \|/gm)]
      expect(rows.map(row => row[1]).sort(), readme).toEqual([...tokens.keys()].sort())
      for (const [, name = '', description, lightValue, darkValue] of rows) {
        expect(description?.trim(), `${readme}: ${name}`).toBeTruthy()
        if (!light.has(name)) continue
        expect(lightValue, `${readme}: ${name} light`).toBe(light.get(name))
        expect(darkValue, `${readme}: ${name} dark`).toBe(dark.get(name))
      }
    }
  })
})
