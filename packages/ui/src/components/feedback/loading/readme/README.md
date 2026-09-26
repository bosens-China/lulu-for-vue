---
title: Loading 加载
description: 加载组件用于提示当前内容正在处理。
seo:
  title: Vue Loading 加载组件
  description: LuLu UI Vue 加载组件的中文用法与示例。
  keywords:
    - 加载
    - Vue 反馈
---

# Loading 加载

## 基础用法

::: demo basic
可通过 `size` 调整图标尺寸，并用插槽修改提示文案。
:::

## 尺寸与布局

::: demo sizes
比较 sm、md、lg，并用 block 和默认插槽呈现块级提示。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `block` | 是否以块级方式排列。 | `boolean` | `false` |
| `label` | 加载提示文本。 | `string` | `'Loading'` |
| `size` | 加载图标尺寸。 | `'sm' \| 'md' \| 'lg'` | `'md'` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 加载提示的替代内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#2a80eb` | `#38bdf8` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#a2a9b6` | `#a1a1aa` |
| `--lulu-loading-size` | 加载图标尺寸（size 属性会在组件上设定） | `20px` | `20px` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |

例如在局部容器的 `style` 中设置 `--lulu-color-primary: #2a80eb`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
