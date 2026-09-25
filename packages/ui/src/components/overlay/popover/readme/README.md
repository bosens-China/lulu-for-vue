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
