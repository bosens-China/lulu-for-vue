---
title: Switch 开关
description: 开关用于切换开与关两种状态。
seo:
  title: Vue Switch 开关组件
  description: LuLu UI Vue 开关组件的中文用法与示例。
  keywords:
    - 开关
    - Vue 表单
---

# Switch 开关

## 基础用法

::: demo basic
通过 `v-model` 绑定布尔状态。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 是否打开。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 开关状态改变时触发。 | `checked: boolean` |
