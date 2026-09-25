---
title: Tab 标签
description: 标签组件定义标签页中的一个可选项。
seo:
  title: Vue Tab 标签组件
  description: LuLu UI Vue 标签组件的中文用法与示例。
  keywords:
    - 标签
    - Vue 导航
---

# Tab 标签

## 基础用法

::: demo basic
`LuluTab` 必须放入 `LuluTabs` 的 `tabs` 插槽中。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 标签唯一值。 | `string \| number` | 必填 |
| `disabled` | 是否禁用。 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 标签文本。 | — |
