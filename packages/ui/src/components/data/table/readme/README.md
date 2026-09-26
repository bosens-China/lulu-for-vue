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

## 空态、表体与表尾

::: demo slots
empty=true 时以空态替代表体；colspan 应与实际列数一致。body 可替代默认插槽，foot 放置合计。
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
| `default` | 未提供 body 插槽时的表体内容。 | — |
| `foot` | 表脚内容。 | — |
| `empty` | 空数据状态。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border-subtle` | 分隔线与弱边框 | `#ededef` | `#27272a` |
| `--lulu-color-surface-subtle` | 弱背景、表头与禁用底色 | `#f7f9fa` | `#121215` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#a2a9b6` | `#a1a1aa` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-font-size-lg` | 标题文字大小 | `16px` | `16px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |
| `--lulu-space-4` | 大间距 | `16px` | `16px` |

例如在局部容器的 `style` 中设置 `--lulu-color-border-subtle: #ededef`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
