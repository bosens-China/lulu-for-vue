<script setup lang="ts">
import { computed, ref } from 'vue'
import LuluButton from '@lulu/vue/button'
import LuluColorPicker from '@lulu/vue/color-picker'
import LuluInput from '@lulu/vue/input'
import LuluSelect from '@lulu/vue/select'
import '@lulu/vue/input/style.css'
import '@lulu/vue/select/style.css'
import { useTheme } from '../useTheme'
import { withBase } from '../siteUrl'
import { globalThemeTokens, tokenCategories } from '../themeTokens'
import type { ThemeToken } from '../themeTokens'
import { editorDefaults, overrideCss, resetTokenOverrides, setTokenOverride, tokenOverrides } from '../tokenOverrides'

const { isDark } = useTheme()
const emit = defineEmits<{ navigate: [] }>()
const mode = computed(() => isDark.value ? 'dark' : 'light')
const category = ref('颜色')
const query = ref('')
const status = ref('')
const drafts = ref<Record<string, string>>({})
const errors = ref<Record<string, string>>({})
const visibleTokens = computed(() => globalThemeTokens.filter(token => token.category === category.value
  && `${token.name} ${token.description}`.toLowerCase().includes(query.value.trim().toLowerCase())))
const changes = computed(() => Object.keys(tokenOverrides.value.light).length + Object.keys(tokenOverrides.value.dark).length)
const css = computed(() => overrideCss())

function key(token: ThemeToken) { return `${mode.value}:${token.name}` }
function value(token: ThemeToken) { return drafts.value[key(token)] ?? tokenOverrides.value[mode.value][token.name] ?? '' }
function update(token: ThemeToken, next: string) {
  drafts.value[key(token)] = next
  errors.value[key(token)] = setTokenOverride(mode.value, token, next) ? '' : `请输入有效的 ${token.property} 值`
  status.value = ''
}
function reset(token: ThemeToken) {
  delete drafts.value[key(token)]
  delete errors.value[key(token)]
  setTokenOverride(mode.value, token, '')
}
function resetAll() {
  resetTokenOverrides()
  drafts.value = {}
  errors.value = {}
  status.value = '已恢复全部全局变量；主色快捷设置仍保留。'
}
async function copyCss() {
  try {
    await navigator.clipboard.writeText(css.value)
    status.value = '已复制 CSS，请放在组件样式之后。'
  } catch {
    status.value = '无法访问剪贴板，请从下方选中并复制 CSS。'
  }
}
</script>

<template>
  <section :style="editorDefaults(mode)" class="docs-token-editor space-y-4" aria-label="全局 CSS Token 设置">
    <div class="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--lulu-color-border-subtle)] pt-5">
      <span class="font-semibold">全局 CSS Tokens <span class="text-xs font-normal text-[var(--docs-color-muted)]">{{ globalThemeTokens.length }} 项</span></span>
      <span class="text-xs text-[var(--docs-color-muted)]">正在编辑{{ mode === 'dark' ? '深色' : '浅色' }}主题</span>
    </div>
    <p class="text-xs leading-6 text-[var(--docs-color-muted)]">输入有效 CSS 值后即时预览，留空恢复继承值。明暗主题分别设置；手动覆盖优先于主色快捷设置，仅当前页面有效，刷新后恢复。</p>
    <div class="flex flex-wrap gap-2">
      <LuluSelect v-model="category" aria-label="Token 分组" class="!min-w-0 !w-auto">
        <option v-for="item in tokenCategories" :key="item">{{ item }}</option>
      </LuluSelect>
      <LuluInput v-model="query" aria-label="筛选全局变量" placeholder="搜索变量名或用途" class="min-w-0 flex-1 !text-base" />
    </div>
    <div :key="`${category}:${query}`" class="max-h-60 overflow-y-auto pr-1">
      <div v-for="token in visibleTokens" :key="key(token)" class="border-b border-[var(--lulu-color-border-subtle)] py-3">
        <label :for="`edit-${token.name}`" class="block text-xs text-[var(--lulu-color-text)]">
          <span class="block font-mono break-all">{{ token.name }}</span>
          <span class="mt-1 block text-[var(--docs-color-muted)]">{{ token.description }}</span>
        </label>
        <div class="mt-2 flex items-center gap-2">
          <LuluColorPicker
            v-if="token.property === 'color' && /^#[\da-f]{6}$/i.test(value(token) || token[mode])"
            :model-value="value(token) || (token[mode].startsWith('#') ? token[mode] : '#1668c7')"
            :label="`${token.name} 选色`"
            @update:model-value="update(token, $event)"
          />
          <span v-else-if="token.property === 'color'" class="h-6 w-6 shrink-0 rounded border border-[var(--lulu-color-border-subtle)]" :style="{ background: value(token) || token[mode] }" aria-hidden="true" />
          <LuluInput
            :id="`edit-${token.name}`"
            :model-value="value(token)"
            :placeholder="token[mode]"
            :invalid="!!errors[key(token)]"
            :aria-describedby="`hint-${token.name}`"
            class="min-w-0 flex-1 !text-base"
            @update:model-value="update(token, String($event ?? ''))"
          />
          <LuluButton variant="normal" :aria-label="`恢复 ${token.name}`" class="!min-w-0 !px-2" @click="reset(token)">恢复</LuluButton>
        </div>
        <p :id="`hint-${token.name}`" :role="errors[key(token)] ? 'alert' : undefined" class="mt-1 break-all text-xs text-[var(--docs-color-muted)]">{{ errors[key(token)] || `默认：${token[mode]}` }}</p>
      </div>
      <p v-if="!visibleTokens.length" class="py-6 text-center text-sm">没有匹配的变量</p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <LuluButton variant="normal" :disabled="!changes" @click="resetAll">恢复全部变量</LuluButton>
      <LuluButton variant="primary" :disabled="!changes" @click="copyCss">复制 CSS（{{ changes }} 项）</LuluButton>
      <a :href="withBase('/guide/theme/#全局-css-token-清单')" class="ml-auto text-xs text-[var(--docs-color-muted)]" @click="emit('navigate')">查看完整清单</a>
    </div>
    <details v-if="css" class="text-xs">
      <summary class="cursor-pointer text-[var(--docs-color-muted)]">查看覆盖 CSS</summary>
      <pre class="mt-2 max-h-36 overflow-auto rounded border border-[var(--lulu-color-border-subtle)] p-3 text-xs" aria-label="主题覆盖 CSS">{{ css }}</pre>
    </details>
    <p v-if="status" role="status" class="text-xs text-[var(--docs-color-muted)]">{{ status }}</p>
  </section>
</template>
