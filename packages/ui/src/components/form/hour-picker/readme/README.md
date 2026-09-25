---
title: HourPicker 小时选择器
description: 小时选择器用于选择 0 到 23 的整点小时。
seo:
  title: Vue HourPicker 小时选择器组件
  description: LuLu UI Vue 小时选择器组件的中文用法与示例。
  keywords:
    - 小时选择器
    - Vue 表单
---

# HourPicker 小时选择器

## 基础用法

::: demo basic
通过数字或 `null` 绑定当前小时。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前小时。 | `number \| null` | `null` |
| `min` | 最小小时。 | `number` | `0` |
| `max` | 最大小时。 | `number` | `23` |
| `step` | 小时步长。 | `number` | `1` |
| `required` | 是否为必填。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 小时改变时触发。 | `value: number \| null` |
