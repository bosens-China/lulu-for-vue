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
