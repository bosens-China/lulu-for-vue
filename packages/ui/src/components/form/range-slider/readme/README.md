---
title: RangeSlider 范围滑块
description: 范围滑块用于选择数值区间。
seo:
  title: Vue RangeSlider 范围滑块组件
  description: LuLu UI Vue 范围滑块组件的中文用法与示例。
  keywords:
    - 范围滑块
    - Vue 表单
---

# RangeSlider 范围滑块

## 基础用法

::: demo basic
通过长度为二的数组绑定区间起止值。
:::

如需原生表单提交，分别设置 `startName` 与 `endName`。两个滑块各自提交数值，也会共同接收外部的 `aria-describedby`。

## 边界与状态

::: demo states
观察动态范围、交叉限制、禁用和错误状态。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 范围的起止值。 | `[number, number]` | 必填 |
| `min` | 最小值。 | `number` | `0` |
| `max` | 最大值。 | `number` | `100` |
| `step` | 步长。 | `number` | `1` |
| `startLabel` | 起始滑块的可访问名称。 | `string` | `'Minimum value'` |
| `endLabel` | 结束滑块的可访问名称。 | `string` | `'Maximum value'` |
| `startName` | 起始滑块的原生表单字段名。 | `string` | — |
| `endName` | 结束滑块的原生表单字段名。 | `string` | — |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 范围改变时触发。 | `value: [number, number]` |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#2a80eb` | `#38bdf8` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #2a80eb`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
