---
title: Tabs 标签页
description: 标签页组件协调标签和对应内容面板的选中状态。
seo:
  title: Vue Tabs 标签页组件
  description: LuLu UI Vue 标签页组件的中文用法与示例。
  keywords:
    - 标签页
    - Vue 导航
---

# Tabs 标签页

## 基础用法

::: demo basic
`LuluTabs`、`LuluTab` 与 `LuluTabPanel` 需要组合使用。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前选中标签的值。 | `string \| number` | 必填 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 选中标签改变时触发。 | `value: string \| number` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `tabs` | 放置 `LuluTab`。 | — |
| `default` | 放置 `LuluTabPanel`。 | — |
