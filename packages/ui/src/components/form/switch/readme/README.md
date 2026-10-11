---
title: Switch 开关
description: 开关用于切换开与关两种状态。
seo:
  title: Vue Switch 开关组件
  description: LuLu UI Vue 开关组件的中文用法与示例。
  keywords:
    - 开关
    - Vue 表单
---

# Switch 开关

## 基础用法

::: demo basic
通过 `v-model` 绑定布尔状态。
:::

开关使用原生复选框保留键盘、标签和表单语义，并以轨道与滑块显示状态。聚焦后按空格切换；原生 `name`、`value` 和事件传给输入，`class`、`style` 作用于标签容器，便于覆盖整套开关 Token。

## 禁用开关

::: demo states
两种禁用状态保留当前值。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 是否打开。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 开关状态改变时触发。 | `checked: boolean` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 开关的标签内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-switch-background` | 开关背景 | `#4c5161` | `#52525b` |
| `--lulu-switch-checked-background` | 开关选中背景 | `#1668c7` | `#38bdf8` |
| `--lulu-switch-focus-shadow` | 开关聚焦阴影 | `0 0 0 3px #1668c7` | `0 0 0 3px #38bdf8` |
| `--lulu-switch-height` | 开关高度 | `24px` | `24px` |
| `--lulu-switch-thumb-color` | 开关滑块颜色 | `#ffffff` | `#ffffff` |
| `--lulu-switch-thumb-size` | 开关滑块尺寸 | `calc(24px - 4px)` | `calc(24px - 4px)` |
| `--lulu-switch-width` | 开关宽度 | `44px` | `44px` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-neutral-solid` | 默认按钮底色 | `#4c5161` | `#52525b` |
| `--lulu-color-on-neutral` | 默认按钮底色上的文字 | `#ffffff` | `#ffffff` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-inverse` | 强调底色上的文字 | `#ffffff` | `#000000` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-opacity-disabled` | 禁用态透明度 | `0.55` | `0.55` |
| `--lulu-shadow-focus` | 键盘聚焦光圈 | `0 0 0 3px #1668c7` | `0 0 0 3px #38bdf8` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |
| `--lulu-transition-duration` | 过渡时长 | `160ms` | `160ms` |
| `--lulu-transition-easing` | 过渡曲线 | `ease` | `ease` |

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #1668c7`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
