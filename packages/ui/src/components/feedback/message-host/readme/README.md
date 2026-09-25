---
title: MessageHost 消息宿主
description: 消息宿主为 `useMessage` 提供消息展示上下文。
seo:
  title: Vue MessageHost 消息宿主组件
  description: LuLu UI Vue 消息宿主组件的中文用法与示例。
  keywords:
    - 消息宿主
    - Vue 反馈
---

# MessageHost 消息宿主

## 基础用法

::: demo basic
将需要调用 `useMessage` 的内容包裹在消息宿主内。
:::

## 消息类型、时长与队列

::: demo queue
宿主默认 2.5 秒；子组件通过 useMessage 触发四种消息，单条 duration 可覆盖默认值，duration=0 的消息使用返回句柄手动关闭。全部代码包含在本例源码中。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `duration` | 子级消息的默认显示时间。 | `number` | `4000` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 可使用 `useMessage` 的后代内容。 | — |

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
| `--lulu-space-1` | 间距 1 | `4px` | `4px` |
| `--lulu-space-2` | 间距 2 | `8px` | `8px` |
| `--lulu-space-3` | 间距 3 | `12px` | `12px` |
| `--lulu-space-4` | 间距 4 | `16px` | `16px` |
| `--lulu-z-index-message` | 消息层级 | `1200` | `1200` |

例如在局部容器的 `style` 中设置 `--lulu-color-border: #d0d0d5`。全局配色与导出入口见顶部“主题调色盘”和“主题定制”指南。
