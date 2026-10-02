export function installCodeCopy(root: Document = document): () => void {
  const onClick = async (event: Event) => {
    const target = event.target instanceof Element ? event.target : null
    const button = target?.closest<HTMLButtonElement>('[data-docs-copy]')
    const code = button?.closest('.docs-code-block')?.querySelector('code')?.textContent

    if (!button || code === undefined) return

    try {
      await navigator.clipboard.writeText(code)
      const copyText = button.dataset.copyText ?? '复制代码'
      const copiedText = button.dataset.copiedText ?? '已复制'
      button.textContent = copiedText
      button.setAttribute('aria-label', copiedText)
      setTimeout(() => {
        button.textContent = copyText
        button.setAttribute('aria-label', copyText)
      }, 2000)
    }
    catch {
      // 剪贴板权限失败时保留原状态，避免误报成功。
    }
  }

  root.addEventListener('click', onClick)
  return () => root.removeEventListener('click', onClick)
}
