import { describe, expect, it } from 'vitest'
import type { Resolver } from 'unplugin-auto-import/types'
import type { ComponentResolver } from 'unplugin-vue-components'
import { LuluApiResolver, LuluResolver } from '../resolver'

describe('LuLu 自动导入 resolver', () => {
  const componentResolver: ComponentResolver = LuluResolver()
  const apiResolver: Resolver = LuluApiResolver()

  it('为公开组件返回短路径与样式入口', () => {
    expect(componentResolver('LuluDateRangePicker')).toEqual({
      name: 'default',
      as: 'LuluDateRangePicker',
      from: '@lulu/vue/date-range-picker',
      sideEffects: ['@lulu/vue/base.css', '@lulu/vue/date-range-picker/style.css'],
    })
  })

  it('忽略非 LuLu 组件', () => {
    expect(componentResolver('ElButton')).toBeUndefined()
  })

  it('仅为公开 composable 返回短路径', () => {
    expect(apiResolver('useMessage')).toEqual({
      name: 'useMessage',
      from: '@lulu/vue/use-message',
    })
    expect(apiResolver('useUnknown')).toBeUndefined()
  })
})
