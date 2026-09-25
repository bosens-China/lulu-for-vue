---
title: Slider 滑块
description: 滑块用于选择连续或离散数值。
seo:
  title: Vue Slider 滑块组件
  description: LuLu UI Vue 滑块组件的中文用法与示例。
  keywords:
    - 滑块
    - Vue 表单
---

# Slider 滑块

## 基础用法

::: demo basic
通过 `v-model` 绑定当前数值。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前值。 | `number` | 必填 |
| `min` | 最小值。 | `number` | `0` |
| `max` | 最大值。 | `number` | `100` |
| `step` | 步长。 | `number` | `1` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 值改变时触发。 | `value: number` |
