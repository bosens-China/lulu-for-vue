---
title: Progress 进度条
description: 进度条用于展示任务的完成比例。
seo:
  title: Vue Progress 进度条组件
  description: LuLu UI Vue 进度条组件的中文用法与示例。
  keywords:
    - 进度条
    - Vue 反馈
---

# Progress 进度条

## 基础用法

::: demo basic
将 `value` 与 `max` 组合为明确的进度比例。
:::

## 不确定进度与自定义上限

::: demo states
省略 value 表示不确定进度，无需额外的 indeterminate 属性；max 可以是任务数量。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前进度。 | `number` | — |
| `max` | 进度上限。 | `number` | `100` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 进度文本的替代内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border-subtle` | 分隔线与弱边框 | `#ededef` | `#27272a` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#2a80eb` | `#38bdf8` |

例如在局部容器的 `style` 中设置 `--lulu-color-border-subtle: #ededef`。全局配色与导出入口见顶部“主题调色盘”和“主题定制”指南。
