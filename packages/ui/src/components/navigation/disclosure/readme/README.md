---
title: Disclosure 折叠面板
description: 折叠面板用于按需显示一段补充内容。
seo:
  title: Vue Disclosure 折叠面板组件
  description: LuLu UI Vue 折叠面板组件的中文用法与示例。
  keywords:
    - 折叠面板
    - Vue 导航
---

# Disclosure 折叠面板

## 基础用法

::: demo basic
使用 `v-model:open` 控制内容是否展开。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 面板标题。 | `string` | 必填 |
| `v-model:open` | 是否展开。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:open` | 展开状态改变时触发。 | `open: boolean` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 面板内容。 | — |
