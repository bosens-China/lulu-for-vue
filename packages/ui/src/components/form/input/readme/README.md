---
title: Input 输入框
description: 输入框用于接收单行文本内容。
seo:
  title: Vue Input 输入框组件
  description: LuLu UI Vue 输入框组件的中文用法与示例。
  keywords:
    - 输入框
    - Vue 表单
---

# Input 输入框

## 基础用法

::: demo basic
使用 `v-model` 双向绑定输入内容。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 输入值。 | `string` | — |
| `type` | 原生输入类型。 | `string` | `'text'` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `readonly` | 是否只读。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 输入值改变时触发。 | `value: string` |
