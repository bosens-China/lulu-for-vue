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

手动按需引入时同时导入 `@lulu/vue/message/style.css`；自动导入 resolver 会补齐该直接依赖。

## 消息类型、时长与队列

::: demo queue
示例将宿主默认时长设为 2.5 秒；子组件通过 useMessage 触发四种消息，单条 duration 可覆盖默认值，duration=0 的消息使用返回句柄手动关闭。全部代码包含在本例源码中。
:::

## API

与命令式弹窗组合时，将 `LuluDialogHost` 放在 `LuluMessageHost` 内。消息会进入活动弹窗以保持可见和可操作，弹窗关闭后回到原位置。两个宿主均需导入对应样式。

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `duration` | 子级消息的默认显示时间。 | `number` | `4000` |
| `label` | 消息区域的无障碍名称。 | `string` | `'消息通知'` |
| `closeLabel` | 每条消息关闭按钮的无障碍名称。 | `string` | `'关闭消息'` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 可使用 `useMessage` 的后代内容。 | — |

### useMessage

`useMessage()` 必须在 `LuluMessageHost` 的后代组件 `setup` 中调用。可从 `@lulu/vue/use-message` 具名导入；每个显示方法都返回可单独关闭该消息的句柄。

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `show` | `message: string, options?: MessageConfig` | `MessageHandle` | 显示消息，可通过 `type` 指定语义类型。 |
| `success` | `message: string, options?: MessageOptions` | `MessageHandle` | 显示成功消息。 |
| `error` | `message: string, options?: MessageOptions` | `MessageHandle` | 显示错误消息。 |
| `info` | `message: string, options?: MessageOptions` | `MessageHandle` | 显示普通消息。 |
| `warning` | `message: string, options?: MessageOptions` | `MessageHandle` | 显示警告消息。 |

| 类型 | 字段或定义 | 说明 |
| --- | --- | --- |
| `MessageOptions` | `duration?: number` | 覆盖宿主默认时长；非正数表示不自动关闭。 |
| `MessageConfig` | `MessageOptions`、`type?: MessageType` | `show` 的完整选项。 |
| `MessageType` | `'success' \| 'error' \| 'info' \| 'warning'` | 消息语义类型。 |
| `MessageHandle` | `close(): void` | 关闭本次调用创建的消息；重复调用安全。 |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#d0d0d5` | `#3f3f46` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#667085` | `#a1a1aa` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-shadow-overlay` | 浮层阴影 | `0 8px 24px rgb(15 23 42 / 16%)` | `0 8px 24px rgb(0 0 0 / 70%)` |
| `--lulu-space-1` | 最小间距 | `4px` | `4px` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |
| `--lulu-space-4` | 大间距 | `16px` | `16px` |
| `--lulu-z-index-message` | 消息层级 | `1200` | `1200` |

例如在局部容器的 `style` 中设置 `--lulu-color-border: #d0d0d5`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
