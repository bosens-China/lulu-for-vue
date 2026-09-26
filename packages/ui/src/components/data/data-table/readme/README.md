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

## 加载、空态与单元格

::: demo states
可组合切换加载、空数据和状态插槽，观察插槽优先于文案。rowKey 使用稳定函数；三列分别按 start/center/end 对齐。
:::

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

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border-subtle` | 分隔线与弱边框 | `#ededef` | `#27272a` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#2a80eb` | `#38bdf8` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-surface-hover` | 悬停背景 | `#f0f7ff` | `#18181b` |
| `--lulu-color-surface-subtle` | 弱背景、表头与禁用底色 | `#f7f9fa` | `#121215` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#a2a9b6` | `#a1a1aa` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-font-size-lg` | 标题文字大小 | `16px` | `16px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-space-2` | 间距 2 | `8px` | `8px` |
| `--lulu-space-3` | 间距 3 | `12px` | `12px` |
| `--lulu-space-4` | 间距 4 | `16px` | `16px` |

例如在局部容器的 `style` 中设置 `--lulu-color-border-subtle: #ededef`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
