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

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `duration` | 子级消息的默认显示时间。 | `number` | `4000` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 可使用 `useMessage` 的后代内容。 | — |
