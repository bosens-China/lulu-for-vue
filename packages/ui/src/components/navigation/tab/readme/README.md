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

禁用标签、数字 value 和方向键跳过禁用项的完整例子见 [Tabs 组合示例](../tabs/#数字值与禁用标签)。Tab 必须在 Tabs 中使用。

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 标签唯一值。 | `string \| number` | 必填 |
| `disabled` | 是否禁用。 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 标签文本。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#2a80eb` | `#38bdf8` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#a2a9b6` | `#a1a1aa` |
| `--lulu-shadow-focus` | 键盘聚焦光圈 | `0 0 0 3px rgb(42 128 235 / 24%)` | `0 0 0 3px rgb(56 189 248 / 35%)` |
| `--lulu-space-2` | 间距 2 | `8px` | `8px` |
| `--lulu-space-3` | 间距 3 | `12px` | `12px` |

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #2a80eb`。全局配色与导出入口见顶部“主题调色盘”和“主题定制”指南。
