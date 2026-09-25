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
