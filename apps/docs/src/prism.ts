import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'

// Prism 主入口已包含 HTML、JS 和 CSS；重复加载 markup 会清除内嵌语言规则。
const { script } = Prism.languages.markup as { script: Prism.TokenObject }
Prism.languages.vue = Prism.languages.extend('markup', {
  script: {
    ...script,
    inside: {
      'language-typescript': { pattern: /[\s\S]+/, inside: Prism.languages.typescript },
    },
  },
})

export default Prism
