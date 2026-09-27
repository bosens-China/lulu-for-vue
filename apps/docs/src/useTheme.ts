import { onMounted, onUnmounted, ref } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'lulu-theme-mode'
const isDark = ref(false)
const themeMode = ref<ThemeMode>('system')

function applyTheme(mode: ThemeMode, dark = mode === 'dark') {
  themeMode.value = mode
  isDark.value = dark
  if (typeof document !== 'undefined') {
    if (mode === 'system') document.documentElement.removeAttribute('data-lulu-theme')
    else document.documentElement.dataset.luluTheme = mode
    document.documentElement.classList.toggle('dark', dark)
  }
}

export function useTheme() {
  let systemTheme: MediaQueryList | undefined

  function syncSystemTheme(event: MediaQueryList | MediaQueryListEvent) {
    if (themeMode.value !== 'system') return
    applyTheme('system', event.matches)
  }

  function applyMode(mode: ThemeMode) {
    const dark = mode === 'system'
      ? (systemTheme ?? window.matchMedia('(prefers-color-scheme: dark)')).matches
      : mode === 'dark'
    applyTheme(mode, dark)
  }

  function toggleTheme() {
    const nextMode: ThemeMode = themeMode.value === 'system'
      ? 'light'
      : themeMode.value === 'light' ? 'dark' : 'system'
    applyMode(nextMode)
    try {
      localStorage.setItem(STORAGE_KEY, nextMode)
    } catch {
      // 存储受限时保留当前页面的主题切换能力。
    }
  }

  function initTheme() {
    if (typeof window === 'undefined')
      return

    let saved: string | null = null
    try {
      saved = localStorage.getItem(STORAGE_KEY)
    } catch {
      // 无法读取偏好时跟随系统。
    }
    applyMode(saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system')
  }

  onMounted(() => {
    systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    systemTheme.addEventListener('change', syncSystemTheme)
    initTheme()
  })

  onUnmounted(() => systemTheme?.removeEventListener('change', syncSystemTheme))

  return {
    isDark,
    themeMode,
    toggleTheme,
  }
}
