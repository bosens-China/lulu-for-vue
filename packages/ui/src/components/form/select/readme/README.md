---
title: Select 选择器
description: 选择器用于从原生选项列表中选择一个或多个值。
seo:
  title: Vue Select 选择器组件
  description: LuLu UI Vue 选择器组件的中文用法与示例。
  keywords:
    - 选择器
    - Vue 表单
---

# Select 选择器

## 基础用法

::: demo basic
在默认插槽中放置原生 `option` 元素。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 选中的值或值数组。 | `string \| string[]` | 必填 |
| `multiple` | 是否多选。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 选中值改变时触发。 | `value: string \| string[]` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 原生 `<option>` 或 `<optgroup>`。 | — |
