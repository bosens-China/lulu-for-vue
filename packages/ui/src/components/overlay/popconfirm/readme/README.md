---
title: Popconfirm 气泡确认框
description: 气泡确认框在危险或不可逆操作前请求用户确认。
seo:
  title: Vue Popconfirm 气泡确认框组件
  description: LuLu UI Vue 气泡确认框组件的中文用法与示例。
  keywords:
    - 确认框
    - Vue 浮层
---

# Popconfirm 气泡确认框

## 基础用法

::: demo basic
用 `trigger` 插槽提供触发元素，通过 `confirm` 监听确认操作。
:::

手动按需引入时同时导入 `@lulu/vue/popover/style.css`；自动导入 resolver 会补齐该直接依赖。

打开后焦点先到取消按钮；确认或取消后焦点返回触发按钮。

`trigger` 可直接填写按钮内容；复用 `LuluButton` 时，使用 `#trigger="{ triggerProps }"` 并将 `v-bind="triggerProps"` 绑定到按钮，避免嵌套按钮。

异步操作使用 `beforeConfirm`。返回 `void` 或成功的 Promise 后关闭并触发 `confirm`；返回 `false` 保持打开。抛错时显示错误文案并触发 `error`，可再次确认重试。等待期间操作按钮与触发器禁用，外部点击和 Escape 不关闭；外部受控关闭或卸载后忽略迟到结果。组件不会中止业务请求，取消网络操作由调用方负责。

确认浮层默认使用触发按钮作为辅助名称；可在组件上设置 `aria-label` 覆盖。`@lulu/vue/popconfirm` 同时导出 `FloatingPlacement` 类型。

## 受控确认与取消反馈

::: demo controlled
confirm 和 cancel 分别提供反馈；默认插槽定制消息，外部按钮演示受控开关。全部 placement 值见 [Popover 位置示例](../popover/#位置与关闭策略)。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 是否显示确认浮层。 | `boolean` | `false` |
| `message` | 确认提示。 | `string` | `'确定要继续吗？'` |
| `confirmText` | 确认按钮文字。 | `string` | `'确认'` |
| `cancelText` | 取消按钮文字。 | `string` | `'取消'` |
| `placement` | 浮层相对触发器的位置。 | `FloatingPlacement` | `'bottom-start'` |
| `offset` | 浮层与触发器的间距。 | `number` | `8` |
| `closeOnOutside` | 点击外部是否关闭。 | `boolean` | `true` |
| `closeOnEscape` | 按下 Escape 是否关闭。 | `boolean` | `true` |
| `panelStyle` | 单次覆盖传送后面板的样式或 CSS Token。 | `CSSProperties` | — |
| `disabled` | 是否禁用触发器。 | `boolean` | `false` |
| `beforeConfirm` | 确认前校验或异步操作；false 阻止关闭，异常允许重试。 | `() => void \| false \| Promise<void \| false>` | — |
| `pendingText` | 等待异步确认时的按钮文案。 | `string` | `'处理中…'` |
| `errorText` | 非 Error 异常或空错误消息的回退文案。 | `string` | `'操作失败，请重试。'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:open` | 显示状态改变时触发。 | `open: boolean` |
| `confirm` | 用户确认时触发。 | — |
| `cancel` | 用户取消时触发。 | — |
| `error` | beforeConfirm 失败并保持打开时触发。 | `cause: unknown` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `trigger` | 触发按钮内容，或绑定 triggerProps 的自定义交互元素。 | `{ triggerProps }` |
| `default` | 确认提示内容。 | — |

## CSS Tokens

以下变量来自组件及其组合子组件使用的样式。可在业务容器上覆盖；明暗模式分别设置，未覆盖时沿用默认主题。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-floating-background` | 浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-floating-border` | 浮层边框 | `#8b8f98` | `#62626b` |
| `--lulu-floating-color` | 浮层文字颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-floating-min-width` | 浮层最小宽度 | `180px` | `180px` |
| `--lulu-floating-padding` | 浮层内边距 | `4px` | `4px` |
| `--lulu-floating-radius` | 浮层圆角 | `4px` | `4px` |
| `--lulu-floating-shadow` | 浮层阴影 | `0 8px 24px rgb(15 23 42 / 16%)` | `0 8px 24px rgb(0 0 0 / 70%)` |
| `--lulu-popconfirm-action-gap` | 气泡确认操作间距 | `8px` | `8px` |
| `--lulu-popconfirm-confirm-background` | 气泡确认确认按钮背景 | `#1668c7` | `#38bdf8` |
| `--lulu-popconfirm-confirm-color` | 气泡确认确认按钮文字颜色 | `#ffffff` | `#000000` |
| `--lulu-popconfirm-error-color` | 气泡确认错误文字颜色 | `#c53030` | `#f87171` |
| `--lulu-popconfirm-message-gap` | 气泡确认消息间距 | `12px` | `12px` |
| `--lulu-popover-max-width` | 气泡最大宽度 | `360px` | `360px` |
| `--lulu-trigger-background` | 触发器背景 | `#ffffff` | `#09090b` |
| `--lulu-trigger-border` | 触发器边框 | `#8b8f98` | `#62626b` |
| `--lulu-trigger-color` | 触发器文字颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-trigger-height` | 触发器高度 | `40px` | `40px` |
| `--lulu-trigger-padding-inline` | 触发器内边距水平方向 | `12px` | `12px` |
| `--lulu-trigger-radius` | 触发器圆角 | `4px` | `4px` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

以下变量由多个组件共享。需要统一调整颜色、尺寸或动效时，在业务容器或应用根节点覆盖。

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-border` | 控件边框 | `#8b8f98` | `#62626b` |
| `--lulu-color-danger` | 危险或错误状态 | `#c53030` | `#f87171` |
| `--lulu-color-primary` | 强调色、选中态与原生控件着色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-primary-solid` | 主要操作底色，默认继承主色 | `#1668c7` | `#38bdf8` |
| `--lulu-color-surface` | 控件与浮层背景 | `#ffffff` | `#09090b` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-inverse` | 强调底色上的文字 | `#ffffff` | `#000000` |
| `--lulu-control-height` | 控件最小高度 | `40px` | `40px` |
| `--lulu-control-height-sm` | 紧凑控件高度 | `32px` | `32px` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-opacity-disabled` | 禁用态透明度 | `0.55` | `0.55` |
| `--lulu-radius` | 圆角 | `4px` | `4px` |
| `--lulu-shadow-overlay` | 浮层阴影 | `0 8px 24px rgb(15 23 42 / 16%)` | `0 8px 24px rgb(0 0 0 / 70%)` |
| `--lulu-space-1` | 最小间距 | `4px` | `4px` |
| `--lulu-space-2` | 小间距 | `8px` | `8px` |
| `--lulu-space-3` | 中等间距 | `12px` | `12px` |
| `--lulu-space-4` | 大间距 | `16px` | `16px` |
| `--lulu-z-index-popup` | 候选浮层层级 | `1000` | `1000` |

</div>

</details>

浮层传送到最近的 `data-lulu-theme` 容器；Dialog 内优先留在该 Dialog 内。区域级覆盖放在对应容器；单实例覆盖使用 `panelStyle`。

例如在局部容器的 `style` 中设置 `--lulu-color-border: #8b8f98`。主色调可在顶部立即设置；其他 CSS 变量的覆盖方式见“主题定制”指南。
