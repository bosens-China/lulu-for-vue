import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const packageJson = JSON.parse(readFileSync(resolve(packageDirectory, 'package.json'), 'utf8')) as {
  exports: Record<string, string | { import: string, types: string }>
}

describe('组件子路径导出', () => {
  it('为完整、resolver、组件通配符与样式入口定义导出', () => {
    expect(packageJson.exports['.']).toEqual({
      import: './dist/index.js',
      types: './dist/index.d.ts',
    })
    expect(packageJson.exports['./resolver']).toEqual({
      import: './dist/resolver.js',
      types: './dist/resolver.d.ts',
    })
    expect(packageJson.exports['./*']).toEqual({
      import: './dist/entries/*.js',
      types: './dist/entries/*.d.ts',
    })
    expect(packageJson.exports['./button/style.css']).toBe('./dist/styles/action.css')
    expect(packageJson.exports['./style.css']).toBe('./dist/styles/style.css')
    expect(packageJson.exports['./base.css']).toBe('./dist/styles/base.css')
    expect(packageJson.exports['./tokens.css']).toBe('./dist/styles/tokens.css')
  })

  it('通配符仅指向公开入口，不暴露内部构建目录', () => {
    const subpaths = Object.keys(packageJson.exports)

    expect(subpaths).toContain('./*')
    expect(subpaths.some((subpath) => subpath.includes('components'))).toBe(false)
  })
})
