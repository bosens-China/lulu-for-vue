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

## 受控菜单与自定义项目

::: demo advanced
选择后保持展开，方便连续操作；点击外部或按 Escape 关闭。top-end 和 offset 调整位置；所有位置值见 [Popover 位置示例](../popover/#位置与关闭策略)。
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

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#d0d0d5` | `#3f3f46` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-surface-hover` | 悬停背景 | `#f0f7ff` | `#18181b` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#a2a9b6` | `#a1a1aa` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-radius-sm` | 小圆角 | `4px` | `4px` |
| `--lulu-shadow-overlay` | 浮层阴影 | `0 8px 24px rgb(15 23 42 / 16%)` | `0 8px 24px rgb(0 0 0 / 70%)` |
| `--lulu-space-1` | 最小间距 | `4px` | `4px` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |
| `--lulu-z-index-popup` | 下拉浮层层级 | `1000` | `1000` |

浮层会传送到最近的 `data-lulu-theme` 容器，请在该容器上覆盖变量，不能只设置在触发器上。

例如在局部容器的 `style` 中设置 `--lulu-color-border: #d0d0d5`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
