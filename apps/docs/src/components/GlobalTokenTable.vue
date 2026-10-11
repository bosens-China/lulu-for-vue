<script setup lang="ts">
import { globalThemeTokens, tokenCategories } from '../themeTokens'
</script>

<template>
  <div class="docs-global-token-table">
    <p>共 {{ globalThemeTokens.length }} 个公开全局变量。默认值直接读取组件包主题；标记“可选”的变量在组件使用处回退，不在根主题预设。</p>
    <section v-for="category in tokenCategories" :key="category">
      <h3>{{ category }}</h3>
      <div class="docs-table-scroll docs-token-table" role="region" :aria-label="`${category}全局变量`" tabindex="0">
        <table>
          <thead><tr><th>Token</th><th>用途</th><th>浅色默认值</th><th>深色默认值</th></tr></thead>
          <tbody>
            <tr v-for="token in globalThemeTokens.filter(item => item.category === category)" :key="token.name">
              <td><code>{{ token.name }}</code><span v-if="token.optional" class="block text-xs">可选</span></td>
              <td>{{ token.description }}</td>
              <td><code>{{ token.light }}</code></td>
              <td><code>{{ token.dark }}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
