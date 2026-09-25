---
title: Progress 进度条
description: 进度条用于展示任务的完成比例。
seo:
  title: Vue Progress 进度条组件
  description: LuLu UI Vue 进度条组件的中文用法与示例。
  keywords:
    - 进度条
    - Vue 反馈
---

# Progress 进度条

## 基础用法

::: demo basic
将 `value` 与 `max` 组合为明确的进度比例。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 当前进度。 | `number` | — |
| `max` | 进度上限。 | `number` | `100` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 进度文本的替代内容。 | — |
