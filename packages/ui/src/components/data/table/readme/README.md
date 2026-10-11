---
title: Table 表格
description: 数据表格用于按列展示结构化数据，并可启用行选择。
seo:
  title: Vue Table 表格组件
  description: LuLu UI Vue 数据表格组件的中文用法与示例。
  keywords:
    - 数据表格
    - Vue 数据展示
---

# Table 表格

## 基础用法

::: demo basic
传入列定义、行数据和行唯一键即可渲染表格。
:::

手动按需引入时同时导入 `@lulu/vue/table/style.css`、`@lulu/vue/loading/style.css` 和 `@lulu/vue/pagination/style.css`；自动导入 resolver 会补齐这些依赖。

## 行选择

::: demo selection
设置 `selectable` 后，通过 `v-model:selectedKeys` 接收所选行键；`select` 事件适合处理单行操作。
:::

`rowKey` 必须稳定且唯一。数据请求、筛选和数据切分由使用方处理；更换 `rows` 时，请按业务需要同步清理失效的 `selectedKeys`。

## 受控分页

::: demo pagination
通过 `pagination` 设置总数和每页数量，使用 `v-model:page` 接收页码。表格始终直接展示传入的当前页 `rows`，不会再次切片；示例在使用方切分本地数据，服务端分页直接传入响应中的当前页数据即可。
:::

分页默认关闭，启用后复用 Pagination 的边界规则：单页时隐藏，超出范围的页码会归一化并触发 `update:page`。加载期间暂停分页操作。

## 加载、空态与单元格

::: demo states
首载时展示 Loading；刷新时保留已有行并显示加载遮罩，暂时禁止操作表格。加载结束且 rows 为空时才展示空态。可切换加载、空数据和状态插槽；插槽优先于文案。
:::

`#loading` 同时用于首载和刷新；自定义内容需要自行提供合适的加载提示。表格通过 `aria-busy` 标记加载状态。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columns` | 列定义；每项包含 `key`、`label` 和可选 `align`。 | `readonly TableColumn<Row>[]` | 必填 |
| `rows` | 受控的表格行数据。 | `readonly Row[]` | 必填 |
| `rowKey` | 行唯一键字段或取值函数；结果必须为字符串或数字。 | `keyof Row \| (row: Row) => string \| number` | 必填 |
| `loading` | 是否加载；已有行时保留数据并展示遮罩。 | `boolean` | `false` |
| `loadingText` | 默认加载文案；`loading` 插槽优先。 | `string` | `'加载中…'` |
| `emptyText` | 默认空态文案；`empty` 插槽优先。 | `string` | `'暂无数据'` |
| `pagination` | 关闭分页，或配置受控分页；`rows` 为当前页数据。 | `false \| TablePagination` | `false` |
| `v-model:page` | 当前页码；仅在启用分页时使用。 | `number` | `1` |
| `selectable` | 是否显示行选择框。 | `boolean` | `false` |
| `selectionLabel` | 选择列表头文案。 | `string` | `'选择'` |
| `rowSelectionLabel` | 每行选择框的可访问名称。 | `(row: Row, rowIndex: number) => string` | `选择第 N 行` |
| `v-model:selectedKeys` | 已选择行的键集合。 | `Array<string \| number>` | `[]` |

`TablePagination` 包含 `total: number`（必填总数）、`pageSize?: number`（默认 `20`）和 `disabled?: boolean`（默认 `false`）。它不负责请求或切分数据。

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:selectedKeys` | 选择状态改变时触发。 | `keys: Array<string \| number>` |
| `update:page` | 切换页码或总数变化导致页码归一化时触发。 | `page: number` |
| `select` | 单行选择状态改变时触发。 | `selection: TableSelection<Row>` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `caption` | 表格标题。 | — |
| `cell` | 自定义单元格内容。 | `{ row, rowIndex, column, value }` |
| `empty` | 空数据状态。 | — |
| `loading` | 首载加载行或刷新遮罩的内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-choice-accent` | 选择控件强调色 | `#1668c7` | `#38bdf8` |
| `--lulu-choice-size` | 选择控件尺寸 | `16px` | `16px` |
| `--lulu-table-background` | 数据表格背景 | `#ffffff` | `#09090b` |
| `--lulu-table-loading-background` | 刷新时的加载遮罩背景 | `rgb(255 255 255 / 72%)` | `rgb(9 9 11 / 80%)` |
| `--lulu-table-pagination-gap` | 表格与分页器的间距 | `12px` | `12px` |
| `--lulu-table-row-hover-background` | 数据表格行悬停背景 | `#f0f7ff` | `#18181b` |
| `--lulu-loading-color` | 加载文案颜色 | `#667085` | `#a1a1aa` |
| `--lulu-loading-duration` | 加载时长 | `700ms` | `700ms` |
| `--lulu-loading-gap` | 图标与文案间距 | `8px` | `8px` |
| `--lulu-loading-indicator-color` | 加载图标颜色 | `#1668c7` | `#38bdf8` |
| `--lulu-loading-size` | 加载图标尺寸，优先于 size 的默认尺寸 | `20px` | `20px` |
| `--lulu-loading-stroke-width` | 加载描边宽度 | `2px` | `2px` |
| `--lulu-pagination-active-background` | 分页激活背景 | `#1668c7` | `#38bdf8` |
| `--lulu-pagination-active-border` | 分页激活边框 | `#1668c7` | `#38bdf8` |
| `--lulu-pagination-active-color` | 分页激活文字颜色 | `#ffffff` | `#000000` |
| `--lulu-pagination-button-background` | 分页按钮背景 | `#ffffff` | `#09090b` |
| `--lulu-pagination-button-border` | 分页按钮边框 | `#8b8f98` | `#62626b` |
| `--lulu-pagination-button-color` | 分页按钮文字颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-pagination-button-height` | 分页按钮高度 | `32px` | `32px` |
| `--lulu-pagination-button-padding-inline` | 分页按钮内边距水平方向 | `8px` | `8px` |
| `--lulu-pagination-button-radius` | 分页按钮圆角 | `4px` | `4px` |
| `--lulu-pagination-gap` | 分页间距 | `4px` | `4px` |
| `--lulu-table-border` | 表格边框与分隔线 | `#ededef` | `#27272a` |
| `--lulu-table-caption-color` | 表格标题文字颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-table-caption-font-size` | 表格标题字体尺寸 | `16px` | `16px` |
| `--lulu-table-caption-padding` | 表格标题内边距 | `12px` | `12px` |
| `--lulu-table-cell-padding-block` | 单元格块方向内边距 | `8px` | `8px` |
| `--lulu-table-cell-padding-inline` | 单元格行方向内边距 | `12px` | `12px` |
| `--lulu-table-color` | 表格文字 | `#4c5161` | `#f4f4f5` |
| `--lulu-table-empty-color` | 表格空态文字颜色 | `#667085` | `#a1a1aa` |
| `--lulu-table-empty-padding-block` | 表格空态内边距垂直方向 | `calc(16px * 2)` | `calc(16px * 2)` |
| `--lulu-table-header-background` | 表头背景 | `#f7f9fa` | `#121215` |
| `--lulu-table-radius` | 表格圆角 | `4px` | `4px` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#8b8f98` | `#62626b` |
| `--lulu-color-border-subtle` | 分隔线与弱边框 | `#ededef` | `#27272a` |
| `--lulu-color-loading-overlay` | 文字颜色加载遮罩 | `rgb(255 255 255 / 72%)` | `rgb(9 9 11 / 80%)` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-primary-solid` | 主要操作底色，默认继承主色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-surface-hover` | 悬停背景 | `#f0f7ff` | `#18181b` |
| `--lulu-color-surface-subtle` | 弱背景、表头与禁用底色 | `#f7f9fa` | `#121215` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-inverse` | 强调底色上的文字 | `#ffffff` | `#000000` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#667085` | `#a1a1aa` |
| `--lulu-control-height-sm` | 紧凑控件高度 | `32px` | `32px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-font-size-lg` | 标题文字大小 | `16px` | `16px` |
| `--lulu-font-weight-strong` | 字体字重强调 | `600` | `600` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-opacity-disabled` | 禁用态透明度 | `0.55` | `0.55` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-radius-sm` | 小圆角 | `4px` | `4px` |
| `--lulu-space-1` | 最小间距 | `4px` | `4px` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |
| `--lulu-space-4` | 大间距 | `16px` | `16px` |

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-border-subtle: #ededef`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
