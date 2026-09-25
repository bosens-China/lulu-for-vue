---
title: 快速开始
description: 在 Vue 3 的 script setup 页面中使用 LuLu UI Vue。
seo:
  keywords: [LuLu UI Vue 快速开始, Vue script setup]
---

# 快速开始

LuLu UI Vue 使用 Vue 3 Composition API。以下示例可以放入任意 `.vue` 页面。

## 使用组件

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { LuluButton, LuluInput } from '@lulu/vue'
import '@lulu/vue/style.css'

const name = ref('')
</script>

<template>
  <LuluInput v-model="name" placeholder="输入名称" />
  <LuluButton variant="primary">你好，{{ name || 'LuLu' }}</LuluButton>
</template>
```

## 浏览组件

各组件页面包含可运行示例、Props、Events 和 Slots。可以从[Button 按钮](../../components/button/)开始，再查看[Input 输入框](../../components/input/)。

## 继续阅读

- [主题定制](../theme/)：覆盖颜色、边框和尺寸 token。
- [按需引入](../on-demand/)：只导入所用组件及样式。
