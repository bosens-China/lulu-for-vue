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

## 禁用与分页边界

::: demo states
首页不能向前、末页不能向后；total=0 时保留第 1 页，两个方向均不可用。
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

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#d0d0d5` | `#3f3f46` |
| `--lulu-color-primary-solid` | 主要操作底色 | `#0057c3` | `#38bdf8` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-inverse` | 强调底色上的文字 | `#ffffff` | `#000000` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#a2a9b6` | `#a1a1aa` |
| `--lulu-control-height-sm` | 紧凑控件高度 | `32px` | `32px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius-sm` | 小圆角 | `4px` | `4px` |
| `--lulu-space-1` | 间距 1 | `4px` | `4px` |
| `--lulu-space-2` | 间距 2 | `8px` | `8px` |

例如在局部容器的 `style` 中设置 `--lulu-color-border: #d0d0d5`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
