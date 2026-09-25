---
title: RangeSlider 范围滑块
description: 范围滑块用于选择数值区间。
seo:
  title: Vue RangeSlider 范围滑块组件
  description: LuLu UI Vue 范围滑块组件的中文用法与示例。
  keywords:
    - 范围滑块
    - Vue 表单
---

# RangeSlider 范围滑块

## 基础用法

::: demo basic
通过长度为二的数组绑定区间起止值。
:::

如需原生表单提交，分别设置 `startName` 与 `endName`。两个滑块各自提交数值，也会共同接收外部的 `aria-describedby`。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 范围的起止值。 | `[number, number]` | 必填 |
| `min` | 最小值。 | `number` | `0` |
| `max` | 最大值。 | `number` | `100` |
| `step` | 步长。 | `number` | `1` |
| `startLabel` | 起始滑块的可访问名称。 | `string` | `'Minimum value'` |
| `endLabel` | 结束滑块的可访问名称。 | `string` | `'Maximum value'` |
| `startName` | 起始滑块的原生表单字段名。 | `string` | — |
| `endName` | 结束滑块的原生表单字段名。 | `string` | — |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 范围改变时触发。 | `value: [number, number]` |
