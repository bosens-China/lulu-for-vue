---
title: MessageHost 消息宿主
description: 在应用根部统一配置消息位置、时长与堆叠顺序，业务组件通过 useMessage 显示消息。
seo:
  title: Vue MessageHost 消息宿主组件
  description: LuLu UI Vue 消息宿主组件的中文用法与示例。
  keywords:
    - 消息宿主
    - Vue 反馈
---

# MessageHost 消息宿主

通常只需在 `App.vue` 根部用 `LuluMessageHost` 包裹应用内容一次；业务组件在自己的 `<script setup>` 中调用 `useMessage()`，随后使用 `message.success('保存成功')` 等方法。每个 Host 保有独立队列，也可以为局部应用配置单独的消息上下文。

## 基础用法

::: demo basic
本例用普通子组件调用 useMessage；实际应用把 Host 放在根部，业务组件无需重复包裹。
:::

手动按需引入时同时导入 `@lulu/vue/message/style.css`；自动导入 resolver 会补齐该直接依赖。

## 消息类型、时长与队列

::: demo queue
示例将默认时长设为 2.5 秒；业务组件触发四种消息，单条 duration 可覆盖默认值，duration=0 的消息使用返回句柄手动关闭。
:::

## 位置与堆叠顺序

::: demo placement
默认顶部居中，支持六种位置。连续显示多条消息，再切换位置和“最新消息排在最上方”，观察布局与消息顺序；本例消息手动关闭。
:::

`start`、`end` 对应文字方向的起点和终点。默认按到达顺序从上到下排列；底部位置下，最新消息自然靠近底边。`newOnTop=true` 时最新消息位于最上方，DOM 与视觉顺序一致；切换位置和顺序不会重新计时。

消息内容支持长链接换行。队列高度超出视口的可用空间时，消息区域可滚动查看和关闭各条消息；上下均保留 `--lulu-message-host-offset-block` 指定的边距。

## API

与命令式弹窗组合时，在应用根部将 `LuluDialogHost` 放在 `LuluMessageHost` 内。消息会进入活动弹窗的内容区，以保持可见和可操作，此时使用弹窗内布局；弹窗关闭后恢复配置的屏幕位置。两个宿主均需导入对应样式。

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `duration` | 子级消息的默认显示时间。 | `number` | `4000` |
| `label` | 消息区域的无障碍名称。 | `string` | `'消息通知'` |
| `closeLabel` | 每条消息关闭按钮的无障碍名称。 | `string` | `'关闭消息'` |
| `placement` | 消息位置，start/end 遵循文字方向。 | `MessagePlacement` | `'top'` |
| `newOnTop` | 是否将最新消息排在最上方。 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 可使用 `useMessage` 的后代内容。 | — |

Host 的 `class`、`style`、`data-lulu-theme` 等 Attributes 会应用到实际消息层，可用于单实例 Token 覆盖。

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
| `MessagePlacement` | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end'` | 消息位置。 |
| `MessageHandle` | `close(): void` | 关闭本次调用创建的消息；重复调用安全。 |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-close-color` | 关闭按钮文字颜色 | `#667085` | `#a1a1aa` |
| `--lulu-message-accent` | 普通消息强调色 | `#1668c7` | `#38bdf8` |
| `--lulu-message-background` | 消息背景 | `#ffffff` | `#09090b` |
| `--lulu-message-border` | 消息边框 | `#8b8f98` | `#62626b` |
| `--lulu-message-color` | 消息文字 | `#4c5161` | `#f4f4f5` |
| `--lulu-message-gap` | 消息间距 | `12px` | `12px` |
| `--lulu-message-host-gap` | 消息宿主间距 | `8px` | `8px` |
| `--lulu-message-host-offset-block` | 消息宿主偏移垂直方向 | `16px` | `16px` |
| `--lulu-message-host-offset-inline` | 消息宿主偏移水平方向 | `16px` | `16px` |
| `--lulu-message-max-width` | 消息最大宽度 | `420px` | `420px` |
| `--lulu-message-padding` | 消息内边距 | `12px` | `12px` |
| `--lulu-message-radius` | 消息圆角 | `4px` | `4px` |
| `--lulu-message-shadow` | 消息阴影 | `0 8px 24px rgb(15 23 42 / 16%)` | `0 8px 24px rgb(0 0 0 / 70%)` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#8b8f98` | `#62626b` |
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

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-border: #8b8f98`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
