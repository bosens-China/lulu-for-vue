<script setup lang="ts">
import { ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluInput from '@lulu/vue/input'
import LuluProgress from '@lulu/vue/progress'
import LuluSwitch from '@lulu/vue/switch'
import LuluTab from '@lulu/vue/tab'
import LuluTabPanel from '@lulu/vue/tab-panel'
import LuluTabs from '@lulu/vue/tabs'
import LuluTooltip from '@lulu/vue/tooltip'
import { useMessage } from '@lulu/vue/use-message'
import '@lulu/vue/button/style.css'
import '@lulu/vue/input/style.css'
import '@lulu/vue/progress/style.css'
import '@lulu/vue/switch/style.css'
import '@lulu/vue/tabs/style.css'
import '@lulu/vue/tooltip/style.css'
import { withBase } from '../siteUrl'

const message = useMessage()

function notify(text: string) {
  message.success(text)
}

const features = [
  {
    icon: 'i-lucide-box',
    title: '覆盖日常产品场景',
    description: '从按钮与表单，到数据展示和交互反馈，按需组合你的产品界面。',
  },
  {
    icon: 'i-lucide-file-code-2',
    title: 'TypeScript 优先',
    description: '基于 Vue 3 组合式 API，提供清晰的类型声明与编辑器提示。',
  },
  {
    icon: 'i-lucide-palette',
    title: '原生 CSS Tokens',
    description: '用 CSS 变量调整主色、尺寸与状态样式，支持亮色和深色主题。',
  },
  {
    icon: 'i-lucide-zap',
    title: '文档与示例同行',
    description: '直接体验组件，展开查看 Vue 源码，从示例到使用少走一步。',
  },
] as const

// 交互式组件控制台状态
const activeTab = ref<'form' | 'feedback'>('form')
const projectName = ref('LuLu Vue App')
const isPublic = ref(true)
const created = ref(false)

const demoProgress = ref(68)

function triggerToast() {
  notify('消息提示触发成功')
}

function increaseProgress() {
  demoProgress.value = (demoProgress.value + 15) % 100
}

function createProject() {
  if (created.value) return
  created.value = true
  notify('项目创建成功！')
  setTimeout(() => {
    created.value = false
  }, 2200)
}

const installCommand = 'pnpm add @lulu/vue'
const copiedInstall = ref(false)

async function copyInstallCommand() {
  try {
    await navigator.clipboard.writeText(installCommand)
    copiedInstall.value = true
    notify('已复制安装命令到剪贴板！')
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
    <div class="home-glow" aria-hidden="true" />

    <!-- 1. Hero 区域：左侧标语 + 右侧交互组件展示台 -->
    <section class="home-hero relative mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
      <div class="max-w-2xl">
        <!-- 徽章标签 -->
        <div class="mb-5 flex items-center gap-2 text-sm font-medium text-[var(--lulu-color-text-muted)]">
          <span class="h-1.5 w-1.5 rounded-full bg-[var(--lulu-color-primary)]" />
          <span>Vue 3 · TypeScript · LuLu UI</span>
        </div>

        <!-- 主标题 -->
        <h1 class="home-title m-0 font-bold tracking-tight text-[var(--docs-color-heading)]">
          <span class="home-brand block mb-3">LuLu UI Vue</span>
          简洁、可靠的<br />Vue 组件库
        </h1>

        <!-- 副标题描述 -->
        <p class="mb-0 mt-6 max-w-[440px] text-base leading-relaxed text-[var(--lulu-color-text-muted)] sm:text-lg">
          将 LuLu UI 清晰、克制的交互体验带到 Vue 3。类型友好，按需使用，让界面自然成形。
        </p>

        <!-- 动作操作区 -->
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <LuluButton
            variant="primary"
            :href="withBase('/components/button/')"
            class="home-primary !min-h-11 !rounded-full !px-6 font-semibold"
          >
            浏览全部组件
            <span class="i-lucide-arrow-right ml-1 text-sm" aria-hidden="true" />
          </LuluButton>

          <a
            :href="withBase('/guide/installation/')"
            class="inline-flex h-11 items-center px-6 rounded-full border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-card)] text-sm font-medium text-[var(--lulu-color-text)] hover:border-[var(--lulu-color-primary)] hover:bg-[var(--lulu-color-surface-hover)] transition-colors no-underline"
          >
            快速开始
          </a>

          <!-- 安装命令快速复制 -->
          <button
            type="button"
            class="group mt-2 inline-flex h-11 basis-full max-w-[320px] items-center gap-3 rounded-xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-code)] px-4 font-mono text-sm text-[var(--lulu-color-text)] cursor-pointer transition-colors hover:border-[var(--lulu-color-primary)]"
            :aria-label="copiedInstall ? '已复制安装命令' : '复制安装命令'"
            aria-live="polite"
            @click="copyInstallCommand"
          >
            <span class="text-[var(--lulu-color-primary)] font-bold">$</span>
            <span>{{ installCommand }}</span>
            <span
              class="ml-auto text-sm text-[var(--lulu-color-text-muted)] transition-colors group-hover:text-[var(--lulu-color-primary)]"
              :class="copiedInstall ? 'i-lucide-check text-[var(--lulu-color-success)]' : 'i-lucide-copy'"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <!-- 右侧：交互式 Bento Grid 组件画廊展示台 -->
      <div class="relative mx-auto w-full max-w-lg lg:mx-0">
        <div class="home-preview relative overflow-hidden rounded-2xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-card)] p-5 sm:p-6">
          <!-- 顶部窗口栏 -->
          <div class="mb-5 flex items-center justify-between">
            <div class="flex gap-1.5" aria-hidden="true">
              <span class="h-2.5 w-2.5 rounded-full bg-[#ff7875]" />
              <span class="h-2.5 w-2.5 rounded-full bg-[#ffc53d]" />
              <span class="h-2.5 w-2.5 rounded-full bg-[#73d13d]" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-[var(--lulu-color-text-muted)]">组件 · 即刻体验</span>
            </div>
          </div>

          <!-- 模式切换 Tabs -->
          <LuluTabs v-model="activeTab" class="mb-5" style="--lulu-tabs-border: var(--lulu-color-border-subtle)">
            <template #tabs>
              <LuluTab value="form">表单与输入</LuluTab>
              <LuluTab value="feedback">状态与反馈</LuluTab>
            </template>

            <!-- 面板 1：表单控件联动演示 -->
            <LuluTabPanel value="form">
              <form class="rounded-2xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-card)] p-4 sm:p-5" @submit.prevent="createProject">
                <p class="m-0 text-sm font-semibold text-[var(--docs-color-heading)]">新建产品项目</p>
                <p class="mb-4 mt-1 text-xs text-[var(--lulu-color-text-muted)]">填写配置信息，体验原生可控输入。</p>

                <label for="home-project-name" class="mb-1.5 block text-xs font-medium text-[var(--lulu-color-text)]">应用名称</label>
                <LuluInput id="home-project-name" v-model="projectName" class="w-full !rounded-xl !h-9 text-xs" placeholder="请输入项目名称" />

                <div class="mt-4 flex items-center justify-between rounded-xl bg-[var(--docs-color-card-muted)]/60 px-3.5 py-2.5 border border-[var(--lulu-color-border-subtle)]">
                  <div>
                    <p class="m-0 text-xs font-medium text-[var(--docs-color-heading)]">公开访问</p>
                    <p class="mb-0 mt-0.5 text-[10px] text-[var(--lulu-color-text-muted)]">允许团队成员查看并协作</p>
                  </div>
                  <LuluSwitch v-model="isPublic" aria-label="公开项目" />
                </div>

                <LuluButton
                  variant="primary"
                  native-type="submit"
                  class="mt-4 w-full !h-9.5 !rounded-xl text-xs font-medium"
                  :disabled="!projectName.trim()"
                >
                  <span v-if="created" class="i-lucide-check mr-1" aria-hidden="true" />
                  {{ created ? '创建成功' : '立即创建' }}
                </LuluButton>
              </form>
            </LuluTabPanel>

            <!-- 面板 2：反馈与浮层演示 -->
            <LuluTabPanel value="feedback">
              <div class="rounded-2xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-card)] p-4 sm:p-5 space-y-4">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs font-medium text-[var(--docs-color-heading)]">任务处理进度</span>
                    <span class="text-xs font-mono font-semibold text-[var(--lulu-color-primary)]">{{ demoProgress }}%</span>
                  </div>
                  <LuluProgress :value="demoProgress" :max="100" class="w-full h-2 rounded-full" />
                </div>

                <div class="flex items-center gap-2 pt-1">
                  <LuluButton class="text-xs flex-1 !rounded-xl" @click="increaseProgress">
                    推进进度
                  </LuluButton>
                  <LuluTooltip placement="top">
                    <template #trigger="{ triggerProps }">
                      <LuluButton
                        v-bind="triggerProps"
                        variant="primary"
                        class="text-xs flex-1 !rounded-xl"
                        @click="triggerToast"
                      >
                        弹出轻提示
                      </LuluButton>
                    </template>
                    使用 useMessage 触发 Toast
                  </LuluTooltip>
                </div>
              </div>
            </LuluTabPanel>
          </LuluTabs>
        </div>
      </div>
    </section>

    <!-- 2. 特性亮点网格区域 (Bento Grid) -->
    <section class="relative mx-auto max-w-[1200px] px-6 sm:px-8 pb-20 pt-4" aria-label="产品特性">
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="feature in features"
          :key="feature.title"
          class="group rounded-2xl border border-solid border-[var(--lulu-color-border-subtle)] bg-[var(--docs-color-card)] p-6 transition-colors hover:border-[var(--lulu-color-primary)]"
        >
          <div class="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--lulu-color-surface-selected)] text-[var(--lulu-color-primary)] text-xl transition-transform group-hover:scale-105">
            <span :class="feature.icon" aria-hidden="true" />
          </div>
          <h2 class="m-0 text-base font-bold text-[var(--docs-color-heading)] tracking-tight">
            {{ feature.title }}
          </h2>
          <p class="mb-0 mt-3 text-sm leading-relaxed text-[var(--lulu-color-text-muted)]">
            {{ feature.description }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>
