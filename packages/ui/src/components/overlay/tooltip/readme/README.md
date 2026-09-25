---
title: Tooltip 文字提示
description: 文字提示在悬停、聚焦或点击时展示简短辅助信息。
seo:
  title: Vue Tooltip 文字提示组件
  description: LuLu UI Vue 文字提示组件的中文用法与示例。
  keywords:
    - 文字提示
    - Vue 浮层
---

# Tooltip 文字提示

## 基础用法

::: demo basic
使用 `trigger` 插槽提供触发元素，默认插槽填写提示内容。
:::

交互式触发元素请用插槽提供原生按钮或链接，并将插槽的 `triggerProps` 绑定到该元素。组件不会额外增加一个 Tab 停靠点。

## 触发方式

::: demo triggers
悬停、焦点、点击与手动控制分别演示；交互元素统一绑定 triggerProps。
:::

## 位置、间距与禁用

::: demo placement
从 12 个位置中选择；disabled 阻止展示提示，触发按钮本身仍可聚焦。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 手动控制提示显示状态。 | `boolean` | `false` |
| `trigger` | 触发方式。 | `'click' \| 'focus' \| 'hover' \| 'manual'` | `'hover'` |
| `placement` | 提示相对触发器的位置。 | `FloatingPlacement` | `'top'` |
| `offset` | 提示与触发器的间距。 | `number` | `6` |
| `disabled` | 是否禁用提示。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:open` | 显示状态改变时触发。 | `open: boolean` |
| `open` | 提示显示时触发。 | — |
| `close` | 提示隐藏时触发。 | — |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `trigger` | 触发元素；交互式元素绑定 `triggerProps`。 | `{ triggerProps }` |
| `default` | 提示内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-inverse` | 强调底色上的文字 | `#ffffff` | `#000000` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-font-size-sm` | 辅助文字大小 | `12px` | `12px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-radius-sm` | 小圆角 | `4px` | `4px` |
| `--lulu-shadow-focus` | 键盘聚焦光圈 | `0 0 0 3px rgb(42 128 235 / 24%)` | `0 0 0 3px rgb(56 189 248 / 35%)` |
| `--lulu-space-2` | 间距 2 | `8px` | `8px` |
| `--lulu-space-3` | 间距 3 | `12px` | `12px` |
| `--lulu-space-4` | 间距 4 | `16px` | `16px` |
| `--lulu-z-index-dropdown` | 浮层层级 | `1000` | `1000` |

浮层会传送到最近的 `data-lulu-theme` 容器，请在该容器上覆盖变量，不能只设置在触发器上。

例如在局部容器的 `style` 中设置 `--lulu-color-text: #4c5161`。全局配色与导出入口见顶部“主题调色盘”和“主题定制”指南。
