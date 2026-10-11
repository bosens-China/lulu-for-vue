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

## 尺寸与布局

::: demo sizes
比较 sm、md、lg，并用 block 和默认插槽呈现块级提示。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `block` | 是否以块级方式排列。 | `boolean` | `false` |
| `label` | 加载提示文本。 | `string` | `'加载中'` |
| `size` | 加载图标尺寸；兼容旧别名 sm、md、lg。 | `'small' \| 'default' \| 'large' \| 'sm' \| 'md' \| 'lg'` | `'default'` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 加载提示的替代内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-loading-color` | 加载文案颜色 | `#667085` | `#a1a1aa` |
| `--lulu-loading-duration` | 加载时长 | `700ms` | `700ms` |
| `--lulu-loading-gap` | 图标与文案间距 | `8px` | `8px` |
| `--lulu-loading-indicator-color` | 加载图标颜色 | `#1668c7` | `#38bdf8` |
| `--lulu-loading-size` | 加载图标尺寸，优先于 size 的默认尺寸 | `20px` | `20px` |
| `--lulu-loading-stroke-width` | 加载描边宽度 | `2px` | `2px` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#667085` | `#a1a1aa` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #1668c7`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。

`--lulu-loading-size` 优先于 size 所选默认尺寸，可在祖先容器统一覆盖，也可在组件上单独设置。
