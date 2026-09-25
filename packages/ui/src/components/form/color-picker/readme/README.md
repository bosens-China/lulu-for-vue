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
