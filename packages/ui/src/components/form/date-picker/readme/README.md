---
title: DatePicker 日期选择器
description: 日期选择器用于输入日期、时间或月份等原生日期值。
seo:
  title: Vue DatePicker 日期选择器组件
  description: LuLu UI Vue 日期选择器组件的中文用法与示例。
  keywords:
    - 日期选择器
    - Vue 表单
---

# DatePicker 日期选择器

## 基础用法

::: demo basic
默认使用日期输入类型，也可用 `type` 切换为时间或月份。
:::

## 输入类型

::: demo types
演示 date、datetime-local、month、time、week 五种类型。面板外观与支持程度由浏览器决定，模型保持原生字符串格式。
:::

## 日期约束与状态

::: demo states
演示 min/max/step、必填、禁用与错误状态。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 日期字符串。 | `string` | `''` |
| `type` | 原生日期输入类型。 | `'date' \| 'datetime-local' \| 'month' \| 'time' \| 'week'` | `'date'` |
| `min` | 允许的最小日期。 | `string` | — |
| `max` | 允许的最大日期。 | `string` | — |
| `step` | 原生日期输入步长。 | `number \| string` | — |
| `required` | 是否为必填。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 日期值改变时触发。 | `value: string` |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#d0d0d5` | `#3f3f46` |
| `--lulu-color-danger` | 危险或错误状态 | `#eb4646` | `#f87171` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-surface-subtle` | 弱背景、表头与禁用底色 | `#f7f9fa` | `#121215` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#a2a9b6` | `#a1a1aa` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-shadow-focus` | 键盘聚焦光圈 | `0 0 0 3px rgb(42 128 235 / 24%)` | `0 0 0 3px rgb(56 189 248 / 35%)` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |
| `--lulu-transition-duration` | 过渡时长 | `160ms` | `160ms` |
| `--lulu-transition-easing` | 过渡曲线 | `ease` | `ease` |

例如在局部容器的 `style` 中设置 `--lulu-color-border: #d0d0d5`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
