---
title: 安装
description: 安装 LuLu UI Vue，并引入组件与样式。
seo:
  keywords: [LuLu UI Vue 安装, Vue 3 组件库]
---

# 安装

LuLu UI Vue 面向 Vue 3 项目。安装后可以整体引入，也可以按组件引入。

## 安装依赖

```bash
pnpm add @lulu/vue
```

Vue 3 是 peer dependency；项目中还需要安装 `vue`。

## 引入样式

整体使用时，在应用入口引入完整样式：

```ts
import '@lulu/vue/style.css'
```

按需使用时，先引入基础 token，再引入所用组件的样式。具体示例见[按需引入](../on-demand/)。

## 下一步

阅读[快速开始](../quick-start/)，在页面中渲染第一个组件。
