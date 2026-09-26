---
title: DateRangePicker 日期范围选择器
description: 日期范围选择器用于选择开始与结束日期。
seo:
  title: Vue DateRangePicker 日期范围选择器组件
  description: LuLu UI Vue 日期范围选择器组件的中文用法与示例。
  keywords:
    - 日期范围
    - Vue 表单
---

# DateRangePicker 日期范围选择器

## 基础用法

::: demo basic
通过长度为二的数组绑定开始和结束日期。
:::

需要参与原生表单提交时，分别设置 `startName` 与 `endName`；两个输入会作为独立字段提交。外部传入的 `aria-describedby` 会关联到两个输入。

## 范围类型

::: demo types
日期、月份与周范围分别保存；清空和重新选择可观察字符串元组。
:::

## 范围约束与状态

::: demo states
两个日期均受 min/max 与 required 约束；业务层仍需处理区间含义和提交校验。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 开始和结束日期。 | `[start: string, end: string]` | 必填 |
| `type` | 日期范围输入类型。 | `'date' \| 'month' \| 'week'` | `'date'` |
| `startLabel` | 开始日期输入的标签。 | `string` | `'Start date'` |
| `endLabel` | 结束日期输入的标签。 | `string` | `'End date'` |
| `startName` | 开始日期的原生表单字段名。 | `string` | — |
| `endName` | 结束日期的原生表单字段名。 | `string` | — |
| `min` | 允许的最小日期。 | `string` | — |
| `max` | 允许的最大日期。 | `string` | — |
| `required` | 是否为必填。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 日期范围改变时触发。 | `value: [start: string, end: string]` |

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
| `--lulu-space-2` | 间距 2 | `8px` | `8px` |
| `--lulu-space-3` | 间距 3 | `12px` | `12px` |
| `--lulu-transition-duration` | 过渡时长 | `160ms` | `160ms` |
| `--lulu-transition-easing` | 过渡曲线 | `ease` | `ease` |

例如在局部容器的 `style` 中设置 `--lulu-color-border: #d0d0d5`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
