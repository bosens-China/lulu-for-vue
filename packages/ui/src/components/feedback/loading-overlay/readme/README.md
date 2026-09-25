---
title: LoadingOverlay 加载遮罩
description: 加载遮罩用于在内容区域上方提示正在处理。
seo:
  title: Vue LoadingOverlay 加载遮罩组件
  description: LuLu UI Vue 加载遮罩组件的中文用法与示例。
  keywords:
    - 加载遮罩
    - Vue 反馈
---

# LoadingOverlay 加载遮罩

## 基础用法

::: demo basic
通过 `v-model:open` 控制遮罩显示状态。
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:open` | 是否显示遮罩。 | `boolean` | `false` |
| `message` | 加载提示文本。 | `string` | `'Loading'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:open` | 遮罩状态改变时触发。 | `open: boolean` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 遮罩中的自定义内容。 | — |
