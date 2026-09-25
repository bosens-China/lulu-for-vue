---
title: 按需引入
description: 按组件引入 LuLu UI Vue，避免全量组件和样式进入应用。
seo:
  keywords: [LuLu UI Vue 按需引入, 自动导入, tree shaking]
---

# 按需引入

每个组件都有独立的 JavaScript 入口和样式出口。只引入实际使用的组件时，构建器可以跳过未引用的模块。

## 手动引入

```vue
<script setup lang="ts">
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/base.css'
import '@lulu/vue/button/style.css'
</script>

<template>
  <LuluButton variant="primary">提交</LuluButton>
</template>
```

`base.css` 提供 token 与基础样式；组件样式出口只包含该组件所属样式组。相同 CSS 路径被多处导入时由构建器合并。

## 自动导入

在使用 `unplugin-vue-components` 的 Vite 项目中，可以加入组件包提供的 resolver：

```ts
import Components from 'unplugin-vue-components/vite'
import { LuluResolver } from '@lulu/vue/resolver'

export default {
  plugins: [Components({ resolvers: [LuluResolver()] })],
}
```

resolver 会为识别到的 `Lulu*` 组件补充独立入口与样式。需要自动导入 `useMessage`、`useFormValidation` 时，可使用同一出口的 `LuluApiResolver()` 配合 `unplugin-auto-import`。

## 整体引入

如果项目希望从根入口导入多个组件，可以使用 `import { LuluButton } from '@lulu/vue'` 与 `import '@lulu/vue/style.css'`。组件包保留独立入口，方便按页面或业务模块逐步调整。
