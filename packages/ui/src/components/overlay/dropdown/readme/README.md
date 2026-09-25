---
title: Dropdown 下拉菜单
description: 下拉菜单通过触发器展示一组操作项。
seo:
  title: Vue Dropdown 下拉菜单组件
  description: LuLu UI Vue 下拉菜单组件的中文用法与示例。
  keywords:
    - 下拉菜单
    - Vue 浮层
---

# Dropdown 下拉菜单

## 基础用法

::: demo basic
在 `items` 中定义菜单项，并使用 `trigger` 插槽定制触发器文字。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 是否展开菜单。 | `boolean` | `false` |
| `items` | 菜单项数组。 | `readonly DropdownItem[]` | `[]` |
| `placement` | 菜单相对触发器的位置。 | `FloatingPlacement` | `'bottom-start'` |
| `offset` | 菜单与触发器的间距。 | `number` | `8` |
| `closeOnSelect` | 选择菜单项后是否关闭。 | `boolean` | `true` |
| `disabled` | 是否禁用触发器。 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:open` | 展开状态改变时触发。 | `open: boolean` |
| `open` | 菜单展开时触发。 | — |
| `close` | 菜单关闭时触发。 | — |
| `select` | 选择菜单项时触发。 | `item: DropdownItem` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `trigger` | 自定义触发器内容。 | — |
| `item` | 自定义菜单项内容。 | `{ item: DropdownItem }` |
