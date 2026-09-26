<template>
  <main class="home-page relative flex-1 overflow-hidden bg-[var(--lulu-color-bg-page)]">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-112 overflow-hidden" aria-hidden="true">
      <div class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--lulu-color-primary)] opacity-10 blur-3xl" />
      <div class="absolute -right-16 top-28 h-80 w-80 rounded-full bg-[var(--lulu-color-primary)] opacity-10 blur-3xl" />
    </div>

    <section class="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
      <div class="max-w-2xl">
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-bg-container)]/75 px-3 py-1.5 text-xs font-semibold text-[var(--lulu-color-primary)] shadow-sm backdrop-blur">
          <span class="h-1.5 w-1.5 rounded-full bg-[var(--lulu-color-primary)]" />
          Vue 3 · TypeScript · 38 个组件
        </div>

        <h1 class="m-0 text-5xl font-extrabold leading-[1.08] tracking-tight text-[var(--lulu-color-text-heading)] sm:text-6xl lg:text-7xl">
          简洁、可靠的
          <span class="block text-[var(--lulu-color-primary)]">
            Vue 组件库
          </span>
        </h1>

        <p class="mb-0 mt-7 max-w-xl text-base leading-7 text-[var(--lulu-color-text)] sm:text-lg sm:leading-8">
          将 LuLu UI 清晰、克制的交互体验带到 Vue 3。提供类型完备、开箱即用的组件，让产品界面更快成形。
        </p>

        <div class="mt-9 flex flex-wrap items-center gap-3">
          <a
            :href="withBase('/components/button/')"
            class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--lulu-color-primary-solid)] px-5 text-sm font-semibold text-[var(--lulu-color-text-inverse)] shadow-lg text-decoration-none transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
          >
            浏览全部组件
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18 6-6-6-6" />
            </svg>
          </a>
          <code class="inline-flex h-11 items-center rounded-xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-bg-container)] px-4 text-xs text-[var(--lulu-color-text)] shadow-sm">
            pnpm add @lulu/vue
          </code>
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-lg lg:mx-0" aria-hidden="true">
        <div class="absolute -inset-6 rounded-[2.5rem] bg-[var(--lulu-color-primary)] opacity-10 blur-2xl" aria-hidden="true" />
        <div class="relative overflow-hidden rounded-3xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-bg-container)]/92 p-5 shadow-[0_28px_80px_rgba(15,23,42,0.14)] backdrop-blur sm:p-7">
          <div class="mb-7 flex items-center justify-between">
            <div class="flex gap-1.5" aria-hidden="true">
              <span class="h-2.5 w-2.5 rounded-full bg-[#ff7875]" />
              <span class="h-2.5 w-2.5 rounded-full bg-[#ffc53d]" />
              <span class="h-2.5 w-2.5 rounded-full bg-[#73d13d]" />
            </div>
            <span class="text-[11px] font-medium text-[var(--lulu-color-text-muted)]">COMPONENT PREVIEW</span>
          </div>

          <div class="rounded-2xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-bg-page)] p-5 sm:p-6">
            <p class="m-0 text-sm font-semibold text-[var(--lulu-color-text-heading)]">创建项目</p>
            <p class="mb-5 mt-1 text-xs leading-5 text-[var(--lulu-color-text-muted)]">填写基本信息，开始搭建你的新应用。</p>
            <label class="mb-2 block text-xs font-medium text-[var(--lulu-color-text)]">项目名称</label>
            <div class="flex h-10 items-center rounded-lg border border-solid border-[var(--lulu-color-primary)] bg-[var(--lulu-color-bg-container)] px-3 text-sm text-[var(--lulu-color-text-heading)] shadow-sm">
              LuLu Design
            </div>
            <div class="mt-5 flex items-center justify-between rounded-xl bg-[var(--lulu-color-bg-container)] px-3.5 py-3">
              <div>
                <p class="m-0 text-xs font-medium text-[var(--lulu-color-text-heading)]">公开项目</p>
                <p class="mb-0 mt-0.5 text-[11px] text-[var(--lulu-color-text-muted)]">允许团队成员访问</p>
              </div>
              <span class="relative h-5 w-9 rounded-full bg-[var(--lulu-color-primary)]" aria-hidden="true">
                <span class="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm" />
              </span>
            </div>
            <div class="mt-5 h-10 w-full rounded-lg bg-[var(--lulu-color-primary-solid)] text-sm font-semibold text-[var(--lulu-color-text-inverse)] shadow-sm flex items-center justify-center">
              创建项目
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative mx-auto max-w-7xl px-6 pb-22">
      <div class="grid gap-4 md:grid-cols-3">
        <article v-for="feature in features" :key="feature.title" class="rounded-2xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--lulu-color-bg-container)] p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1">
          <div class="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[var(--lulu-color-surface-selected)] text-lg font-bold text-[var(--lulu-color-primary)]">
            {{ feature.mark }}
          </div>
          <h2 class="m-0 text-base font-bold text-[var(--lulu-color-text-heading)]">{{ feature.title }}</h2>
          <p class="mb-0 mt-2 text-sm leading-6 text-[var(--lulu-color-text)]">{{ feature.description }}</p>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { withBase } from '../siteUrl'
const features = [
  { mark: '38', title: '丰富的组件', description: '覆盖表单、反馈、导航与布局等常见产品场景。' },
  { mark: 'TS', title: '类型友好', description: '基于 Vue 3 与 TypeScript，获得清晰、可靠的开发体验。' },
  { mark: 'SSG', title: '文档即内容', description: '组件文档静态生成，直达页面也能完整阅读与交互。' },
] as const
</script>
