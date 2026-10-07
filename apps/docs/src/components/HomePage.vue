<script setup lang="ts">
import { ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluInput from '@lulu/vue/input'
import LuluSwitch from '@lulu/vue/switch'
import '@lulu/vue/button/style.css'
import '@lulu/vue/input/style.css'
import '@lulu/vue/switch/style.css'
import { withBase } from '../siteUrl'

const features = [
  { mark: '39', title: '丰富的组件', description: '覆盖表单、反馈、导航与布局等常见产品场景。' },
  { mark: 'TS', title: '类型友好', description: '基于 Vue 3 与 TypeScript，获得清晰、可靠的开发体验。' },
  { mark: 'SSG', title: '文档即内容', description: '组件文档静态生成，直达页面也能完整阅读与交互。' },
] as const

// 首页预览卡片直接使用真实组件，可交互即最好的演示
const projectName = ref('LuLu Design')
const isPublic = ref(true)
const created = ref(false)

function createProject() {
  if (created.value) return
  created.value = true
  setTimeout(() => {
    created.value = false
  }, 2000)
}

const installCommand = 'pnpm add @lulu/vue'
const copiedInstall = ref(false)

async function copyInstallCommand() {
  try {
    await navigator.clipboard.writeText(installCommand)
    copiedInstall.value = true
    setTimeout(() => {
      copiedInstall.value = false
    }, 2000)
  }
  catch {
    copiedInstall.value = false
  }
}
</script>

<template>
  <main class="home-page relative flex-1 overflow-hidden bg-[var(--docs-color-page)]">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-112 overflow-hidden" aria-hidden="true">
      <div class="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--lulu-color-primary)] opacity-10 blur-3xl" />
      <div class="absolute -right-16 top-28 h-80 w-80 rounded-full bg-[var(--lulu-color-primary)] opacity-10 blur-3xl" />
    </div>

    <section class="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
      <div class="max-w-2xl">
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)]/75 px-3 py-1.5 text-xs font-semibold text-[var(--lulu-color-primary)] shadow-sm backdrop-blur">
          <span class="h-1.5 w-1.5 rounded-full bg-[var(--lulu-color-primary)]" />
          Vue 3 · TypeScript · 39 个组件
        </div>

        <h1 class="m-0 text-5xl font-extrabold leading-[1.08] tracking-tight text-[var(--docs-color-heading)] sm:text-6xl lg:text-7xl">
          简洁、可靠的
          <span class="block text-[var(--lulu-color-primary)]">
            Vue 组件库
          </span>
        </h1>

        <p class="mb-0 mt-7 max-w-xl text-base leading-7 text-[var(--lulu-color-text)] sm:text-lg sm:leading-8">
          将 LuLu UI 清晰、克制的交互体验带到 Vue 3。提供类型完备、开箱即用的组件，让产品界面更快成形。
        </p>

        <div class="mt-9 flex flex-wrap items-center gap-3">
          <LuluButton
            variant="primary"
            :href="withBase('/components/button/')"
            class="!min-h-11 !rounded-xl !px-5 font-semibold shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
          >
            浏览全部组件
            <span class="i-lucide-arrow-right" aria-hidden="true" />
          </LuluButton>
          <button
            type="button"
            class="group inline-flex h-11 items-center gap-2.5 rounded-xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)] px-4 font-mono text-xs text-[var(--lulu-color-text)] shadow-sm cursor-pointer transition-colors hover:border-[var(--lulu-color-primary)]/50"
            :aria-label="copiedInstall ? '已复制安装命令' : '复制安装命令'"
            aria-live="polite"
            @click="copyInstallCommand"
          >
            <span class="text-[var(--lulu-color-primary)]">$</span>
            {{ installCommand }}
            <span
              class="text-sm text-[var(--lulu-color-text-muted)] transition-colors group-hover:text-[var(--lulu-color-primary)]"
              :class="copiedInstall ? 'i-lucide-check text-[var(--lulu-color-success)]' : 'i-lucide-copy'"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <!-- 组件预览卡片：直接使用真实的 LuluInput / LuluSwitch / LuluButton，可交互 -->
      <div class="relative mx-auto w-full max-w-lg lg:mx-0">
        <div class="absolute -inset-6 rounded-[2.5rem] bg-[var(--lulu-color-primary)] opacity-10 blur-2xl" aria-hidden="true" />
        <div class="relative overflow-hidden rounded-3xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)]/92 p-5 shadow-[0_28px_80px_rgba(15,23,42,0.14)] backdrop-blur sm:p-7">
          <div class="mb-7 flex items-center justify-between">
            <div class="flex gap-1.5" aria-hidden="true">
              <span class="h-2.5 w-2.5 rounded-full bg-[#ff7875]" />
              <span class="h-2.5 w-2.5 rounded-full bg-[#ffc53d]" />
              <span class="h-2.5 w-2.5 rounded-full bg-[#73d13d]" />
            </div>
            <span class="text-[11px] font-medium text-[var(--lulu-color-text-muted)]">COMPONENT PREVIEW</span>
          </div>

          <form class="rounded-2xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-page)] p-5 sm:p-6" @submit.prevent="createProject">
            <p class="m-0 text-sm font-semibold text-[var(--docs-color-heading)]">创建项目</p>
            <p class="mb-5 mt-1 text-xs leading-5 text-[var(--lulu-color-text-muted)]">填写基本信息，开始搭建你的新应用。</p>

            <label for="home-project-name" class="mb-2 block text-xs font-medium text-[var(--lulu-color-text)]">项目名称</label>
            <LuluInput id="home-project-name" v-model="projectName" class="w-full" placeholder="请输入项目名称" />

            <div class="mt-5 flex items-center justify-between rounded-xl bg-[var(--docs-color-container)] px-3.5 py-3">
              <div>
                <p class="m-0 text-xs font-medium text-[var(--docs-color-heading)]">公开项目</p>
                <p class="mb-0 mt-0.5 text-[11px] text-[var(--lulu-color-text-muted)]">允许团队成员访问</p>
              </div>
              <LuluSwitch v-model="isPublic" aria-label="公开项目" />
            </div>

            <LuluButton
              variant="primary"
              native-type="submit"
              class="mt-5 w-full"
              :disabled="!projectName.trim()"
            >
              <span v-if="created" class="i-lucide-check" aria-hidden="true" />
              {{ created ? '创建成功' : '创建项目' }}
            </LuluButton>
          </form>
        </div>
      </div>
    </section>

    <section class="relative mx-auto max-w-7xl px-6 pb-22">
      <div class="grid gap-4 md:grid-cols-3">
        <article v-for="feature in features" :key="feature.title" class="rounded-2xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-container)] p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1">
          <div class="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[var(--lulu-color-surface-selected)] text-lg font-bold text-[var(--lulu-color-primary)]">
            {{ feature.mark }}
          </div>
          <h2 class="m-0 text-base font-bold text-[var(--docs-color-heading)]">{{ feature.title }}</h2>
          <p class="mb-0 mt-2 text-sm leading-6 text-[var(--lulu-color-text)]">{{ feature.description }}</p>
        </article>
      </div>
    </section>
  </main>
</template>
