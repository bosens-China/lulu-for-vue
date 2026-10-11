---
title: TimePicker 时间选择器
description: 输入时、分或秒，模型使用原生时间字符串。
seo:
  title: Vue TimePicker 时间选择器组件
  description: 输入时、分或秒，模型使用原生时间字符串。
---

# TimePicker 时间选择器

## 基础用法

::: demo basic
值格式为 `HH:mm`，需要秒时设置合适的 `step`；清空返回空字符串。
:::

时间输入复用日期家族的原生输入与约束；面板外观由浏览器决定。年份使用 `DatePicker picker="year"`；仅输入 0–23 小时数时，使用 `Input type="number" min="0" max="23" step="1"`。

按需导入时还需导入 `@lulu/vue/date-picker/style.css`；resolver 会自动补齐。

## 时间范围

::: demo range
默认不排序，`22:00 → 02:00` 可表示跨午夜；它不保存日期或时区。明确只允许同日时可设置 `order`。
:::

TimeRangePicker 按需导入时还需导入 `@lulu/vue/date-range-picker/style.css`；resolver 会自动补齐。

## API

### LuluTimePicker

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 原生时间字符串。 | `string` | `''` |
| `min/max` | 原生时间约束，不用于推断跨日日期。 | `string` | — |
| `step` | 步长，单位秒。 | `number \| string` | 浏览器默认 |
| `disabled` | 禁用。 | `boolean` | `false` |
| `required` | 必填。 | `boolean` | `false` |
| `invalid` | 错误样式。 | `boolean` | `false` |

#### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 输入变化。 | `string` |

### LuluTimeRangePicker

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 原生时间字符串元组。 | `[string, string]` | 必填 |
| `min/max` | 原生时间约束，不用于推断跨日日期。 | `string` | — |
| `step` | 步长，单位秒。 | `number \| string` | 浏览器默认 |
| `disabled` | 禁用。 | `boolean` | `false` |
| `required` | 必填。 | `boolean` | `false` |
| `invalid` | 错误样式。 | `boolean` | `false` |
| `order` | 是否将两端按时间排序；跨午夜时保持关闭。 | `boolean` | `false` |
| `startName/endName` | 两端的原生提交字段名。 | `string` | — |
| `startLabel/endLabel` | 两端的无障碍名称。 | `string` | `'开始时间' / '结束时间'` |

#### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 输入变化。 | `[string, string]` |

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
| `--lulu-time-picker-min-width` | 时间输入最小宽度 | `8rem` | `8rem` |
| `--lulu-time-range-picker-gap` | 两个时间输入的间距 | `8px` | `8px` |

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
