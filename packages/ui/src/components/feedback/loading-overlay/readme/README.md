---
title: LoadingOverlay 加载遮罩
description: 加载遮罩用于在内容区域上方提示正在处理。
seo:
  title: Vue LoadingOverlay 加载遮罩组件
  description: LuLu UI Vue 加载遮罩组件的中文用法与示例。
  keywords:
    - 加载遮罩
    - Vue 反馈
---

# LoadingOverlay 加载遮罩

## 基础用法

::: demo basic
通过 `v-model:open` 控制遮罩显示状态。
:::

手动按需引入时同时导入 `@lulu/vue/loading/style.css`；自动导入 resolver 会补齐该直接依赖。

## 自定义遮罩内容

::: demo slot
default 插槽定制遮罩内文案，message 仍提供加载指示器的可访问名称；控制按钮放在遮罩外。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 是否显示遮罩。 | `boolean` | `false` |
| `message` | 加载提示文本。 | `string` | `'加载中'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:open` | 遮罩状态改变时触发。 | `open: boolean` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 遮罩中的自定义内容。 | — |

## CSS Tokens

遮罩背景可单独覆盖 `--lulu-color-loading-overlay`，浅色默认 `rgb(255 255 255 / 72%)`，深色默认 `rgb(9 9 11 / 80%)`。

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-loading-color` | 加载文案颜色 | `#667085` | `#a1a1aa` |
| `--lulu-loading-duration` | 加载时长 | `700ms` | `700ms` |
| `--lulu-loading-gap` | 图标与文案间距 | `8px` | `8px` |
| `--lulu-loading-indicator-color` | 加载图标颜色 | `#1668c7` | `#38bdf8` |
| `--lulu-loading-overlay-background` | 遮罩背景 | `rgb(255 255 255 / 72%)` | `rgb(9 9 11 / 80%)` |
| `--lulu-loading-overlay-z-index` | 加载遮罩层叠层级 | `1` | `1` |
| `--lulu-loading-size` | 加载图标尺寸，优先于 size 的默认尺寸 | `20px` | `20px` |
| `--lulu-loading-stroke-width` | 加载描边宽度 | `2px` | `2px` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-loading-overlay` | 文字颜色加载遮罩 | `rgb(255 255 255 / 72%)` | `rgb(9 9 11 / 80%)` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#667085` | `#a1a1aa` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #1668c7`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
