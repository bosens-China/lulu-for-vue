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

## 筛选、受控展开与候选项

::: demo advanced
输入 v 匹配前缀，最多显示 3 项；Vitest 为禁用候选。加载开关只演示状态，不发网络请求。其他 placement 值可在 [Popover 位置示例](../popover/#位置与关闭策略)中比较。
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

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#d0d0d5` | `#3f3f46` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-surface-selected` | 选中背景 | `#e0f0ff` | `rgb(56 189 248 / 0.16)` |
| `--lulu-color-surface-subtle` | 弱背景、表头与禁用底色 | `#f7f9fa` | `#121215` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#a2a9b6` | `#a1a1aa` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-radius-sm` | 小圆角 | `4px` | `4px` |
| `--lulu-shadow-focus` | 键盘聚焦光圈 | `0 0 0 3px rgb(42 128 235 / 24%)` | `0 0 0 3px rgb(56 189 248 / 35%)` |
| `--lulu-shadow-overlay` | 浮层阴影 | `0 8px 24px rgb(15 23 42 / 16%)` | `0 8px 24px rgb(0 0 0 / 70%)` |
| `--lulu-space-1` | 最小间距 | `4px` | `4px` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |
| `--lulu-transition-duration` | 过渡时长 | `160ms` | `160ms` |
| `--lulu-transition-easing` | 过渡曲线 | `ease` | `ease` |
| `--lulu-z-index-popup` | 候选浮层层级 | `1000` | `1000` |

浮层会传送到最近的 `data-lulu-theme` 容器，请在该容器上覆盖变量，不能只设置在触发器上。

例如在局部容器的 `style` 中设置 `--lulu-color-border: #d0d0d5`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
