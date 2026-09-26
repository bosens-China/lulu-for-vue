---
title: Popconfirm 气泡确认框
description: 气泡确认框在危险或不可逆操作前请求用户确认。
seo:
  title: Vue Popconfirm 气泡确认框组件
  description: LuLu UI Vue 气泡确认框组件的中文用法与示例。
  keywords:
    - 确认框
    - Vue 浮层
---

# Popconfirm 气泡确认框

## 基础用法

::: demo basic
用 `trigger` 插槽提供触发元素，通过 `confirm` 监听确认操作。
:::

打开后焦点先到取消按钮；确认或取消后焦点返回触发按钮。

## 受控确认与取消反馈

::: demo controlled
confirm 和 cancel 分别提供反馈；默认插槽定制消息，外部按钮演示受控开关。全部 placement 值见 [Popover 位置示例](../popover/#位置与关闭策略)。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 是否显示确认浮层。 | `boolean` | `false` |
| `message` | 确认提示。 | `string` | `'Are you sure?'` |
| `confirmText` | 确认按钮文字。 | `string` | `'Confirm'` |
| `cancelText` | 取消按钮文字。 | `string` | `'Cancel'` |
| `placement` | 浮层相对触发器的位置。 | `FloatingPlacement` | `'bottom-start'` |
| `disabled` | 是否禁用触发器。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:open` | 显示状态改变时触发。 | `open: boolean` |
| `confirm` | 用户确认时触发。 | — |
| `cancel` | 用户取消时触发。 | — |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `trigger` | 触发按钮内容。 | — |
| `default` | 确认提示内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#d0d0d5` | `#3f3f46` |
| `--lulu-color-primary-solid` | 主要操作底色 | `#0057c3` | `#38bdf8` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-inverse` | 强调底色上的文字 | `#ffffff` | `#000000` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-control-height-sm` | 紧凑控件高度 | `32px` | `32px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-shadow-overlay` | 浮层阴影 | `0 8px 24px rgb(15 23 42 / 16%)` | `0 8px 24px rgb(0 0 0 / 70%)` |
| `--lulu-space-1` | 间距 1 | `4px` | `4px` |
| `--lulu-space-2` | 间距 2 | `8px` | `8px` |
| `--lulu-space-3` | 间距 3 | `12px` | `12px` |
| `--lulu-space-4` | 间距 4 | `16px` | `16px` |
| `--lulu-z-index-dropdown` | 浮层层级 | `1000` | `1000` |

浮层会传送到最近的 `data-lulu-theme` 容器，请在该容器上覆盖变量，不能只设置在触发器上。

例如在局部容器的 `style` 中设置 `--lulu-color-border: #d0d0d5`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
