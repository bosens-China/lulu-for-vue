const componentNames = new Set([
  'LuluAccordion',
  'LuluAutocomplete',
  'LuluButton',
  'LuluCheckbox',
  'LuluColorPicker',
  'LuluDataTable',
  'LuluDatePicker',
  'LuluDateRangePicker',
  'LuluDialog',
  'LuluDialogHost',
  'LuluDisclosure',
  'LuluDropdown',
  'LuluFieldError',
  'LuluForm',
  'LuluFormField',
  'LuluHourPicker',
  'LuluInput',
  'LuluLoading',
  'LuluLoadingOverlay',
  'LuluMessage',
  'LuluMessageHost',
  'LuluPagination',
  'LuluPopconfirm',
  'LuluPopover',
  'LuluProgress',
  'LuluRadio',
  'LuluRangeSlider',
  'LuluRate',
  'LuluSelect',
  'LuluSlider',
  'LuluSwitch',
  'LuluTab',
  'LuluTabPanel',
  'LuluTable',
  'LuluTabs',
  'LuluTextarea',
  'LuluTooltip',
  'LuluYearPicker',
])

const apiEntries = {
  useDialog: 'use-dialog',
  useFormValidation: 'use-form-validation',
  useMessage: 'use-message',
} as const

export interface LuluComponentResolveResult {
  as: string
  from: string
  name: string
  sideEffects: string[]
}

export interface LuluApiResolveResult {
  from: string
  name: string
}

export type LuluComponentResolver = (
  componentName: string,
) => LuluComponentResolveResult | undefined

export type LuluApiResolver = (apiName: string) => LuluApiResolveResult | undefined

/**
 * 为 unplugin-vue-components 提供 LuLu 组件与样式的自动导入规则。
 */
export function LuluResolver(): LuluComponentResolver {
  return (componentName) => {
    if (!componentNames.has(componentName)) return undefined

    const entryName = toKebabCase(componentName.slice('Lulu'.length))

    return {
      name: 'default',
      as: componentName,
      from: `@lulu/vue/${entryName}`,
      sideEffects: ['@lulu/vue/base.css', `@lulu/vue/${entryName}/style.css`],
    }
  }
}

/**
 * 为 unplugin-auto-import 提供 LuLu composable 的自动导入规则。
 */
export function LuluApiResolver(): LuluApiResolver {
  return (apiName) => {
    const entryName = apiEntries[apiName as keyof typeof apiEntries]
    if (!entryName) return undefined

    return {
      name: apiName,
      from: `@lulu/vue/${entryName}`,
    }
  }
}

function toKebabCase(name: string) {
  return name.replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}
