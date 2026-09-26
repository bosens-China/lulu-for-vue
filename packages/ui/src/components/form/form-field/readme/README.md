---
title: FormField 表单字段
description: 表单字段组件统一关联标签、控件和错误提示。
seo:
  title: Vue FormField 表单字段组件
  description: LuLu UI Vue 表单字段组件的中文用法与示例。
  keywords:
    - 表单字段
    - Vue 表单
---

# FormField 表单字段

## 基础用法

::: demo basic
默认插槽会获得应传给表单控件的无障碍属性。
:::

## 错误与自定义插槽

::: demo error
复用 controlProps 连接标签、错误和控件；合并 aria-describedby 保留帮助说明。label/error 插槽定制内容时仍保留错误 ID。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `controlId` | 关联表单控件的 ID。 | `string` | 必填 |
| `label` | 字段标签。 | `string` | — |
| `error` | 错误提示文本。 | `string` | — |
| `required` | 是否标记为必填。 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 表单控件。 | `{ controlProps }` |
| `label` | 自定义标签。 | — |
| `error` | 自定义错误提示。 | `{ errorId, message }` |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-danger` | 危险或错误状态 | `#eb4646` | `#f87171` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-font-size-sm` | 辅助文字大小 | `12px` | `12px` |
| `--lulu-space-1` | 间距 1 | `4px` | `4px` |

例如在局部容器的 `style` 中设置 `--lulu-color-danger: #eb4646`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
