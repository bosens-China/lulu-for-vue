---
title: Slider 滑块
description: 滑块用于选择数值，支持同一轨道上的单滑块和双滑块范围。
seo:
  title: Vue Slider 滑块组件
  description: LuLu UI Vue 滑块的单值、范围、键盘和原生表单用法。
  keywords:
    - 滑块
    - 范围滑块
    - Vue 表单
---

# Slider 滑块

## 基础用法

::: demo basic
通过 `v-model` 绑定当前数值。
:::

## 双滑块范围

::: demo range
设置 `range` 后，模型为 `[start, end]`，两个滑块共用一条轨道。点击轨道会移动较近的滑块，两端不会交叉。
:::

`LuluRangeSlider` 是范围模式的兼容入口，与 `<LuluSlider range>` 使用相同实现。单值模型是 `number`，范围模型是 `[number, number]`，不要在切换 `range` 时沿用不匹配的模型。

## 范围与状态

::: demo states
通过方向键调整一个步长，PageUp/PageDown 调整十个步长，Home/End 移到当前滑块可到达的边界；Tab 可依次聚焦两个滑块。
:::

`min`、`max` 为非有限数时分别回退到 `0`、`100`；`max < min` 时按单点展示。非有限或非正数 `step` 回退到 `1`。外部值仅规范化展示，不在渲染时改写模型；交互时按以 `min` 为起点的步长取值，回传范围始终有序。

## 表单与事件

`id`、原生属性及事件绑定实际输入；`class`、`style` 作用于整体容器。单值模式直接使用 `name`；范围模式分别设置 `startName`、`endName`，原生 `name` 作为开始字段的回退。两端共享错误描述关联。可直接放在 `LuluFormItem` 中，也可显式传入关联属性。

指针和键盘更新都会通知原生 `input`、`change` 监听器，参数保持原生 `Event`；拖动期间触发 `input`，结束时触发 `change`。禁用控件不能改值，也不参加原生表单提交。

## API

### Props / Models

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 单值或有序区间，类型由 `range` 决定。 | `number` / `[number, number]` | 必填 |
| `range` | 启用同轨道双滑块。 | `boolean` | `false` |
| `min` | 最小值。 | `number` | `0` |
| `max` | 最大值。 | `number` | `100` |
| `step` | 步长。 | `number` | `1` |
| `startLabel` | 范围开始滑块的可访问名称。 | `string` | `'最小值'` |
| `endLabel` | 范围结束滑块的可访问名称。 | `string` | `'最大值'` |
| `startName` | 范围开始字段名。 | `string` | — |
| `endName` | 范围结束字段名。 | `string` | — |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 值改变。 | `number` / `[number, number]` |
| `input` | 原生输入通知，拖动期间连续触发。 | `Event` |
| `change` | 一次指针或键盘操作结束。 | `Event` |

组件没有图形插槽；轨道、滑块大小与颜色通过 CSS Token 定制。

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-range-accent` | 范围输入强调色 | `#1668c7` | `#38bdf8` |
| `--lulu-range-invalid-accent` | 范围输入错误态强调色 | `#c53030` | `#f87171` |
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
