---
title: Loading 加载
description: 加载组件用于提示当前内容正在处理。
seo:
  title: Vue Loading 加载组件
  description: LuLu UI Vue 加载组件的中文用法与示例。
  keywords:
    - 加载
    - Vue 反馈
---

# Loading 加载

## 基础用法

::: demo basic
可通过 `size` 调整图标尺寸，并用插槽修改提示文案。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `block` | 是否以块级方式排列。 | `boolean` | `false` |
| `label` | 加载提示文本。 | `string` | `'Loading'` |
| `size` | 加载图标尺寸。 | `'sm' \| 'md' \| 'lg'` | `'md'` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 加载提示的替代内容。 | — |
