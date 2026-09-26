---
title: Popover 气泡卡片
description: 气泡卡片在触发元素附近展示补充信息或操作。
seo:
  title: Vue Popover 气泡卡片组件
  description: LuLu UI Vue 气泡卡片组件的中文用法与示例。
  keywords:
    - 气泡卡片
    - Vue 浮层
---

# Popover 气泡卡片

## 基础用法

::: demo basic
用 `trigger` 插槽定义触发内容，默认插槽定义卡片内容。
:::

浮层中存在按钮或输入时，打开后聚焦第一个可操作元素；按 Escape 关闭会把焦点归还触发按钮。点击浮层外关闭不会抢走外部目标的焦点。

## 位置与关闭策略

::: demo policy
可尝试全部 12 个位置；视口边缘会约束实际位置。关闭外部/Escape 策略时，仍可通过气泡内按钮退出。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 是否显示浮层。 | `boolean` | `false` |
| `placement` | 浮层相对触发器的位置。 | `FloatingPlacement` | `'bottom-start'` |
| `offset` | 浮层与触发器的间距。 | `number` | `8` |
| `closeOnOutside` | 点击外部是否关闭。 | `boolean` | `true` |
| `closeOnEscape` | 按下 Escape 是否关闭。 | `boolean` | `true` |
| `disabled` | 是否禁用触发器。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:open` | 显示状态改变时触发。 | `open: boolean` |
| `open` | 浮层展开时触发。 | — |
| `close` | 浮层关闭时触发。 | — |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `trigger` | 触发按钮内容。 | — |
| `default` | 浮层内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#d0d0d5` | `#3f3f46` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-shadow-overlay` | 浮层阴影 | `0 8px 24px rgb(15 23 42 / 16%)` | `0 8px 24px rgb(0 0 0 / 70%)` |
| `--lulu-space-1` | 最小间距 | `4px` | `4px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |
| `--lulu-space-4` | 大间距 | `16px` | `16px` |
| `--lulu-z-index-popup` | 气泡浮层层级 | `1000` | `1000` |

浮层会传送到最近的 `data-lulu-theme` 容器，请在该容器上覆盖变量，不能只设置在触发器上。

例如在局部容器的 `style` 中设置 `--lulu-color-border: #d0d0d5`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
