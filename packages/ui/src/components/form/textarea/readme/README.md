---
title: Textarea 文本域
description: 文本域用于输入多行文本内容。
seo:
  title: Vue Textarea 文本域组件
  description: LuLu UI Vue 文本域组件的中文用法与示例。
  keywords:
    - 文本域
    - Vue 表单
---

# Textarea 文本域

## 基础用法

::: demo basic
使用 `v-model` 绑定多行文本。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 输入值。 | `string` | — |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `readonly` | 是否只读。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 输入值改变时触发。 | `value: string` |
