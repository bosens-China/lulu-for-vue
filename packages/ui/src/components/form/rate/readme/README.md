---
title: Rate 评分
description: 星形评分用于输入整数或小数评分，支持半分、预览与自定义图形。
seo:
  title: Vue Rate 星形评分组件
  description: LuLu UI Vue 星形评分的鼠标、键盘、只读和表单用法。
  keywords:
    - 星形评分
    - 半分
    - Vue 表单
---

# Rate 评分

## 基础用法

::: demo basic
默认五颗星，通过 `v-model` 绑定数值，默认 `:step="0.5"` 支持半分。指针移动预览评分，点击后提交。
:::

## 只读与自定义评分

::: demo states
通过 `max` 设置评分上限与星数，通过 `step` 设置精度。只读仍显示评分且参加原生字段提交；禁用不能聚焦，也不提交字段。
:::

## 清空与替换图形

::: demo custom
启用 `clearable` 后，再次点击当前评分可清空到 `min`；键盘 Delete 或 Backspace 也可清空。`icon` 插槽可替换图形，保留相同数值与填充规则。
:::

## 键盘与表单

评分保留一个可访问的原生 range 输入，星形图案不重复播报。方向键调整一个步长，PageUp/PageDown 调整十个步长，Home/End 到达评分边界。`id`、`name`、错误关联与原生事件绑定该输入，`class`、`style` 作用于整体容器；可直接放在 `LuluFormItem` 中。

指针点击与键盘更新通知原生 `input`、`change` 监听器，参数保持 `Event`。`readonly` 阻止所有修改；`disabled` 同时禁止原生字段提交。

非有限 `min`/`max` 分别回退到 `0`/`5`，倒序边界收敛为单点；非正或非有限 `step` 回退到 `0.5`。外部模型仅规范化展示，交互前不改写父模型；交互时以 `min` 为步长起点取值。默认星形适合非负评分，星数为 `max` 向上取整。

## API

### Props / Models

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前评分。 | `number` | 必填 |
| `min` | 最低评分及清空值。 | `number` | `0` |
| `max` | 最高评分，同时决定星数。 | `number` | `5` |
| `step` | 评分步长，`0.5` 支持半分。 | `number` | `0.5` |
| `label` | 没有外部 ARIA 标签时的可访问名称。 | `string` | `'评分'` |
| `clearable` | 再次点击当前评分或按 Delete/Backspace 清空。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `readonly` | 是否只读。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 评分改变。 | `number` |
| `input` | 原生输入通知。 | `Event` |
| `change` | 一次评分操作结束。 | `Event` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `icon` | 替换每颗星的图形；图形分别渲染未选中层与选中层。 | `{ index: number, active: boolean, fraction: number }` |

`index` 从 `1` 开始；`fraction` 是当前图形的填充比例，范围 `0` 到 `1`。图形尺寸、间距、选中/未选中颜色及焦点样式均可通过 CSS Token 覆盖。

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-range-accent` | 范围输入强调色 | `#1668c7` | `#38bdf8` |
| `--lulu-range-invalid-accent` | 范围输入错误态强调色 | `#c53030` | `#f87171` |
| `--lulu-rate-color` | 已选评分图形颜色 | `#f59b00` | `#fbbf24` |
| `--lulu-rate-empty-color` | 未选评分图形颜色 | `#8b8f98` | `#62626b` |
| `--lulu-rate-focus-shadow` | 评分键盘焦点光圈 | `0 0 0 3px #1668c7` | `0 0 0 3px #38bdf8` |
| `--lulu-rate-gap` | 评分图形之间的间距 | `4px` | `4px` |
| `--lulu-rate-height` | 评分控件最小高度 | `40px` | `40px` |
| `--lulu-rate-hover-color` | 评分悬停预览颜色 | `#f59b00` | `#fbbf24` |
| `--lulu-rate-padding` | 评分图形容器内边距 | `2px` | `2px` |
| `--lulu-rate-radius` | 评分焦点容器圆角 | `4px` | `4px` |
| `--lulu-rate-star-size` | 单个评分图形尺寸 | `24px` | `24px` |

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
| `--lulu-color-warning` | 警告状态 | `#f59b00` | `#fbbf24` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-opacity-disabled` | 禁用态透明度 | `0.55` | `0.55` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-shadow-focus` | 键盘聚焦光圈 | `0 0 0 3px #1668c7` | `0 0 0 3px #38bdf8` |
| `--lulu-space-1` | 最小间距 | `4px` | `4px` |

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #1668c7`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
