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
