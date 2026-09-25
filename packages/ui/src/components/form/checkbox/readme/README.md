---
title: Checkbox 多选框
description: 多选框用于切换独立的布尔状态。
seo:
  title: Vue Checkbox 多选框组件
  description: LuLu UI Vue 多选框组件的中文用法与示例。
  keywords:
    - 多选框
    - Vue 表单
---

# Checkbox 多选框

## 基础用法

::: demo basic
通过 `v-model` 绑定选中状态。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 是否选中。 | `boolean` | `false` |
| `v-model:indeterminate` | 是否为半选状态。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 选中状态改变时触发。 | `checked: boolean` |
| `update:indeterminate` | 半选状态改变时触发。 | `indeterminate: boolean` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 复选框标签内容。 | — |
