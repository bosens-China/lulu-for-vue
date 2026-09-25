---
title: Dialog 对话框
description: 对话框用于承载需要用户确认或补充输入的内容。
seo:
  title: Vue Dialog 对话框组件
  description: LuLu UI Vue 对话框组件的中文用法与示例。
  keywords:
    - 对话框
    - Vue 浮层
---

# Dialog 对话框

## 基础用法

::: demo basic
通过 `v-model:open` 控制对话框显示状态。
:::

## 自定义标题与关闭策略

::: demo policy
header 插槽自定义标题；关闭策略只在确有需要的流程中使用，不能让用户无路可退。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 是否显示对话框。 | `boolean` | `false` |
| `title` | 对话框标题。 | `string` | `''` |
| `closable` | 是否显示关闭按钮。 | `boolean` | `true` |
| `closeOnOverlay` | 点击遮罩是否请求关闭。 | `boolean` | `true` |
| `closeOnEscape` | 按下 Escape 是否请求关闭。 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:open` | 显示状态改变时触发。 | `open: boolean` |
| `close` | 组件请求关闭时触发。 | `reason: 'close-button' \| 'escape' \| 'overlay' \| 'native'` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 对话框主体。 | — |
| `header` | 自定义标题。 | — |
| `footer` | 自定义底部操作区。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border-subtle` | 分隔线与弱边框 | `#ededef` | `#27272a` |
| `--lulu-color-overlay` | 模态遮罩 | `rgb(15 23 42 / 45%)` | `rgb(0 0 0 / 75%)` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#a2a9b6` | `#a1a1aa` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-font-size-lg` | 标题文字大小 | `16px` | `16px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius-lg` | 大圆角 | `10px` | `10px` |
| `--lulu-shadow-overlay` | 浮层阴影 | `0 8px 24px rgb(15 23 42 / 16%)` | `0 8px 24px rgb(0 0 0 / 70%)` |
| `--lulu-space-1` | 间距 1 | `4px` | `4px` |
| `--lulu-space-3` | 间距 3 | `12px` | `12px` |
| `--lulu-space-4` | 间距 4 | `16px` | `16px` |

例如在局部容器的 `style` 中设置 `--lulu-color-border-subtle: #ededef`。全局配色与导出入口见顶部“主题调色盘”和“主题定制”指南。
