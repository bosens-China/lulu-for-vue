---
title: ColorPicker 颜色选择器
description: 颜色选择器用于选择和编辑颜色值。
seo:
  title: Vue ColorPicker 颜色选择器组件
  description: LuLu UI Vue 颜色选择器组件的中文用法与示例。
  keywords:
    - 颜色选择器
    - Vue 表单
---

# ColorPicker 颜色选择器

## 基础用法

::: demo basic
颜色以字符串形式通过 `v-model` 输出。
:::

## 透明度与禁用

::: demo states
alpha 开启透明度滑块；更改颜色或透明度后返回八位十六进制颜色。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前颜色值。 | `string` | `'#000000'` |
| `alpha` | 是否允许编辑透明度。 | `boolean` | `false` |
| `disabled` | 是否禁用。 | `boolean` | `false` |
| `label` | 颜色输入的可访问名称。 | `string` | `'Color'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 颜色值改变时触发。 | `value: string` |
| `change` | 用户提交颜色选择时触发。 | `value: string` |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#2a80eb` | `#38bdf8` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-space-1` | 间距 1 | `4px` | `4px` |
| `--lulu-space-2` | 间距 2 | `8px` | `8px` |

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #2a80eb`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
