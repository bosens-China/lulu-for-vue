---
title: Switch 开关
description: 开关用于切换开与关两种状态。
seo:
  title: Vue Switch 开关组件
  description: LuLu UI Vue 开关组件的中文用法与示例。
  keywords:
    - 开关
    - Vue 表单
---

# Switch 开关

## 基础用法

::: demo basic
通过 `v-model` 绑定布尔状态。
:::

## 禁用开关

::: demo states
两种禁用状态保留当前值。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 是否打开。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 开关状态改变时触发。 | `checked: boolean` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 开关的标签内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#2a80eb` | `#38bdf8` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-space-2` | 间距 2 | `8px` | `8px` |

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #2a80eb`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
