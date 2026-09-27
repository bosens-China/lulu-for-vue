---
title: Form 表单
description: 表单组件提供语义化的提交边界。
seo:
  title: Vue Form 表单组件
  description: LuLu UI Vue 表单组件的中文用法与示例。
  keywords:
    - 表单
    - Vue 表单
---

# Form 表单

## 基础用法

::: demo basic
输入姓名后点击提交。`@submit` 接收原生 `submit` 事件；示例调用 `preventDefault()`，由应用决定如何保存数据。
:::

`LuluForm` 只为原生 `<form>` 提供统一间距。`action`、`method`、`autocomplete` 等原生属性，以及 `@submit` 事件会直接透传给 `<form>`。需要自定义校验时，可对原生表单元素使用 `useFormValidation`，再通过 `LuluFormField` 展示错误；组件本身不接管提交和校验。

## 表单校验

::: demo validation
此示例同时使用原生 `required`、`type="email"` 约束和同步业务规则。`novalidate` 让提交事件交给示例处理，`useFormValidation` 仍会读取原生校验结果，并把错误交给 `LuluFormField` 展示。规则通过后才执行提交逻辑。
:::

`useFormValidation` 目前只支持同步规则及原生表单控件。需要异步校验、跨字段规则或复杂表单状态时，可在应用层组合专门的表单库；`LuluForm` 不要求固定校验引擎。

## 重置数据与校验

::: demo reset
useFormValidation.reset() 触发表单 reset 并清除错误；reset 事件负责同步业务模型。不要在 reset 事件处理器中再次调用 reset()，以免递归。
:::

## API

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 原生表单控件与操作按钮。 | — |

### Expose

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `element` | 原生表单元素，供 `useFormValidation` 或浏览器 Form API 使用。 | `HTMLFormElement \| null` |

### useFormValidation

`useFormValidation(form, options?)` 汇总原生约束与同步业务规则。同名 `radio` 或 `checkbox` 只执行一次业务规则；规则接收已选控件的值和元素，未选择时值为 `''`。禁用、隐藏等 `willValidate` 为 `false` 的控件不会参与校验。

#### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `form` | 原生表单元素，支持普通值、Ref 或 getter。 | `MaybeRefOrGetter<HTMLFormElement \| null \| undefined>` | — |
| `options.rules` | 以控件 `name`（无 `name` 时使用 `id`）为键的同步规则。 | `MaybeRefOrGetter<Record<string, FormValidationRule>>` | `{}` |

`FormValidationRule` 的签名为 `(value, control) => string | undefined`。返回字符串表示校验失败，返回 `undefined` 表示通过。

#### 返回值

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `errors` | 只读错误记录，键与规则字段名一致。 | `Readonly<Ref<Record<string, string>>>` |
| `validate` | 执行原生约束和业务规则，并返回是否通过。 | `() => boolean` |
| `reset` | 调用原生 `form.reset()` 并清空错误。 | `() => void` |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-space-4` | 大间距 | `16px` | `16px` |

例如在局部容器的 `style` 中设置 `--lulu-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
