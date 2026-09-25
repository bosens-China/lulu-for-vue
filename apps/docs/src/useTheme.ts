import { onMounted, onUnmounted, ref } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'lulu-theme-mode'
const isDark = ref(false)

function applyTheme(dark: boolean) {
  isDark.value = dark
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.luluTheme = dark ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', dark)
  }
}

export function useTheme() {
  let systemTheme: MediaQueryList | undefined

  function syncSystemTheme(event: MediaQueryList | MediaQueryListEvent) {
    if (document.documentElement.hasAttribute('data-lulu-theme')) return
    isDark.value = event.matches
    document.documentElement.classList.toggle('dark', event.matches)
  }

  function toggleTheme() {
    const nextDark = !isDark.value
    applyTheme(nextDark)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, nextDark ? 'dark' : 'light')
    }
  }

  function initTheme() {
    if (typeof window === 'undefined')
      return

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved === 'dark')
    }
    else {
      document.documentElement.removeAttribute('data-lulu-theme')
      syncSystemTheme(systemTheme ?? window.matchMedia('(prefers-color-scheme: dark)'))
    }
  }

  onMounted(() => {
    systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    systemTheme.addEventListener('change', syncSystemTheme)
    initTheme()
  })

  onUnmounted(() => systemTheme?.removeEventListener('change', syncSystemTheme))

  return {
    isDark,
    toggleTheme,
  }
}
