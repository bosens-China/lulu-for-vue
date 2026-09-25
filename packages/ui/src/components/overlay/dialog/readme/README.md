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
| `title` | 自定义标题。 | — |
| `footer` | 自定义底部操作区。 | — |
