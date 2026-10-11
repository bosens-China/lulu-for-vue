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
默认选择日期。使用 `picker` 统一选择日期、周、月或年份；纯时间使用 TimePicker。
:::

## 日期家族

::: demo family
`picker="year"` 的模型保持字符串；日期加时间使用 `showTime`。年份目前为数字输入，其他面板由浏览器提供，不包含自定义日历。
:::

## 兼容的原生输入类型

::: demo types
演示 date、datetime-local、month、time、week 五种类型。面板外观与支持程度由浏览器决定，模型保持原生字符串格式。
:::

## 日期约束与状态

::: demo states
演示 min/max/step、必填、禁用与错误状态。
:::

## 范围选择

::: demo range
通过长度为二的数组绑定开始和结束日期。
:::

需要参与原生表单提交时，分别设置 `startName` 与 `endName`；两个输入会作为独立字段提交。外部传入的 `aria-describedby` 会关联到两个输入。

`id` 关联开始输入，`aria-describedby`、`aria-errormessage`、`aria-invalid` 会传给两端。`class`、`style` 作用于整体容器，便于一次覆盖两端的 CSS Token。两端约束取全局 `min`/`max` 与当前区间的交集；外部传入的倒序区间会按顺序展示，交互后回传有序值。

## 范围类型

::: demo range-types
日期、月份与周范围分别保存；清空和重新选择可观察字符串元组。
:::

## 范围约束与状态

::: demo range-states
两个日期均受 min/max 与 required 约束；业务层仍需处理区间含义和提交校验。
:::

年份、月份、周与日期统一使用 `picker`；日期时间范围使用 `showTime`。纯时间范围优先使用 TimeRangePicker，它默认保留跨午夜顺序。

## API

### LuluDatePicker

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 日期字符串。 | `string` | `''` |
| `picker` | 日期选择粒度，优先于 type。 | `'date' \| 'week' \| 'month' \| 'year'` | — |
| `showTime` | 在日期输入中增加时间。 | `boolean` | `false` |
| `type` | 原生日期输入类型。 | `'date' \| 'datetime-local' \| 'month' \| 'time' \| 'week'` | `'date'` |
| `min` | 允许的最小日期。 | `string` | — |
| `max` | 允许的最大日期。 | `string` | — |
| `step` | 原生日期输入步长。 | `number \| string` | — |
| `required` | 是否为必填。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

#### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 日期值改变时触发。 | `value: string` |

### LuluDateRangePicker

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 开始和结束日期。 | `[start: string, end: string]` | 必填 |
| `picker` | 与 DatePicker 相同的日期粒度，优先于 type。 | `'date' \| 'week' \| 'month' \| 'year'` | — |
| `showTime` | 日期范围同时输入时间。 | `boolean` | `false` |
| `step` | 两端共享原生输入步长。 | `number \| string` | 浏览器默认 |
| `order` | 是否排序并联动两端边界；纯时间默认保留顺序。 | `boolean` | 日期为 `true`，时间为 `false` |
| `type` | 日期范围输入类型。 | `'date' \| 'datetime-local' \| 'month' \| 'time' \| 'week'` | `'date'` |
| `startLabel` | 开始日期输入的标签。 | `string` | `'开始日期'` |
| `endLabel` | 结束日期输入的标签。 | `string` | `'结束日期'` |
| `startName` | 开始日期的原生表单字段名。 | `string` | — |
| `endName` | 结束日期的原生表单字段名。 | `string` | — |
| `min` | 允许的最小日期。 | `string` | — |
| `max` | 允许的最大日期。 | `string` | — |
| `required` | 是否为必填。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

#### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 日期范围改变时触发。 | `value: [start: string, end: string]` |

## CSS Tokens

以下变量涵盖本页组件及其组合子组件，可在业务容器或应用根节点覆盖。

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
| `--lulu-control-radius` | 输入控件圆角 | `4px` | `4px` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

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
