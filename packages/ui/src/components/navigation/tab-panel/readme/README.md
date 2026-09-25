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

数字 value 与多面板联动见 [Tabs 组合示例](../tabs/#数字值与禁用标签)。TabPanel 与 Tab 的 value 类型和值必须一致。

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 与标签对应的唯一值。 | `string \| number` | 必填 |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 面板内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-space-3` | 间距 3 | `12px` | `12px` |

例如在局部容器的 `style` 中设置 `--lulu-space-3: 12px`。全局配色与导出入口见顶部“主题调色盘”和“主题定制”指南。
