---
title: TabPanel 标签面板
description: 标签面板展示与当前标签对应的内容。
seo:
  title: Vue TabPanel 标签面板组件
  description: LuLu UI Vue 标签面板组件的中文用法与示例。
  keywords:
    - 标签面板
    - Vue 导航
---

# TabPanel 标签面板

## 基础用法

::: demo basic
`value` 与 `LuluTab` 的值相同的面板会在标签被选中时显示。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 与标签对应的唯一值。 | `string \| number` | 必填 |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 面板内容。 | — |
