---
title: Message 消息提示
description: 消息提示用于反馈短暂的操作结果。
seo:
  title: Vue Message 消息提示组件
  description: LuLu UI Vue 消息提示组件的中文用法与示例。
  keywords:
    - 消息提示
    - Vue 反馈
---

# Message 消息提示

## 基础用法

::: demo basic
传入 `message` 和 `type` 展示不同语义的提示。
:::

## 消息类型与关闭

::: demo types
比较四种语义类型。duration 为 0 时不自动关闭；closable 控制关闭按钮。
:::

## 自动关闭与重新显示

::: demo duration
duration 的单位为毫秒；close 事件由父组件移除消息。重新挂载后重新计时。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `message` | 提示文本。 | `string` | 必填 |
| `type` | 消息类型。 | `'success' \| 'error' \| 'info' \| 'warning'` | `'info'` |
| `duration` | 自动关闭的等待时间；非正数表示不自动关闭。 | `number` | `4000` |
| `closable` | 是否显示关闭按钮。 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `close` | 手动或自动关闭时触发。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#d0d0d5` | `#3f3f46` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#2a80eb` | `#38bdf8` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#a2a9b6` | `#a1a1aa` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-shadow-overlay` | 浮层阴影 | `0 8px 24px rgb(15 23 42 / 16%)` | `0 8px 24px rgb(0 0 0 / 70%)` |
| `--lulu-space-1` | 最小间距 | `4px` | `4px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |
| `--lulu-space-4` | 大间距 | `16px` | `16px` |

例如在局部容器的 `style` 中设置 `--lulu-color-border: #d0d0d5`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
