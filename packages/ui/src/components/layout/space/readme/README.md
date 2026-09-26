---
title: Space 间距
description: 使用统一间距排列横向或纵向的内容。
seo:
  title: Vue Space 间距组件 - LuLu UI Vue
  description: LuLu UI Vue Space 组件的横向、纵向、尺寸与换行示例。
  keywords:
    - Vue Space
    - 间距组件
    - LuLu UI Vue
---

# Space 间距

`LuluSpace` 用于给一组相邻内容设置统一间距。默认横向排列并居中对齐；纵向排列时内容会撑满容器宽度。它只负责排列，不改变子组件的行为。

## 基础用法

设置 `wrap` 可让横向内容在空间不足时换行；使用 `direction="vertical"` 创建纵向间距。

::: demo basic
横向操作组和纵向内容组共用同一套间距尺寸。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `direction` | 排列方向。 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `size` | 子项之间的间距。 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| `wrap` | 横向排列时是否允许换行。 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 需要排列的内容。 | — |

## 使用边界

Space 渲染普通 `div`，不添加列表、表单或导航语义。需要这些语义时保留原生容器；网格和响应式布局继续使用 CSS Grid 或 UnoCSS。

## CSS Tokens

间距沿用全局 token，可在业务容器上覆盖。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-space-2` | `small` 间距 | `8px` | `8px` |
| `--lulu-space-3` | `middle` 间距 | `12px` | `12px` |
| `--lulu-space-4` | `large` 间距 | `16px` | `16px` |
