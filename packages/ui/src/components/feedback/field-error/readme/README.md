---
title: FieldError 字段错误
description: 字段错误组件用于展示表单控件的校验反馈。
seo:
  title: Vue FieldError 字段错误组件
  description: LuLu UI Vue 字段错误组件的中文用法与示例。
  keywords:
    - 表单错误
    - Vue 表单
---

# FieldError 字段错误

## 基础用法

::: demo basic
传入错误信息，或使用默认插槽自定义内容。
:::

## 自定义错误内容

::: demo slot
default 插槽可包含强调文本，覆盖默认 message 内容。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `message` | 要展示的错误文本。 | `string` | — |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 自定义错误内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-danger` | 危险或错误状态 | `#eb4646` | `#f87171` |
| `--lulu-font-size-sm` | 辅助文字大小 | `12px` | `12px` |
| `--lulu-space-1` | 间距 1 | `4px` | `4px` |

例如在局部容器的 `style` 中设置 `--lulu-color-danger: #eb4646`。全局配色与导出入口见顶部“主题调色盘”和“主题定制”指南。
