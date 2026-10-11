---
title: ColorPicker 颜色选择器
description: 颜色选择器用于选择和编辑颜色值。
seo:
  title: Vue ColorPicker 颜色选择器组件
  description: LuLu UI Vue 颜色选择器组件的中文用法与示例。
  keywords:
    - 颜色选择器
    - Vue 表单
---

# ColorPicker 颜色选择器

## 基础用法

::: demo basic
颜色以字符串形式通过 `v-model` 输出。
:::

## 透明度与禁用

::: demo states
alpha 开启透明度滑块；更改颜色或透明度后返回八位十六进制颜色。
:::

设置原生 `name` 后，组件通过隐藏字段提交完整十六进制颜色，包含透明模式的八位值；禁用时不提交。`id` 和原生事件作用于颜色输入，`class`、`style` 作用于整体容器，局部 CSS Token 可同时传给颜色输入和透明度滑块。支持三位、六位和八位十六进制输入，其他格式按黑色显示。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前颜色值。 | `string` | `'#000000'` |
| `alpha` | 是否允许编辑透明度。 | `boolean` | `false` |
| `alphaLabel` | 透明度滑块的可访问名称。 | `string` | `'透明度'` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `label` | 颜色输入的可访问名称。 | `string` | `'颜色'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 颜色值改变时触发。 | `value: string` |
| `change` | 原生颜色输入或透明度滑块确认更改时触发。 | `value: string` |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-picker-alpha-width` | 文字颜色选择器透明度滑块宽度 | `120px` | `120px` |
| `--lulu-range-accent` | 范围输入强调色 | `#1668c7` | `#38bdf8` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#1668c7` | `#38bdf8` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-opacity-disabled` | 禁用态透明度 | `0.55` | `0.55` |
| `--lulu-space-1` | 最小间距 | `4px` | `4px` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #1668c7`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
