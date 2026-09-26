---
title: Accordion 手风琴
description: 手风琴通过可折叠面板组织一组相关内容。
seo:
  title: Vue Accordion 手风琴组件
  description: LuLu UI Vue 手风琴组件的中文用法与示例。
  keywords:
    - 手风琴
    - Vue 导航
---

# Accordion 手风琴

## 基础用法

::: demo basic
传入面板数据，并通过 `v-model` 绑定展开项。
:::

## 多项展开与自定义内容

::: demo multiple
数组模型允许多个面板同时展开；summary 和 default 插槽接收当前 item。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前展开项；传入数组时可同时展开多项。 | `string \| string[]` | 必填 |
| `items` | 面板数据。 | `readonly Array<{ value: string; title: string; content?: string }>` | 必填 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 展开项改变时触发。 | `value: string \| string[]` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `summary` | 自定义面板标题。 | `{ item }` |
| `default` | 自定义面板内容。 | `{ item }` |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border-subtle` | 分隔线与弱边框 | `#ededef` | `#27272a` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |

例如在局部容器的 `style` 中设置 `--lulu-color-border-subtle: #ededef`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
