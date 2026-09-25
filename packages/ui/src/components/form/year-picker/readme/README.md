---
title: YearPicker 年份选择器
description: 年份选择器用于选择四位年份。
seo:
  title: Vue YearPicker 年份选择器组件
  description: LuLu UI Vue 年份选择器组件的中文用法与示例。
  keywords:
    - 年份选择器
    - Vue 表单
---

# YearPicker 年份选择器

## 基础用法

::: demo basic
通过数字或 `null` 绑定年份。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前年份。 | `number \| null` | `null` |
| `min` | 最小年份。 | `number` | — |
| `max` | 最大年份。 | `number` | — |
| `required` | 是否为必填。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 年份改变时触发。 | `value: number \| null` |
