<script setup lang="ts">
import { computed, onMounted, reactive, shallowRef, watch } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluInput from '@lulu/vue/input'
import '@lulu/vue/button/style.css'
import '@lulu/vue/input/style.css'

type Mode = 'light' | 'dark'
type ColorKey = 'primary' | 'primarySolid' | 'page' | 'surface' | 'text' | 'border'
type Palette = Record<ColorKey, string>

const defaults: Record<Mode, Palette> = {
  light: {
    primary: '#2a80eb',
    primarySolid: '#0057c3',
    page: '#f7f9fa',
    surface: '#ffffff',
    text: '#4c5161',
    border: '#d0d0d5',
  },
  dark: {
    primary: '#38bdf8',
    primarySolid: '#38bdf8',
    page: '#000000',
    surface: '#09090b',
    text: '#f4f4f5',
    border: '#3f3f46',
  },
}

const controls: { key: ColorKey, label: string }[] = [
  { key: 'primary', label: '主题强调色' },
  { key: 'primarySolid', label: '主按钮底色' },
  { key: 'page', label: '页面背景' },
  { key: 'surface', label: '组件表面' },
  { key: 'text', label: '正文颜色' },
  { key: 'border', label: '边框颜色' },
]

const palettes = reactive<Record<Mode, Palette>>(structuredClone(defaults))
const mode = shallowRef<Mode>('light')
const inputValue = shallowRef('示例输入')
const copyStatus = shallowRef('')
const storageStatus = shallowRef('')
const storageKey = 'lulu-docs-palette-v1'
const palette = computed(() => palettes[mode.value])

onMounted(() => {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
    if (saved && typeof saved === 'object') {
      const data = saved as Record<string, unknown>
      if (data.mode === 'light' || data.mode === 'dark') mode.value = data.mode
      for (const theme of ['light', 'dark'] as const) {
        const colors = data[theme]
        if (!colors || typeof colors !== 'object') continue
        for (const { key } of controls) {
          const value = (colors as Record<string, unknown>)[key]
          if (typeof value === 'string' && /^#[\da-f]{6}$/i.test(value)) palettes[theme][key] = value
        }
      }
    }
  } catch {
    storageStatus.value = '无法读取已保存的配色，当前使用默认值。'
  }
})

watch([palettes, mode], () => {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ ...palettes, mode: mode.value }))
    storageStatus.value = '配色已保存在此浏览器'
  } catch {
    storageStatus.value = '此浏览器无法保存配色，仍可预览和复制 CSS。'
  }
}, { deep: true })

// 主按钮前景色按当前底色选黑或白，避免试色时把文字变成不可读。
function contrastText(hex: string): string {
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255)
  const [red = 0, green = 0, blue = 0] = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722
  return luminance > 0.179 ? '#000000' : '#ffffff'
}

function variables(colors: Palette): Record<string, string> {
  return {
    '--lulu-color-primary': colors.primary,
    '--lulu-color-primary-solid': colors.primarySolid,
    '--lulu-color-bg-page': colors.page,
    '--lulu-color-bg-container': colors.surface,
    '--lulu-color-surface': colors.surface,
    '--lulu-color-text': colors.text,
    '--lulu-color-text-heading': colors.text,
    '--lulu-color-text-inverse': contrastText(colors.primarySolid),
    '--lulu-color-border': colors.border,
  }
}

const previewStyle = computed(() => variables(palette.value))
const cssCode = computed(() => {
  const blocks = (['light', 'dark'] as const).map((theme) => {
    const selector = theme === 'light' ? ":root, [data-lulu-theme='light']" : "[data-lulu-theme='dark']"
    const lines = Object.entries(variables(palettes[theme]))
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n')
    return `${selector} {\n${lines}\n}`
  }).join('\n\n')
  const autoDark = Object.entries(variables(palettes.dark))
    .map(([name, value]) => `    ${name}: ${value};`)
    .join('\n')
  return `${blocks}\n\n@media (prefers-color-scheme: dark) {\n  :root:where(:not([data-lulu-theme])) {\n${autoDark}\n  }\n}`
})

function updateColor(key: ColorKey, event: Event) {
  const target = event.target
  if (target instanceof HTMLInputElement) {
    palettes[mode.value][key] = target.value
    if (key === 'primary') palettes[mode.value].primarySolid = target.value
  }
  copyStatus.value = ''
}

function resetColors() {
  Object.assign(palettes[mode.value], defaults[mode.value])
  copyStatus.value = ''
}

async function copyCss() {
  try {
    await navigator.clipboard.writeText(cssCode.value)
    copyStatus.value = 'CSS 已复制'
  } catch {
    copyStatus.value = '复制失败，请手动选取下方代码'
  }
}
</script>

<template>
  <section class="theme-playground" aria-label="在线主题调色盘">
    <p class="px-4 pt-4 text-sm">分别编辑明暗配色；预览仅作用于下方组件，复制 CSS 后用于项目。</p>
    <p v-if="storageStatus" class="px-4 pt-2 text-sm" role="status">{{ storageStatus }}</p>
    <div class="theme-playground__toolbar">
      <div class="theme-playground__modes" role="group" aria-label="预览主题">
        <button v-for="item in (['light', 'dark'] as const)" :key="item" type="button" :aria-pressed="mode === item" @click="mode = item">
          {{ item === 'light' ? '浅色' : '深色' }}
        </button>
      </div>
      <button type="button" class="theme-playground__reset" @click="resetColors">恢复当前主题默认值</button>
    </div>

    <div class="theme-playground__controls">
      <label v-for="control in controls" :key="control.key" class="theme-playground__control">
        <span>{{ control.label }}</span>
        <span class="theme-playground__control-value">
          <input type="color" :aria-label="control.label" :value="palette[control.key]" @input="updateColor(control.key, $event)">
          <code>{{ palette[control.key] }}</code>
        </span>
      </label>
    </div>

    <div class="theme-playground__preview" :data-lulu-theme="mode" :style="previewStyle">
      <div class="theme-playground__card">
        <strong>组件预览</strong>
        <p>切换模式或调整上方色盘，观察组件的实际 token 效果。</p>
        <div class="theme-playground__examples">
          <LuluButton variant="primary">主要操作</LuluButton>
          <LuluButton variant="normal">次要操作</LuluButton>
          <LuluInput v-model="inputValue" aria-label="主题预览输入" />
        </div>
        <a href="#theme-css">查看生成的 CSS</a>
      </div>
    </div>

    <div id="theme-css" class="theme-playground__export">
      <div class="theme-playground__export-head">
        <strong>可复制的 CSS 变量</strong>
        <button type="button" @click="copyCss">复制 CSS</button>
      </div>
      <p v-if="copyStatus" role="status">{{ copyStatus }}</p>
      <pre tabindex="0" aria-label="主题 CSS 代码"><code>{{ cssCode }}</code></pre>
    </div>
  </section>
</template>

<style scoped>
.theme-playground {
  border: 1px solid var(--lulu-color-border);
  border-radius: var(--lulu-radius-lg);
  overflow: hidden;
}
.theme-playground__toolbar,
.theme-playground__export-head {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
}
.theme-playground__toolbar,
.theme-playground__controls,
.theme-playground__export { padding: 16px; }
.theme-playground__modes { display: flex; gap: 4px; }
.theme-playground__modes button,
.theme-playground__reset,
.theme-playground__export button {
  border: 1px solid var(--lulu-color-border);
  border-radius: var(--lulu-radius);
  cursor: pointer;
  min-height: 36px;
  padding: 6px 12px;
}
.theme-playground__modes button[aria-pressed='true'] {
  background: var(--lulu-color-primary-solid);
  color: var(--lulu-color-text-inverse);
}
.theme-playground__controls {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
}
.theme-playground__control {
  align-items: center;
  border: 1px solid var(--lulu-color-border-subtle);
  border-radius: var(--lulu-radius);
  display: flex;
  justify-content: space-between;
  min-height: 54px;
  padding: 8px 10px;
}
.theme-playground__control-value { align-items: center; display: flex; gap: 8px; }
.theme-playground__control input { border: 0; cursor: pointer; height: 34px; width: 40px; }
.theme-playground__preview { background: var(--lulu-color-bg-page); color: var(--lulu-color-text); padding: 20px; }
.theme-playground__card {
  background: var(--lulu-color-bg-container);
  border: 1px solid var(--lulu-color-border);
  border-radius: var(--lulu-radius-lg);
  max-width: 620px;
  padding: 20px;
}
.theme-playground__card strong { color: var(--lulu-color-text-heading); }
.theme-playground__card p { color: var(--lulu-color-text); margin: 8px 0 16px; }
.theme-playground__card a { color: var(--lulu-color-primary); display: inline-block; margin-top: 16px; }
.theme-playground__examples { align-items: center; display: flex; flex-wrap: wrap; gap: 10px; }
.theme-playground__examples .lulu-input { min-width: 160px; width: min(100%, 220px); }
.theme-playground__export pre { max-height: 260px; overflow: auto; margin-top: 12px; }
</style>
