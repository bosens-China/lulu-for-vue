---
title: Radio 单选框
description: 单选框用于在多个选项中选择唯一值。
seo:
  title: Vue Radio 单选框组件
  description: LuLu UI Vue 单选框组件的中文用法与示例。
  keywords:
    - 单选框
    - Vue 表单
---

# Radio 单选框

## 基础用法

::: demo basic
多个单选框共享同一个 `v-model`。
:::

## 禁用选项

::: demo states
禁用项不参与选择，其他选项仍保持同名互斥。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前选中的值。 | `unknown` | — |
| `value` | 当前选项的值。 | `unknown` | 必填 |
| `disabled` | 是否禁用。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 选中值改变时触发。 | `value: unknown` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 单选框标签内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#2a80eb` | `#38bdf8` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #2a80eb`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
