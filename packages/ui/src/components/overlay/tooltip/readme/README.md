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
