---
title: DatePicker 日期选择器
description: 日期选择器用于输入日期、时间或月份等原生日期值。
seo:
  title: Vue DatePicker 日期选择器组件
  description: LuLu UI Vue 日期选择器组件的中文用法与示例。
  keywords:
    - 日期选择器
    - Vue 表单
---

# DatePicker 日期选择器

## 基础用法

::: demo basic
默认使用日期输入类型，也可用 `type` 切换为时间或月份。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 日期字符串。 | `string` | `''` |
| `type` | 原生日期输入类型。 | `'date' \| 'datetime-local' \| 'month' \| 'time' \| 'week'` | `'date'` |
| `min` | 允许的最小日期。 | `string` | — |
| `max` | 允许的最大日期。 | `string` | — |
| `step` | 原生日期输入步长。 | `number \| string` | — |
| `required` | 是否为必填。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 日期值改变时触发。 | `value: string` |
