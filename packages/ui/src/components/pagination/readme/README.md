---
title: Pagination 分页
description: 分页组件用于在大量数据中切换当前页。
seo:
  title: Vue Pagination 分页组件
  description: LuLu UI Vue 分页组件的中文用法与示例。
  keywords:
    - 分页
    - Vue 数据展示
---

# Pagination 分页

## 基础用法

::: demo basic
通过 `v-model` 绑定当前页，并以总数与每页数量计算页码。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前页码。 | `number` | 必填 |
| `total` | 数据总数。 | `number` | 必填 |
| `pageSize` | 每页数量。 | `number` | `20` |
| `disabled` | 是否禁用分页操作。 | `boolean` | `false` |
| `ariaLabel` | 分页导航的可访问名称。 | `string` | `'Pagination'` |
| `previousLabel` | 上一页按钮的可访问名称。 | `string` | `'Previous page'` |
| `nextLabel` | 下一页按钮的可访问名称。 | `string` | `'Next page'` |
| `pageLabel` | 页码按钮的可访问名称。 | `(page: number) => string` | `Page N` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 页码改变时触发。 | `page: number` |
