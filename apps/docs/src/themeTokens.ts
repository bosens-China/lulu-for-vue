import source from '@lulu/vue/tokens.css?raw'

const descriptions: Record<string, string> = {
  'color-primary': '主色与强调色',
  'color-primary-solid': '实色主操作背景；默认跟随主色',
  'color-success': '成功状态',
  'color-warning': '警告状态',
  'color-danger': '危险与错误状态',
  'color-on-status': '状态底色上的文字',
  'color-neutral-solid': '中性实色背景',
  'color-on-neutral': '中性底色上的文字',
  'color-text': '正文文字',
  'color-text-muted': '次要文字',
  'color-text-inverse': '反色文字',
  'color-surface': '基础表面背景',
  'color-surface-subtle': '次级表面背景',
  'color-surface-hover': '悬停表面背景',
  'color-surface-selected': '选中表面背景',
  'color-border': '控件边框',
  'color-border-subtle': '弱分隔线',
  'color-overlay': '模态遮罩',
  'color-loading-overlay': '加载遮罩',
  'font-family': '字体栈',
  'font-size': '基础字号',
  'font-size-sm': '小字号',
  'font-size-lg': '大字号',
  'font-weight-strong': '强调字重',
  'line-height': '行高',
  'control-height': '默认控件高度',
  'control-height-sm': '小控件高度',
  'radius-sm': '小圆角',
  'radius': '默认圆角',
  'radius-lg': '大圆角',
  'space-1': '一级间距',
  'space-2': '二级间距',
  'space-3': '三级间距',
  'space-4': '四级间距',
  'shadow-overlay': '浮层阴影',
  'shadow-focus': '焦点光圈；默认由当前主色生成',
  'opacity-disabled': '禁用透明度',
  'transition-duration': '过渡时长',
  'transition-easing': '过渡缓动曲线',
  'z-index-popup': '触发式浮层层级',
  'z-index-message': '消息层级',
}

function declarations(block: string): Record<string, string> {
  return Object.fromEntries([...block.matchAll(/(--lulu-[\w-]+)\s*:\s*([^;]+);/g)]
    .map(([, name, value]) => [name, value?.trim() ?? '']))
}

export function themeTokenDefaults(css: string) {
  const light = declarations(css.slice(0, css.indexOf('}') + 1))
  const dark = { ...light, ...declarations(css.match(/\[data-lulu-theme=['"]dark['"]\]\s*\{([^}]+)\}/)?.[1] ?? '') }
  return { light, dark }
}
const { light, dark } = themeTokenDefaults(source)
const optional = {
  '--lulu-color-primary-solid': 'var(--lulu-color-primary)',
  '--lulu-shadow-focus': '0 0 0 3px var(--lulu-color-primary)',
}

function category(name: string): string {
  if (name.startsWith('--lulu-color-')) return '颜色'
  if (/--lulu-(font-|line-height)/.test(name)) return '排版'
  if (/--lulu-(control-height|radius|space-)/.test(name)) return '尺寸与间距'
  return '阴影、动效与层级'
}

function property(name: string): string {
  if (name.startsWith('--lulu-color-')) return 'color'
  if (name.startsWith('--lulu-font-size')) return 'font-size'
  if (name.startsWith('--lulu-font-')) return name.slice(7)
  if (name.includes('shadow-')) return 'box-shadow'
  if (name.includes('radius')) return 'border-radius'
  if (name.includes('height')) return name.endsWith('line-height') ? 'line-height' : 'height'
  if (name.includes('space-')) return 'padding'
  if (name.includes('opacity')) return 'opacity'
  if (name.includes('z-index')) return 'z-index'
  return name.endsWith('duration') ? 'transition-duration' : 'transition-timing-function'
}

export const globalThemeTokens = Object.entries({ ...light, ...optional }).map(([name, value]) => ({
  name,
  description: descriptions[name.slice(7)] ?? name.slice(7),
  category: category(name),
  property: property(name),
  light: value,
  dark: dark[name] ?? value,
  optional: name in optional,
}))
export const tokenCategories = [...new Set(globalThemeTokens.map(token => token.category))]
export type ThemeToken = (typeof globalThemeTokens)[number]

export function validTokenValue(token: ThemeToken, value: string): boolean {
  return value.length <= 300 && !/[;{}<>\r\n]/.test(value)
    && CSS.supports(token.property, value)
}
