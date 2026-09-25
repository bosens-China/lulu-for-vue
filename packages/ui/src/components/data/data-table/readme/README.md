---
title: DataTable 数据表格
description: 数据表格用于按列展示结构化数据，并可启用行选择。
seo:
  title: Vue DataTable 数据表格组件
  description: LuLu UI Vue 数据表格组件的中文用法与示例。
  keywords:
    - 数据表格
    - Vue 数据展示
---

# DataTable 数据表格

## 基础用法

::: demo basic
传入列定义、行数据和行唯一键即可渲染表格。
:::

## 行选择

::: demo selection
设置 `selectable` 后，通过 `v-model:selectedKeys` 接收所选行键；`select` 事件适合处理单行操作。
:::

`rowKey` 必须稳定且唯一。数据请求、筛选和分页由使用方处理；更换 `rows` 时，请按业务需要同步清理失效的 `selectedKeys`。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columns` | 列定义；每项包含 `key`、`label` 和可选 `align`。 | `readonly DataTableColumn<Row>[]` | 必填 |
| `rows` | 受控的表格行数据。 | `readonly Row[]` | 必填 |
| `rowKey` | 行唯一键字段或取值函数；结果必须为字符串或数字。 | `keyof Row \| (row: Row) => string \| number` | 必填 |
| `loading` | 是否展示加载状态。 | `boolean` | `false` |
| `loadingText` | 默认加载文案；`loading` 插槽优先。 | `string` | `'Loading…'` |
| `emptyText` | 默认空态文案；`empty` 插槽优先。 | `string` | `'No data'` |
| `selectable` | 是否显示行选择框。 | `boolean` | `false` |
| `selectionLabel` | 选择列表头文案。 | `string` | `'Select'` |
| `rowSelectionLabel` | 每行选择框的可访问名称。 | `(row: Row, rowIndex: number) => string` | `Select row N` |
| `v-model:selectedKeys` | 已选择行的键集合。 | `Array<string \| number>` | `[]` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:selectedKeys` | 选择状态改变时触发。 | `keys: Array<string \| number>` |
| `select` | 单行选择状态改变时触发。 | `selection: DataTableSelection<Row>` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `caption` | 表格标题。 | — |
| `cell` | 自定义单元格内容。 | `{ row, rowIndex, column, value }` |
| `empty` | 空数据状态。 | — |
| `loading` | 加载状态。 | — |
