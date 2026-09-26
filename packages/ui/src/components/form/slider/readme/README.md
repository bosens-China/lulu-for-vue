---
title: Slider 滑块
description: 滑块用于选择连续或离散数值。
seo:
  title: Vue Slider 滑块组件
  description: LuLu UI Vue 滑块组件的中文用法与示例。
  keywords:
    - 滑块
    - Vue 表单
---

# Slider 滑块

## 基础用法

::: demo basic
通过 `v-model` 绑定当前数值。
:::

## 范围与状态

::: demo states
可用方向键调整；范围和步长由原生输入约束。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前值。 | `number` | 必填 |
| `min` | 最小值。 | `number` | `0` |
| `max` | 最大值。 | `number` | `100` |
| `step` | 步长。 | `number` | `1` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `invalid` | 是否显示错误状态。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 值改变时触发。 | `value: number` |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#2a80eb` | `#38bdf8` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #2a80eb`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
