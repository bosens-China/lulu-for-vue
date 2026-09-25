---
title: Rate 评分
description: 评分组件用于录入离散或小数评分。
seo:
  title: Vue Rate 评分组件
  description: LuLu UI Vue 评分组件的中文用法与示例。
  keywords:
    - 评分
    - Vue 表单
---

# Rate 评分

## 基础用法

::: demo basic
使用 `v-model` 绑定评分数值。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前评分。 | `number` | 必填 |
| `min` | 最低评分。 | `number` | `0` |
| `max` | 最高评分。 | `number` | `5` |
| `step` | 评分步长。 | `number` | `0.5` |
| `label` | 评分控件的可访问名称。 | `string` | `'Rating'` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `readonly` | 是否只读。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 评分改变时触发。 | `value: number` |
