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

  it('为组合组件先导入直接依赖样式', () => {
    expect(componentResolver('LuluPopconfirm')).toEqual({
      name: 'default',
      as: 'LuluPopconfirm',
      from: '@lulu/vue/popconfirm',
      sideEffects: [
        '@lulu/vue/base.css',
        '@lulu/vue/popover/style.css',
        '@lulu/vue/popconfirm/style.css',
      ],
    })
  })

  it('忽略非 LuLu 组件', () => {
    expect(componentResolver('ElButton')).toBeUndefined()
  })

  it('表单仅提供 Form 和自带错误样式的 FormItem', () => {
    for (const name of ['Form', 'FormItem']) {
      const entry = name === 'Form' ? 'form' : 'form-item'
      expect(LuluResolver()(`Lulu${name}`)?.sideEffects).toEqual([
        '@lulu/vue/base.css', `@lulu/vue/${entry}/style.css`,
      ])
    }
    expect(componentResolver('LuluFormField')).toBeUndefined()
    expect(componentResolver('LuluFieldError')).toBeUndefined()
    expect(apiResolver('useFormValidation')).toBeUndefined()
  })

  it('收敛后的 Table 补齐依赖，移除的日期与数据表格入口不可解析', () => {
    expect(LuluResolver()('LuluTable')?.sideEffects).toEqual([
      '@lulu/vue/base.css', '@lulu/vue/loading/style.css',
      '@lulu/vue/pagination/style.css', '@lulu/vue/table/style.css',
    ])
    for (const name of ['LuluDataTable', 'LuluYearPicker', 'LuluHourPicker']) {
      expect(componentResolver(name)).toBeUndefined()
    }
  })

  it('仅为公开 composable 返回短路径', () => {
    expect(apiResolver('useMessage')).toEqual({
      name: 'useMessage',
      from: '@lulu/vue/use-message',
    })
    expect(apiResolver('useUnknown')).toBeUndefined()
  })
})
