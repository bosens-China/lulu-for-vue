---
title: DialogHost 弹窗宿主
description: 通过 useDialog 打开弹窗、等待确认结果和管理异步确认。
seo:
  title: Vue useDialog 命令式弹窗与 DialogHost
  description: LuLu UI Vue 的命令式弹窗、确认与告知，支持队列、异步重试和自动清理。
  keywords:
    - Vue useDialog
    - 弹窗确认
---

# DialogHost 弹窗宿主

`useDialog()` 提供 `open`、`confirm`、`alert`，底层复用 `LuluDialog`。复杂模板仍可直接使用 `LuluDialog v-model:open`。

## 基础用法

::: demo basic
确认、响应式自定义内容、异步失败重试和串行队列。异步示例同时展示弹窗内的错误与外层 MessageHost 提示。
:::

Demo 的操作逻辑位于子组件，核心调用如下：

```ts
import { useDialog } from '@lulu/vue/use-dialog'

const dialog = useDialog()

async function remove() {
  const confirmed = await dialog.confirm({
    title: '删除记录',
    content: '删除后无法恢复，确定继续吗？',
    confirmText: '删除',
  })
  if (!confirmed) return
  // 在这里执行实际业务操作。
}
```

## 宿主与按需引入

在应用入口引入一次 `@lulu/vue/base.css`，宿主样式引入 `@lulu/vue/dialog-host/style.css`。JavaScript 不自动注入样式。

```vue
<script setup lang="ts">
import LuluDialogHost from '@lulu/vue/dialog-host'
import '@lulu/vue/dialog-host/style.css'
import AppContent from './AppContent.vue'
</script>

<template>
  <LuluDialogHost><AppContent /></LuluDialogHost>
</template>
```

- 在 **Host 的后代组件 setup** 中获取 `useDialog()`，在点击等客户端事件中调用方法。同一组件的 setup 不能注入自己模板里的 Host。
- 每个 Host 拥有独立队列，一次显示一条；取消排队中的 open 句柄不会影响当前弹窗。嵌套 Host 使用最近的宿主。
- 调用方作用域销毁会关闭其全部请求；Host 销毁清理整个队列。取消和销毁都结束 Promise，不抛出取消异常。销毁后调用旧 API 会明确报错。
- SSR 可以获取 API，但在服务端或 Host 挂载前调用显示方法会报错。队列不使用模块级单例。
- 弹窗内容继承 Host 的注入和 CSS 主题；不会自动继承调用者下面的局部 Provider。需要局部主题时，把 Host 放进对应主题容器。
- 配合消息时使用 `LuluMessageHost > LuluDialogHost`，并导入消息宿主样式；已有和新增消息会进入活动弹窗，关闭后回到原位置。

## 自定义内容

`content` 接受字符串或 `() => VNodeChild`。字符串按纯文本渲染，不解析 HTML。渲染函数读取响应式业务状态即可更新内容，其余选项在打开时取快照。

```ts
const handle = dialog.open({
  title: '编辑用户',
  content: () => h(UserEditor, {
    userId,
    onSaved: () => handle.close(),
  }),
})
await handle.closed
```

`h` 从 Vue 导入，`UserEditor` 为业务组件。`closed` 在实例移除、焦点恢复后结束，`close()` 可重复调用。

## 异步确认

`confirm` 和 `alert` 可传 `onConfirm`：返回 `void` 或成功的 Promise 自动关闭；返回 `false` 保持打开。抛错时在弹窗内部显示错误文本并允许重试。非 Error 异常使用默认错误文案。

等待期间确认/取消按钮禁用，关闭按钮隐藏，Escape 与遮罩关闭失效。调用方或 Host 销毁仍可强制清理，迟到的异步结果不会操作下一条弹窗。清理弹窗不会中止业务请求，网络取消由业务负责。

不要在 `onConfirm` 内等待同一 Host 的另一个弹窗；串行队列会使新弹窗等待当前弹窗结束。需要连续确认时，先等待第一次 `confirm` 返回，再发起下一次。

## API

### Host

无专有 Props、Models 或 Events；`default` 插槽为可调用 `useDialog()` 的后代组件。不提供全局静态 API。

### DialogApi

| 方法 | 说明 | 返回值 |
| --- | --- | --- |
| `open(options)` | 显示自定义弹窗，无默认底部按钮。 | `DialogHandle` |
| `confirm(options)` | 确认返回 true，其余关闭返回 false。 | `Promise<boolean>` |
| `alert(options)` | 显示单按钮告知，等待任意允许的关闭。 | `Promise<void>` |

### DialogOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 必填，非空的可访问标题。 | `string` | — |
| `content` | 必填，纯文本或响应式渲染函数。 | `string \| (() => VNodeChild)` | — |
| `closable` | 显示关闭按钮。 | `boolean` | `true` |
| `closeOnOverlay` | 点击遮罩关闭。 | `boolean` | `false` |
| `closeOnEscape` | Escape 关闭。 | `boolean` | `true` |

### DialogConfirmOptions

继承 DialogOptions，供 confirm 和 alert 使用。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `confirmText` | 确认按钮文案。 | `string` | `确定` |
| `cancelText` | 取消按钮文案，仅 confirm 使用。 | `string` | `取消` |
| `onConfirm` | 异步业务操作或同步校验。 | `() => void \| false \| Promise<void \| false>` | — |

### DialogHandle

- `close(): void`：关闭指定实例，活动或排队请求均适用。
- `closed: Promise<void>`：实例结束后完成。

## 键盘与无障碍

保留原生 dialog 模态语义；初始聚焦标题，Tab 移动到按钮。关闭时恢复打开前焦点；焦点提示仅针对交互控件。异步期间设置 `aria-busy`，错误文本使用 `role="alert"`。禁用所有关闭方式的自定义弹窗必须由业务内容提供结束按钮。

## CSS Tokens

沿用 Dialog 的主题变量，不新增独立主题体系。

| Token | 用途 |
| --- | --- |
| `--lulu-color-surface` | 弹窗与次要按钮背景 |
| `--lulu-color-text` | 正文颜色 |
| `--lulu-color-primary-solid` | 确认按钮背景 |
| `--lulu-color-danger` | 异步错误文本 |
| `--lulu-shadow-overlay` | 弹窗阴影 |

与旧 LuLu 构造器 API 的区别：实例归属于 Vue 作用域和宿主，不创建 document 全局单例。
