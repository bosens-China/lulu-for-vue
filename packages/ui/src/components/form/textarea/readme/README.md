---
title: Textarea 文本域
description: 文本域用于输入多行文本内容。
seo:
  title: Vue Textarea 文本域组件
  description: LuLu UI Vue 文本域组件的中文用法与示例。
  keywords:
    - 文本域
    - Vue 表单
---

# Textarea 文本域

## 基础用法

::: demo basic
使用 `v-model` 绑定多行文本。
:::

## 文本域状态

::: demo states
对比可编辑、禁用、只读和错误状态。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 输入值。 | `string` | — |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `readonly` | 是否只读。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 输入值改变时触发。 | `value: string` |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-control-background` | 输入控件背景 | `#ffffff` | `#09090b` |
| `--lulu-control-border` | 输入控件边框 | `#8b8f98` | `#62626b` |
| `--lulu-control-color` | 输入控件文字颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-control-disabled-background` | 输入控件禁用背景 | `#f7f9fa` | `#121215` |
| `--lulu-control-disabled-color` | 输入控件禁用文字颜色 | `#667085` | `#a1a1aa` |
| `--lulu-control-invalid-border` | 输入控件错误态边框 | `#c53030` | `#f87171` |
| `--lulu-control-padding-inline` | 输入控件内边距水平方向 | `12px` | `12px` |
| `--lulu-control-placeholder-color` | 输入控件占位文案文字颜色 | `#667085` | `#a1a1aa` |
| `--lulu-control-radius` | 输入控件圆角 | `4px` | `4px` |
| `--lulu-textarea-min-height` | 多行输入最小高度 | `calc(40px * 2)` | `calc(40px * 2)` |
| `--lulu-textarea-resize` | 多行输入缩放方向 | `vertical` | `vertical` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#8b8f98` | `#62626b` |
| `--lulu-color-danger` | 危险或错误状态 | `#c53030` | `#f87171` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-surface-subtle` | 弱背景、表头与禁用底色 | `#f7f9fa` | `#121215` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#667085` | `#a1a1aa` |
| `--lulu-control-focus-shadow` | 输入控件聚焦阴影 | `0 0 0 3px #1668c7` | `0 0 0 3px #38bdf8` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-shadow-focus` | 键盘聚焦光圈 | `0 0 0 3px #1668c7` | `0 0 0 3px #38bdf8` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |
| `--lulu-transition-duration` | 过渡时长 | `160ms` | `160ms` |
| `--lulu-transition-easing` | 过渡曲线 | `ease` | `ease` |

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-border: #8b8f98`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
