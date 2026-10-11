<script setup lang="ts">
import { computed, nextTick, onMounted, shallowRef, watch } from 'vue'
import {
  LuluAutocomplete, LuluButton, LuluDialog, LuluDropdown, LuluInput,
  LuluLoading, LuluPopover, LuluSwitch, LuluTab, LuluTabPanel, LuluTabs, LuluTooltip,
  type FloatingPlacement,
} from '@lulu/vue'

interface Check { name: string; passed: boolean; detail: string }
const checks = shallowRef<Check[]>([])
const activeTab = shallowRef('theme')
const text = shallowRef('主题输入')
const enabled = shallowRef(true)
const dialogOpen = shallowRef(false)
const tooltipOpen = shallowRef(false)
const dropdownOpen = shallowRef(false)
const autocompleteOpen = shallowRef(false)
const popoverOpen = shallowRef(false)
const query = shallowRef('')
const placement = shallowRef<FloatingPlacement>('bottom-start')
const offset = shallowRef(8)
const selected = shallowRef('尚未选择')
const items = [{ value: 'vue', label: 'Vue' }, { value: 'vite', label: 'Vite' }]
const summary = computed(() => `${checks.value.filter(check => check.passed).length}/${checks.value.length} 通过`)
const report = computed(() => checks.value.map(check => `${check.passed ? 'PASS' : 'FAIL'} ${check.name}：${check.detail}`).join('\n'))
let checking = false

function frame() {
  return new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
}

async function inspect(openAll = false) {
  if (openAll) {
    dialogOpen.value = true
    await nextTick()
    tooltipOpen.value = dropdownOpen.value = autocompleteOpen.value = popoverOpen.value = true
  }
  if (checking) return
  checking = true
  try {
    await nextTick()
    await frame()
    await frame()
    const switchTrack = document.querySelector('.lulu-switch__track')
    await Promise.all(switchTrack?.getAnimations().map(animation => animation.finished.catch(() => undefined)) ?? [])
    const results: Check[] = []
    const add = (name: string, passed: boolean, detail: string) => results.push({ name, passed, detail })
    const styleIs = (name: string, selector: string, property: string, expected: string) => {
      const element = document.querySelector(selector)
      const actual = element ? getComputedStyle(element).getPropertyValue(property) : '元素不存在'
      add(name, actual === expected, `${property}=${actual}；期望 ${expected}`)
    }
    for (const [name, selector] of [
      ['Button', '#contract-primary'], ['Input', '#contract-input'], ['Tab', '#contract-tabs .lulu-tab'],
      ['Loading', '#contract-loading'], ['Switch', '#contract-switch + .lulu-switch__track'],
    ]) styleIs(`${name} 继承字体`, selector!, 'font-size', '18px')
    styleIs('Button 继承局部主色', '#contract-primary', 'background-color', 'rgb(124, 58, 237)')
    styleIs('Tab 继承局部主色', '#contract-tabs [aria-selected="true"]', 'color', 'rgb(124, 58, 237)')
    styleIs('Loading 继承局部主色', '#contract-loading .lulu-loading__indicator', 'color', 'rgb(124, 58, 237)')
    styleIs('Switch 选中主色', '#contract-switch + .lulu-switch__track', 'background-color', enabled.value ? 'rgb(124, 58, 237)' : 'rgb(76, 81, 97)')
    styleIs('禁用 Button 继承透明度', '#contract-disabled', 'opacity', '0.3')
    styleIs('Tabs 根 token 到达面板', '#contract-tabs .lulu-tab-panel', 'padding-top', '23px')
    add('触发器无嵌套按钮', !document.querySelector('button button'), 'button button 数量应为 0')
    const dialog = document.querySelector<HTMLDialogElement>('#contract-dialog')
    if (dialogOpen.value) {
      add('Dialog 使用原生模态层', Boolean(dialog?.matches(':modal')), `open=${dialog?.open}`)
      const layers = [
        ['Tooltip', tooltipOpen.value, '.lulu-tooltip', '#contract-tooltip-trigger'],
        ['Dropdown', dropdownOpen.value, '.lulu-dropdown__menu', '[data-testid="contract-dropdown-trigger"]'],
        ['Autocomplete', autocompleteOpen.value, '.lulu-autocomplete__list', '#contract-autocomplete'],
        ['Popover', popoverOpen.value, '.lulu-popover__panel', '[data-testid="contract-popover-trigger"]'],
      ] as const
      for (const [name, open, selector, triggerSelector] of layers) {
        if (!open) continue
        const panel = document.querySelector<HTMLElement>(selector)
        const trigger = document.querySelector<HTMLElement>(triggerSelector)
        add(`${name} 保留在 Dialog 内`, Boolean(panel && dialog?.contains(panel)), panel?.parentElement?.tagName ?? '浮层不存在')
        if (!panel || !trigger) continue
        const panelRect = panel.getBoundingClientRect()
        const triggerRect = trigger.getBoundingClientRect()
        const expectedTop = placement.value.startsWith('top')
          ? triggerRect.top - panelRect.height - offset.value
          : triggerRect.bottom + offset.value
        const boundedTop = Math.min(Math.max(expectedTop, offset.value), Math.max(offset.value, innerHeight - panelRect.height - offset.value))
        add(`${name} 响应 placement/offset`, Math.abs(panelRect.top - boundedTop) < 2, `top=${panelRect.top.toFixed(1)}；期望 ${boundedTop.toFixed(1)}；${placement.value}/${offset.value}`)
        add(`${name} 面板可见`, panelRect.width > 0 && panelRect.height > 0, `${panelRect.width.toFixed(0)}×${panelRect.height.toFixed(0)}`)
        if (name !== 'Tooltip') styleIs(`${name} 浮层继承字体`, selector, 'font-size', '18px')
      }
      const trigger = document.querySelector('[data-testid="contract-popover-trigger"]')
      add('Popover 使用单个 LuluButton', trigger?.classList.contains('lulu-button') === true && trigger.tagName === 'BUTTON', trigger?.outerHTML.split('>')[0] ?? '触发器不存在')
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      styleIs('Button 减少动画', '#contract-loading-button .lulu-button__loading', 'animation-name', 'none')
      styleIs('Loading 减少动画', '#contract-loading .lulu-loading__indicator', 'animation-name', 'none')
    }
    checks.value = results
    document.title = `${results.every(result => result.passed) ? 'PASS' : 'FAIL'} ${summary.value} · LuLu 浏览器回归`
  } finally {
    checking = false
  }
}

function changePlacement() {
  placement.value = placement.value === 'bottom-start' ? 'top-start' : 'bottom-start'
}

async function inspectFocus() {
  const input = document.querySelector<HTMLInputElement>(dialogOpen.value ? '#contract-dialog-input' : '#contract-input')
  input?.focus()
  await frame()
  await Promise.all(input?.getAnimations().map(animation => animation.finished.catch(() => undefined)) ?? [])
  const shadow = input ? getComputedStyle(input).boxShadow : '元素不存在'
  const name = 'Input 焦点环继承局部主色'
  checks.value = [...checks.value.filter(check => check.name !== name), {
    name,
    passed: document.activeElement === input && shadow.includes('rgb(124, 58, 237)'),
    detail: `focus=${document.activeElement === input}；box-shadow=${shadow}`,
  }]
  document.title = `${checks.value.every(check => check.passed) ? 'PASS' : 'FAIL'} ${summary.value} · LuLu 浏览器回归`
}

watch([dialogOpen, tooltipOpen, dropdownOpen, autocompleteOpen, popoverOpen, activeTab, enabled, placement, offset], () => { void inspect() }, { flush: 'post' })
onMounted(() => { void inspect() })
</script>

<template>
  <main class="contract-theme mx-auto grid max-w-5xl gap-5 p-5" data-lulu-theme="light">
    <header>
      <h1 class="m-0 text-2xl font-bold">主题与浮层浏览器回归</h1>
      <p>局部容器：字体 18px，主色 #7c3aed，禁用透明度 0.3。此页面不进入生产路由。</p>
    </header>
    <section class="flex flex-wrap items-center gap-3" aria-label="主题控件">
      <LuluButton id="contract-primary" variant="primary">局部主色按钮</LuluButton>
      <LuluButton id="contract-disabled" disabled>禁用按钮</LuluButton>
      <LuluButton id="contract-loading-button" loading>加载按钮</LuluButton>
      <LuluLoading id="contract-loading" />
      <LuluSwitch id="contract-switch" v-model="enabled">主题开关</LuluSwitch>
      <LuluInput id="contract-input" v-model="text" aria-label="主题输入" />
    </section>
    <section id="contract-tabs">
      <LuluTabs v-model="activeTab" style="--lulu-tab-panel-padding-block: 23px" aria-label="回归标签">
        <template #tabs>
          <LuluTab value="theme">主题继承</LuluTab><LuluTab value="flow">交互状态</LuluTab>
        </template>
        <LuluTabPanel value="theme">面板应继承 Tabs 根容器上的 23px 内边距。</LuluTabPanel>
        <LuluTabPanel value="flow">切换标签后，选中主色仍是局部紫色。</LuluTabPanel>
      </LuluTabs>
    </section>
    <section class="flex flex-wrap gap-3" aria-label="检查操作">
      <LuluButton @click="inspect()">刷新自检</LuluButton>
      <LuluButton variant="normal" @click="inspectFocus">验证 Input 焦点环</LuluButton>
      <LuluButton variant="primary" @click="dialogOpen = true">打开对话框</LuluButton>
      <LuluButton variant="normal" @click="inspect(true)">打开全部浮层并自检</LuluButton>
    </section>
    <section aria-live="polite">
      <strong id="contract-summary">{{ summary }}</strong>
      <pre id="contract-report" class="contract-report">{{ report }}</pre>
    </section>
    <LuluDialog id="contract-dialog" v-model:open="dialogOpen" title="模态框内浮层回归" style="--lulu-dialog-width: 900px">
      <div class="grid gap-5">
        <div class="flex flex-wrap gap-3" @pointerdown.stop>
          <LuluButton variant="normal" @click="changePlacement">切换 placement</LuluButton>
          <LuluButton variant="normal" @click="offset = offset === 8 ? 24 : 8">切换 offset</LuluButton>
          <LuluButton @click="inspect(true)">打开全部浮层并自检</LuluButton>
          <LuluButton @click="inspect()">刷新自检</LuluButton>
          <LuluButton variant="normal" @click="inspectFocus">验证 Input 焦点环</LuluButton>
        </div>
        <output>{{ placement }} / offset={{ offset }}；已选：{{ selected }}；输入：{{ query || '空' }}</output>
        <LuluInput id="contract-dialog-input" v-model="text" aria-label="模态内焦点环输入" />
        <div class="contract-layer-controls">
          <LuluTooltip v-model:open="tooltipOpen" trigger="click" :placement="placement" :offset="offset">
            <template #trigger="{ triggerProps }"><LuluButton id="contract-tooltip-trigger" v-bind="triggerProps" variant="normal">Tooltip 提示</LuluButton></template>
            对话框内的提示
          </LuluTooltip>
          <LuluDropdown v-model:open="dropdownOpen" :items="items" :placement="placement" :offset="offset" @select="selected = $event.value.toString()">
            <template #trigger="{ triggerProps }"><LuluButton v-bind="triggerProps" data-testid="contract-dropdown-trigger" variant="normal">Dropdown 菜单</LuluButton></template>
          </LuluDropdown>
          <LuluAutocomplete id="contract-autocomplete" v-model="query" v-model:open="autocompleteOpen" :items="items" :placement="placement" :offset="offset" aria-label="模态内自动完成" @select="selected = $event.value" />
          <LuluPopover v-model:open="popoverOpen" :placement="placement" :offset="offset" :close-on-outside="false">
            <template #trigger="{ triggerProps }"><LuluButton v-bind="triggerProps" data-testid="contract-popover-trigger" variant="normal">Popover 自定义按钮</LuluButton></template>
            <p class="m-0 mb-3">内容与触发按钮都应可交互。</p>
            <LuluButton variant="primary" @click="selected = 'popover-action'">记录浮层操作</LuluButton>
          </LuluPopover>
        </div>
        <p class="m-0 text-sm">控制条保留全部浮层的打开状态，可直接切换 placement/offset 检查运行中的重定位；逐个选择候选项可检查交互。</p>
        <strong>{{ summary }}</strong>
        <pre class="contract-report">{{ report }}</pre>
      </div>
    </LuluDialog>
  </main>
</template>

<style scoped>
.contract-theme {
  --lulu-font-size: 18px;
  --lulu-color-primary: #7c3aed;
  --lulu-opacity-disabled: 0.3;
  font: var(--lulu-font-size)/1.5 system-ui, sans-serif;
}
.contract-report { background: #f7f9fa; border: 1px solid #d1d5db; font: 12px/1.6 ui-monospace, monospace; margin: 0; max-height: 28vh; overflow: auto; padding: 10px; white-space: pre-wrap; }
.contract-layer-controls { align-items: start; display: grid; gap: 24px; grid-template-columns: repeat(2, minmax(0, 1fr)); padding-block: 80px; }
@media (max-width: 640px) { .contract-layer-controls { grid-template-columns: 1fr; padding-block: 48px; } }
</style>
