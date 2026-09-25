---
title: Autocomplete 自动完成
description: 自动完成组件根据输入内容筛选候选项。
seo:
  title: Vue Autocomplete 自动完成组件
  description: LuLu UI Vue 自动完成组件的中文用法、属性与示例。
  keywords:
    - 自动完成
    - Vue 表单
---

# Autocomplete 自动完成

## 基础用法

::: demo basic
输入内容后可用键盘或鼠标选择候选项。选中后输入框与 `v-model` 会显示同一值；父组件修改该值时，输入框也会更新。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前输入值。 | `string` | `''` |
| `v-model:open` | 候选面板是否展开。 | `boolean` | `false` |
| `items` | 候选项数组。 | `readonly AutocompleteItem[]` | `[]` |
| `filter` | 用于过滤候选项的函数。 | `AutocompleteFilter` | — |
| `loading` | 是否显示加载状态。 | `boolean` | `false` |
| `maxResults` | 最多展示的候选项数量。 | `number` | `8` |
| `placement` | 候选面板相对输入框的位置。 | `FloatingPlacement` | `'bottom-start'` |
| `offset` | 候选面板与输入框的间距。 | `number` | `4` |
| `disabled` | 是否禁用输入。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 输入值改变时触发。 | `value: string` |
| `update:open` | 候选面板状态改变时触发。 | `open: boolean` |
| `search` | 用户输入后触发。 | `query: string` |
| `select` | 选择候选项后触发。 | `item: AutocompleteItem` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `option` | 自定义候选项内容。 | `{ item: AutocompleteItem }` |
