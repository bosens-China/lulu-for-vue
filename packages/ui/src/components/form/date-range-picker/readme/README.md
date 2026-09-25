---
title: DateRangePicker 日期范围选择器
description: 日期范围选择器用于选择开始与结束日期。
seo:
  title: Vue DateRangePicker 日期范围选择器组件
  description: LuLu UI Vue 日期范围选择器组件的中文用法与示例。
  keywords:
    - 日期范围
    - Vue 表单
---

# DateRangePicker 日期范围选择器

## 基础用法

::: demo basic
通过长度为二的数组绑定开始和结束日期。
:::

需要参与原生表单提交时，分别设置 `startName` 与 `endName`；两个输入会作为独立字段提交。外部传入的 `aria-describedby` 会关联到两个输入。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 开始和结束日期。 | `[start: string, end: string]` | 必填 |
| `type` | 日期范围输入类型。 | `'date' \| 'month' \| 'week'` | `'date'` |
| `startLabel` | 开始日期输入的标签。 | `string` | `'Start date'` |
| `endLabel` | 结束日期输入的标签。 | `string` | `'End date'` |
| `startName` | 开始日期的原生表单字段名。 | `string` | — |
| `endName` | 结束日期的原生表单字段名。 | `string` | — |
| `min` | 允许的最小日期。 | `string` | — |
| `max` | 允许的最大日期。 | `string` | — |
| `required` | 是否为必填。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 日期范围改变时触发。 | `value: [start: string, end: string]` |
