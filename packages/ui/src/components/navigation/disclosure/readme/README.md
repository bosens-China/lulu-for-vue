---
title: Disclosure 折叠面板
description: 折叠面板用于按需显示一段补充内容。
seo:
  title: Vue Disclosure 折叠面板组件
  description: LuLu UI Vue 折叠面板组件的中文用法与示例。
  keywords:
    - 折叠面板
    - Vue 导航
---

# Disclosure 折叠面板

## 基础用法

::: demo basic
使用 `v-model:open` 控制内容是否展开。
:::

## 自定义标题

::: demo summary
summary 插槽覆盖标题文字；原生 summary 继续承担点击和键盘展开行为，避免在其内嵌套按钮。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 面板标题。 | `string` | 必填 |
| `v-model:open` | 是否展开。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:open` | 展开状态改变时触发。 | `open: boolean` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 面板内容。 | — |
| `summary` | 自定义折叠标题。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-disclosure-border` | 折叠面板边框 | `#ededef` | `#27272a` |
| `--lulu-disclosure-color` | 折叠面板文字颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-disclosure-content-padding` | 折叠面板内容内边距 | `12px` | `12px` |
| `--lulu-disclosure-radius` | 折叠面板圆角 | `4px` | `4px` |
| `--lulu-disclosure-summary-padding` | 折叠面板标题内边距 | `12px` | `12px` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border-subtle` | 分隔线与弱边框 | `#ededef` | `#27272a` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-font-weight-strong` | 字体字重强调 | `600` | `600` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-border-subtle: #ededef`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
