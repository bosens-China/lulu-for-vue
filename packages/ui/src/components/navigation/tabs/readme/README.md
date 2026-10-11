---
title: Tabs 标签页
description: 标签页组件协调标签和对应内容面板的选中状态。
seo:
  title: Vue Tabs 标签页组件
  description: LuLu UI Vue 标签页组件的中文用法与示例。
  keywords:
    - 标签页
    - Vue 导航
---

# Tabs 标签页

## 基础用法

::: demo basic
`LuluTabs`、`LuluTab` 与 `LuluTabPanel` 需要组合使用。
:::

手动按需引入时分别导入 `tabs`、`tab` 与 `tab-panel` 的样式；自动导入 resolver 会随三个组件分别补齐。

## 数字值与禁用标签

::: demo numeric
数字 value 需使用 :value 绑定，并与面板值类型保持一致；方向键跳过禁用标签。Tab 和 TabPanel 共用此组合示例。
:::

当受控值暂时不存在或指向禁用标签时，首个可用标签仍保留 Tab 停靠点，但组件不会擅自改写受控值。

`class`、`style` 和 `data-lulu-theme` 应用于整个 Tabs 容器，局部主题和 CSS token 会传递给标签和面板。`aria-label`、`aria-labelledby` 等其余属性透传到标签栏；动态重排标签后，方向键按当前显示顺序移动。

## API

### LuluTabs

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 当前选中标签的值。 | `string \| number` | 必填 |

#### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 选中标签改变时触发。 | `value: string \| number` |

#### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `tabs` | 放置 `LuluTab`。 | — |
| `default` | 放置 `LuluTabPanel`。 | — |

### LuluTab

`LuluTab` 放在 `LuluTabs` 的 `tabs` 插槽中。`value` 与对应面板的值和类型保持一致。

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 标签唯一值。 | `string \| number` | 必填 |
| `disabled` | 是否禁用。 | `boolean` | `false` |

#### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 标签文本。 | — |

### LuluTabPanel

`LuluTabPanel` 的 `value` 与标签相同时显示内容。

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 与标签对应的唯一值。 | `string \| number` | 必填 |

#### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 面板内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-tab-active-background` | 标签激活背景 | `transparent` | `transparent` |
| `--lulu-tab-active-border` | 标签激活边框 | `#1668c7` | `#38bdf8` |
| `--lulu-tab-active-color` | 标签激活文字颜色 | `#1668c7` | `#38bdf8` |
| `--lulu-tab-background` | 标签背景 | `transparent` | `transparent` |
| `--lulu-tab-color` | 标签文字颜色 | `#667085` | `#a1a1aa` |
| `--lulu-tab-padding-block` | 标签内边距垂直方向 | `8px` | `8px` |
| `--lulu-tab-padding-inline` | 标签内边距水平方向 | `12px` | `12px` |
| `--lulu-tab-panel-padding-block` | 标签面板内边距垂直方向 | `12px` | `12px` |
| `--lulu-tabs-border` | 标签组边框 | `#8b8f98` | `#62626b` |
| `--lulu-tabs-color` | 标签组文字颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-tabs-gap` | 标签组间距 | `4px` | `4px` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#8b8f98` | `#62626b` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#667085` | `#a1a1aa` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-opacity-disabled` | 禁用态透明度 | `0.55` | `0.55` |
| `--lulu-shadow-focus` | 键盘聚焦光圈 | `0 0 0 3px #1668c7` | `0 0 0 3px #38bdf8` |
| `--lulu-space-1` | 最小间距 | `4px` | `4px` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-border: #8b8f98`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
