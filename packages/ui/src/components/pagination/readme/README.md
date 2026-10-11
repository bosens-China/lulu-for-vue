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

Pagination 只提供导航，不请求或切分数据。Table 的 `pagination` 配置可直接复用该导航，独立使用时由业务组件根据页码更新当前页数据。

## 禁用与分页边界

::: demo states
首页不能向前、末页不能向后；总页数不超过 1 时隐藏分页导航，当前页归一化为 1。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前页码。 | `number` | 必填 |
| `total` | 数据总数。 | `number` | 必填 |
| `pageSize` | 每页数量。 | `number` | `20` |
| `disabled` | 是否禁用分页操作。 | `boolean` | `false` |
| `ariaLabel` | 分页导航的可访问名称。 | `string` | `'分页'` |
| `previousLabel` | 上一页按钮的可访问名称。 | `string` | `'上一页'` |
| `nextLabel` | 下一页按钮的可访问名称。 | `string` | `'下一页'` |
| `pageLabel` | 页码按钮的可访问名称。 | `(page: number) => string` | `第 N 页` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 页码改变时触发。 | `page: number` |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
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

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#8b8f98` | `#62626b` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-primary-solid` | 主要操作底色，默认继承主色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-inverse` | 强调底色上的文字 | `#ffffff` | `#000000` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#667085` | `#a1a1aa` |
| `--lulu-control-height-sm` | 紧凑控件高度 | `32px` | `32px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-opacity-disabled` | 禁用态透明度 | `0.55` | `0.55` |
| `--lulu-radius-sm` | 小圆角 | `4px` | `4px` |
| `--lulu-space-1` | 最小间距 | `4px` | `4px` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-border: #8b8f98`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
