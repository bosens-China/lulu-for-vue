<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface PrimaryColor {
  hex: string
  hue: number
  saturation: number
  lightnessLight: number
  lightnessDark: number
}

const storageKey = 'lulu-docs-primary-v1'
const defaultColor = '#2a80eb'
const color = ref(defaultColor)
const storageStatus = ref('')

function luminance(hue: number, saturation: number, lightness: number): number {
  const chroma = saturation * Math.min(lightness, 1 - lightness)
  const channels = [0, 8, 4].map((offset) => {
    const sector = (offset + hue / 30) % 12
    const value = lightness - chroma * Math.max(-1, Math.min(sector - 3, 9 - sector, 1))
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return (channels[0] ?? 0) * 0.2126 + (channels[1] ?? 0) * 0.7152 + (channels[2] ?? 0) * 0.0722
}

// 同一色相在明暗背景上分别取可读的明度，保留按钮文字的对比度。
function readableLightness(hue: number, saturation: number, dark: boolean): number {
  let low = 0
  let high = 1
  for (let index = 0; index < 12; index++) {
    const middle = (low + high) / 2
    const value = luminance(hue, saturation, middle)
    const contrast = dark ? (value + 0.05) / 0.05 : 1.05 / (value + 0.05)
    if (dark ? contrast >= 5 : contrast < 5) high = middle
    else low = middle
  }
  return dark ? Math.ceil(Math.max(high, 0.65) * 100) : Math.floor(Math.min(low, 0.5) * 100)
}

function primaryFromHex(hex: string): PrimaryColor {
  const [red = 0, green = 0, blue = 0] = [1, 3, 5].map(index => Number.parseInt(hex.slice(index, index + 2), 16) / 255)
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const delta = max - min
  const lightness = (max + min) / 2
  let hue = 0
  if (delta !== 0) {
    if (max === red) hue = ((green - blue) / delta) % 6
    else if (max === green) hue = (blue - red) / delta + 2
    else hue = (red - green) / delta + 4
  }
  hue = Math.round((hue * 60 + 360) % 360) % 360
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
  return {
    hex,
    hue,
    saturation: Math.round(saturation * 100),
    lightnessLight: readableLightness(hue, saturation, false),
    lightnessDark: readableLightness(hue, saturation, true),
  }
}

function applyPrimary(primary: PrimaryColor): void {
  const root = document.documentElement
  root.dataset.docsPrimary = ''
  root.style.setProperty('--docs-primary-hue', String(primary.hue))
  root.style.setProperty('--docs-primary-saturation', `${primary.saturation}%`)
  root.style.setProperty('--docs-primary-lightness-light', `${primary.lightnessLight}%`)
  root.style.setProperty('--docs-primary-lightness-dark', `${primary.lightnessDark}%`)
}

function updateColor(event: Event): void {
  const target = event.target
  if (!(target instanceof HTMLInputElement) || !/^#[\da-f]{6}$/i.test(target.value)) return
  color.value = target.value
  const primary = primaryFromHex(target.value)
  applyPrimary(primary)
  try {
    localStorage.setItem(storageKey, JSON.stringify(primary))
    storageStatus.value = ''
  } catch {
    storageStatus.value = '无法保存主色，当前页面仍可使用。'
  }
}

function resetColor(): void {
  color.value = defaultColor
  const root = document.documentElement
  root.removeAttribute('data-docs-primary')
  for (const name of ['--docs-primary-hue', '--docs-primary-saturation', '--docs-primary-lightness-light', '--docs-primary-lightness-dark']) {
    root.style.removeProperty(name)
  }
  try {
    localStorage.removeItem(storageKey)
    storageStatus.value = ''
  } catch {
    storageStatus.value = '无法清除已保存的主色，当前页面已恢复默认值。'
  }
}

onMounted(() => {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
    if (saved && typeof saved === 'object' && 'hex' in saved && typeof saved.hex === 'string' && /^#[\da-f]{6}$/i.test(saved.hex)) {
      color.value = saved.hex
      applyPrimary(primaryFromHex(saved.hex))
    }
  } catch {
    storageStatus.value = '无法读取已保存的主色，当前使用默认值。'
  }
})
</script>

<template>
  <section class="space-y-5" aria-label="主色调设置">
    <p class="text-sm leading-6 text-[var(--lulu-color-text-muted)]">选择主色调后立即应用到整个文档站；亮色和深色会自动调整明度，背景与文字仍使用各自的默认配色。</p>
    <label class="flex items-center justify-between gap-4 rounded-lg border border-solid border-[var(--lulu-color-border)] p-4">
      <span class="font-medium">主色调</span>
      <span class="flex items-center gap-3">
        <code class="text-sm">{{ color }}</code>
        <input type="color" aria-label="主色调" :value="color" class="h-9 w-12 cursor-pointer border-0 bg-transparent p-0" @input="updateColor">
      </span>
    </label>
    <button type="button" class="rounded-lg border border-solid border-[var(--lulu-color-border)] px-4 py-2 text-sm hover:bg-[var(--lulu-color-surface-hover)]" @click="resetColor">恢复默认主色</button>
    <p v-if="storageStatus" role="status" class="text-sm text-[var(--lulu-color-text-muted)]">{{ storageStatus }}</p>
  </section>
</template>
