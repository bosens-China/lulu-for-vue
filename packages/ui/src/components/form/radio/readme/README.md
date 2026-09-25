---
title: Radio 单选框
description: 单选框用于在多个选项中选择唯一值。
seo:
  title: Vue Radio 单选框组件
  description: LuLu UI Vue 单选框组件的中文用法与示例。
  keywords:
    - 单选框
    - Vue 表单
---

# Radio 单选框

## 基础用法

::: demo basic
多个单选框共享同一个 `v-model`。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前选中的值。 | `unknown` | — |
| `value` | 当前选项的值。 | `unknown` | 必填 |
| `disabled` | 是否禁用。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 选中值改变时触发。 | `value: unknown` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 单选框标签内容。 | — |
