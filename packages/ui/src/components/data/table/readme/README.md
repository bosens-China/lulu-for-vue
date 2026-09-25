---
title: Table 表格
description: 表格组件提供原生表格结构的样式与插槽边界。
seo:
  title: Vue Table 表格组件
  description: LuLu UI Vue 表格组件的中文用法与示例。
  keywords:
    - 表格
    - Vue 数据展示
---

# Table 表格

## 基础用法

::: demo basic
在默认插槽中使用原生表格内容，按需使用表头和表尾插槽。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `empty` | 是否显示空数据状态。 | `boolean` | `false` |
| `colspan` | 空状态单元格跨列数。 | `number` | `1` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `caption` | 表格标题。 | — |
| `head` | 表头内容。 | — |
| `body` | 表体内容。 | — |
| `foot` | 表脚内容。 | — |
| `empty` | 空数据状态。 | — |
