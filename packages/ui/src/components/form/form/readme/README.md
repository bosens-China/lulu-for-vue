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

## API

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 原生表单控件与操作按钮。 | — |

### Expose

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `element` | 原生表单元素，供 `useFormValidation` 或浏览器 Form API 使用。 | `HTMLFormElement \| null` |
