---
title: RangeSlider 范围滑块
description: 范围滑块通过同一轨道上的两个滑块选择有序数值区间。
seo:
  title: Vue RangeSlider 范围滑块组件
  description: LuLu UI Vue 范围滑块的表单、键盘和样式定制用法。
  keywords:
    - 范围滑块
    - Vue 表单
---

# RangeSlider 范围滑块

`LuluRangeSlider` 是 `<LuluSlider range>` 的兼容入口，共享同轨道双滑块实现；现有元组模型及两端字段名、标签继续有效。

## 基础用法

::: demo basic
通过长度为二的数组绑定区间。点击轨道移动较近的滑块，两端不会交叉。
:::

需要原生表单提交时，分别设置 `startName` 与 `endName`。`id` 关联开始输入，`aria-describedby`、`aria-errormessage`、`aria-invalid` 传给两端；原生 `name` 是 `startName` 的回退。`class`、`style` 作用于整体容器，可覆盖共享 Slider Token。

## 边界与状态

::: demo states
观察动态边界、步长、禁用和错误状态。Tab 可依次聚焦两端，方向键调整一个步长，PageUp/PageDown 调整十个步长，Home/End 到达当前端可到达的边界。
:::

非有限 `min`/`max` 分别回退到 `0`/`100`；倒序边界收敛为单点，非正或非有限 `step` 回退到 `1`。外部模型规范化展示，交互前不改写父模型；交互时按步长取值并回传有序元组。

## API

### Props / Models

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 区间起止值。 | `[number, number]` | 必填 |
| `min` | 最小值。 | `number` | `0` |
| `max` | 最大值。 | `number` | `100` |
| `step` | 步长。 | `number` | `1` |
| `startLabel` | 开始滑块的可访问名称。 | `string` | `'最小值'` |
| `endLabel` | 结束滑块的可访问名称。 | `string` | `'最大值'` |
| `startName` | 开始字段名。 | `string` | — |
| `endName` | 结束字段名。 | `string` | — |
| `disabled` | 禁用，且不参加原生表单提交。 | `boolean` | `false` |
| `invalid` | 显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 区间改变。 | `[number, number]` |
| `input` | 开始输入的原生输入通知。 | `Event` |
| `change` | 开始输入的一次操作结束。 | `Event` |

原生 Attributes 和事件按原有契约传给开始输入；两端各有可访问名称与边界。组件没有图形插槽。

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-range-accent` | 范围输入强调色 | `#1668c7` | `#38bdf8` |
| `--lulu-range-invalid-accent` | 范围输入错误态强调色 | `#c53030` | `#f87171` |
| `--lulu-range-slider-width` | 范围滑块整体宽度 | `100%` | `100%` |
| `--lulu-slider-fill-background` | 滑块已选轨道颜色 | `#1668c7` | `#38bdf8` |
| `--lulu-slider-focus-shadow` | 滑块键盘焦点光圈 | `0 0 0 3px #1668c7` | `0 0 0 3px #38bdf8` |
| `--lulu-slider-height` | 滑块可交互区域高度 | `40px` | `40px` |
| `--lulu-slider-thumb-background` | 滑块手柄背景 | `#ffffff` | `#09090b` |
| `--lulu-slider-thumb-border` | 滑块手柄边框颜色 | `#1668c7` | `#38bdf8` |
| `--lulu-slider-thumb-border-width` | 滑块手柄边框宽度 | `2px` | `2px` |
| `--lulu-slider-thumb-hover-background` | 滑块手柄悬停背景 | `#f7f9fa` | `#121215` |
| `--lulu-slider-thumb-radius` | 滑块手柄圆角 | `50%` | `50%` |
| `--lulu-slider-thumb-shadow` | 滑块手柄阴影 | `none` | `none` |
| `--lulu-slider-thumb-size` | 滑块手柄尺寸 | `16px` | `16px` |
| `--lulu-slider-track-background` | 滑块未选轨道背景 | `#ededef` | `#27272a` |
| `--lulu-slider-track-height` | 滑块轨道高度 | `4px` | `4px` |
| `--lulu-slider-track-radius` | 滑块轨道圆角 | `4px` | `4px` |
| `--lulu-slider-width` | 滑块整体宽度 | `100%` | `100%` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border-subtle` | 分隔线与弱边框 | `#ededef` | `#27272a` |
| `--lulu-color-danger` | 危险或错误状态 | `#c53030` | `#f87171` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-surface-subtle` | 弱背景、表头与禁用底色 | `#f7f9fa` | `#121215` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-opacity-disabled` | 禁用态透明度 | `0.55` | `0.55` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-shadow-focus` | 键盘聚焦光圈 | `0 0 0 3px #1668c7` | `0 0 0 3px #38bdf8` |

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #1668c7`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
