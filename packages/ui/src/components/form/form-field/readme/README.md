---
title: FormField 表单字段
description: 表单字段组件统一关联标签、控件和错误提示。
seo:
  title: Vue FormField 表单字段组件
  description: LuLu UI Vue 表单字段组件的中文用法与示例。
  keywords:
    - 表单字段
    - Vue 表单
---

# FormField 表单字段

## 基础用法

::: demo basic
默认插槽会获得应传给表单控件的无障碍属性。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `controlId` | 关联表单控件的 ID。 | `string` | 必填 |
| `label` | 字段标签。 | `string` | — |
| `error` | 错误提示文本。 | `string` | — |
| `required` | 是否标记为必填。 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 表单控件。 | `{ controlProps }` |
| `label` | 自定义标签。 | — |
| `error` | 自定义错误提示。 | `{ errorId, message }` |
