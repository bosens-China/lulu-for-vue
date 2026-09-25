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
