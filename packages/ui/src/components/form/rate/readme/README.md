---
title: Rate 评分
description: 评分组件用于录入离散或小数评分。
seo:
  title: Vue Rate 评分组件
  description: LuLu UI Vue 评分组件的中文用法与示例。
  keywords:
    - 评分
    - Vue 表单
---

# Rate 评分

## 基础用法

::: demo basic
使用 `v-model` 绑定评分数值。
:::

## 只读与自定义评分

::: demo states
当前 Rate 使用原生范围输入表达评分，不提供星形图案；只读状态保留值。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前评分。 | `number` | 必填 |
| `min` | 最低评分。 | `number` | `0` |
| `max` | 最高评分。 | `number` | `5` |
| `step` | 评分步长。 | `number` | `0.5` |
| `label` | 评分控件的可访问名称。 | `string` | `'Rating'` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `readonly` | 是否只读。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 评分改变时触发。 | `value: number` |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#2a80eb` | `#38bdf8` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #2a80eb`。全局配色与导出入口见顶部“主题调色盘”和“主题定制”指南。
