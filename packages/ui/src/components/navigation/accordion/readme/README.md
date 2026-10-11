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
| `v-model` | 当前展开项；单选关闭时为 `null`，传入数组时可同时展开多项。 | `string \| number \| Array<string \| number> \| null` | 必填 |
| `items` | 面板数据；`AccordionValue` 和 `LuluAccordionItem` 可从 `@lulu/vue/accordion` 导入。 | `readonly LuluAccordionItem[]` | 必填 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 展开项改变时触发。 | `value: string \| number \| Array<string \| number> \| null` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `summary` | 自定义面板标题。 | `{ item }` |
| `default` | 自定义面板内容。 | `{ item }` |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-accordion-border` | 手风琴边框 | `#ededef` | `#27272a` |
| `--lulu-accordion-color` | 手风琴文字颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-accordion-content-padding` | 手风琴内容内边距 | `12px` | `12px` |
| `--lulu-accordion-gap` | 手风琴间距 | `8px` | `8px` |
| `--lulu-accordion-radius` | 手风琴圆角 | `4px` | `4px` |
| `--lulu-accordion-summary-padding` | 手风琴标题内边距 | `12px` | `12px` |
| `--lulu-disclosure-border` | 折叠面板边框 | `#ededef` | `#27272a` |
| `--lulu-disclosure-color` | 折叠面板文字颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-disclosure-content-padding` | 折叠面板内容内边距 | `12px` | `12px` |
| `--lulu-disclosure-radius` | 折叠面板圆角 | `4px` | `4px` |
| `--lulu-disclosure-summary-padding` | 折叠面板标题内边距 | `12px` | `12px` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border-subtle` | 分隔线与弱边框 | `#ededef` | `#27272a` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-font-weight-strong` | 字体字重强调 | `600` | `600` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |

</div>

</details>

例如在局部容器的 `style` 中设置 `--lulu-color-border-subtle: #ededef`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
