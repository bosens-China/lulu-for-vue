import { readdirSync, readFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

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
  const publicEntries = readdirSync(entriesRoot)
    .filter((fileName) => fileName.endsWith('.ts') && !fileName.startsWith('use-'))
    .map((fileName) => fileName.slice(0, -'.ts'.length))
    .sort()
  const readmes = findFiles(componentsRoot, 'README.md')
  const documentNames = readmes.map(componentNameFromDocument).sort()

  it('每个公开组件都有一篇中文 README 和基础 Demo', () => {
    expect(documentNames).toEqual(publicEntries)

    for (const readme of readmes) {
      const document = readFileSync(readme, 'utf8')
      const componentName = componentNameFromDocument(readme)
      const componentSource = componentSourceFromEntry(componentName)

      expect(document).toContain('::: demo basic')
      expect(document).toMatch(/^# .+/m)
      expect(document).toContain('## API')

      if (componentSource.includes('defineProps')) {
        expect(document).toContain('| 参数 | 说明 | 类型 | 默认值 |')
      }

      if (componentSource.includes('defineModel') || componentSource.includes('defineEmits')) {
        expect(document).toContain('| 事件名 | 说明 | 回调参数 |')
      }

      expect(findFiles(dirname(dirname(readme)), 'BasicDemo.vue')).toHaveLength(1)
    }
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
})
