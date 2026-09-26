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

## 数字值与禁用标签

::: demo numeric
数字 value 需使用 :value 绑定，并与面板值类型保持一致；方向键跳过禁用标签。Tab 和 TabPanel 共用此组合示例。
:::

## API

### LuluTabs

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前选中标签的值。 | `string \| number` | 必填 |

#### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 选中标签改变时触发。 | `value: string \| number` |

#### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `tabs` | 放置 `LuluTab`。 | — |
| `default` | 放置 `LuluTabPanel`。 | — |

### LuluTab

`LuluTab` 放在 `LuluTabs` 的 `tabs` 插槽中。`value` 与对应面板的值和类型保持一致。

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 标签唯一值。 | `string \| number` | 必填 |
| `disabled` | 是否禁用。 | `boolean` | `false` |

#### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 标签文本。 | — |

### LuluTabPanel

`LuluTabPanel` 的 `value` 与标签相同时显示内容。

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 与标签对应的唯一值。 | `string \| number` | 必填 |

#### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 面板内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#d0d0d5` | `#3f3f46` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#2a80eb` | `#38bdf8` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#a2a9b6` | `#a1a1aa` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-shadow-focus` | 键盘聚焦光圈 | `0 0 0 3px rgb(42 128 235 / 24%)` | `0 0 0 3px rgb(56 189 248 / 35%)` |
| `--lulu-space-1` | 间距 1 | `4px` | `4px` |
| `--lulu-space-2` | 间距 2 | `8px` | `8px` |
| `--lulu-space-3` | 间距 3 | `12px` | `12px` |

例如在局部容器的 `style` 中设置 `--lulu-color-border: #d0d0d5`。全局配色与导出入口见顶部“主题调色盘”和“主题定制”指南。
