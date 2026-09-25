---
title: Button 按钮
description: 按钮用于触发即时操作。
seo:
  title: Vue Button 按钮组件 - LuLu UI Vue
  description: LuLu UI Vue Button 按钮组件的类型、状态、表单语义与使用示例。
  keywords:
    - Vue Button
    - 按钮组件
    - LuLu UI Vue
---

# Button 按钮

按钮用于触发即时操作。组件沿用 LuLu UI Edge 的按钮类型和视觉语义，并使用原生 `<button>` 元素提供键盘与表单能力。

## 基础用法

默认按钮沿用 Edge 的深色实心样式；`normal` 使用浅色普通样式。一个操作组中，建议只使用一个主要按钮强调核心操作。

::: demo basic
使用默认插槽设置按钮内容，通过 `variant="primary"` 显示主要按钮。
:::

## 按钮类型

组件提供 `default`、`normal`、`primary`、`success`、`warning` 和 `danger` 六种类型。请根据操作的重要程度和结果选择类型，避免只把颜色作为装饰。

::: demo variants
主要按钮用于核心操作。成功、警示和危险按钮应与对应的操作结果保持一致。
:::

## 禁用与加载

`disabled` 会禁用按钮的原生交互。`loading` 会显示加载状态，同时阻止重复触发操作。

::: demo states
异步操作进行时使用加载状态。操作不可用时使用禁用状态。
:::

## 原生表单重置

::: demo reset
native-type=reset 触发原生 reset 事件；父级在事件中同步重置 v-model，避免显示值与业务状态不一致。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `variant` | 按钮的视觉类型。 | `'default' \| 'normal' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` |
| `disabled` | 是否禁用原生按钮。 | `boolean` | `false` |
| `loading` | 是否显示加载状态；加载时会阻止重复操作。 | `boolean` | `false` |
| `nativeType` | 原生 `<button>` 的 `type`。 | `'button' \| 'submit' \| 'reset'` | `'button'` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 按钮内容。 | — |

## 表单语义

组件默认使用 `nativeType="button"`，放入表单后不会意外提交。需要提交或重置表单时，请显式设置 `nativeType="submit"` 或 `nativeType="reset"`。

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-button-background` | 按钮背景覆盖 | `按类型回退` | `按类型回退` |
| `--lulu-button-border` | 按钮边框覆盖 | `按类型回退` | `按类型回退` |
| `--lulu-button-color` | 按钮文字覆盖 | `按类型回退` | `按类型回退` |
| `--lulu-color-border` | 控件边框 | `#d0d0d5` | `#3f3f46` |
| `--lulu-color-danger` | 危险或错误状态 | `#eb4646` | `#f87171` |
| `--lulu-color-neutral-solid` | 默认按钮底色 | `#4c5161` | `#52525b` |
| `--lulu-color-on-neutral` | 默认按钮文字 | `#ffffff` | `#ffffff` |
| `--lulu-color-on-status` | 状态按钮文字 | `#111827` | `#000000` |
| `--lulu-color-primary-solid` | 主要操作底色 | `#0057c3` | `#38bdf8` |
| `--lulu-color-success` | 成功状态 | `#1cad70` | `#34d399` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-inverse` | 强调底色上的文字 | `#ffffff` | `#000000` |
| `--lulu-color-warning` | 警告状态 | `#f59b00` | `#fbbf24` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-shadow-focus` | 键盘聚焦光圈 | `0 0 0 3px rgb(42 128 235 / 24%)` | `0 0 0 3px rgb(56 189 248 / 35%)` |
| `--lulu-space-1` | 间距 1 | `4px` | `4px` |
| `--lulu-space-4` | 间距 4 | `16px` | `16px` |
| `--lulu-transition-duration` | 过渡时长 | `160ms` | `160ms` |
| `--lulu-transition-easing` | 过渡曲线 | `ease` | `ease` |

`--lulu-button-*` 未显式设置时按 `variant` 回退到对应语义色，可直接在按钮上覆盖。

例如在局部容器的 `style` 中设置 `--lulu-color-border: #d0d0d5`。全局配色与导出入口见顶部“主题调色盘”和“主题定制”指南。
