# 组件文档站

- 基线：[当前产品 PRD](../../PRD.md)
- 依赖：无
- 选型复核：[文档站技术选型复核](./TECHNICAL-RESEARCH.md)
- 组件盘点：[文档站组件缺口盘点](./COMPONENT-GAP.md)

## 背景与目标

为 `@lulu/vue` 建设自有组件文档站。组件说明以 Markdown 维护，文档站负责把 Markdown、Vue Demo 和页面元数据编译为可交互、可被搜索引擎完整抓取的静态页面。

文档站自建内容扫描、DemoBlock、页面渲染和 SSG 管线，不使用 VitePress、Rspress 或其他完整文档框架。Markdown 到 Vue 的通用编译能力使用 `unplugin-vue-markdown`，不自行实现 Markdown 解析器。构建底座采用 Vite；组件包继续使用现有 tsdown 构建，两者互不替代。

## 新增、变更与移除

### 内容组织

- 每个组件在 `readme/` 目录维护一份中文 Markdown，扫描器只识别大写文件名 `README.md`。
- 每篇组件文档维护自己的 Vue Demo，Demo 作为文档的一部分交付。
- 当前全部公开组件入口都必须具备 `README.md` 和至少一个基础 Demo；新增公开组件时由自动校验阻止遗漏。
- 以 LuLu UI Edge 为参照的文档核对只覆盖能对应到线上 Edge 页面（或其明确功能映射）的组件。没有线上对应物的 Vue 专属布局组件不在本轮核对与补齐范围内。
- 文档内容与 Demo 由组件包维护；站点壳、Markdown 编译器和 SSG 构建程序放在 `apps/docs`。
- 组件页面继续由 README 扫描发现；`apps/docs/docs.config.ts` 只负责配置导航分组、组内顺序和显示名称，不重复维护路由或文档元数据。
- 根路径 `/` 使用独立品牌首页，展示组件库定位、核心特性与组件入口，不渲染组件文档侧栏。
- 组件页面使用 `/components/<component>/`。
- 构建时校验 README、路由唯一性和 Demo 引用是否存在。
- 导航配置必须完整覆盖扫描到的组件页面；重复组件、未知组件或遗漏组件都令构建失败并给出明确错误。

### Markdown 与页面元数据

- Markdown 支持 YAML frontmatter。
- 页面基础字段包含 `title` 和 `description`；可在 `seo` 中分别覆盖搜索标题、描述、关键词和分享图片。
- canonical URL 由构建程序根据路由生成，不要求作者重复填写。
- Markdown 支持 `::: demo <id>` 容器；`id` 只允许解析到当前组件约定的 Demo 目录。
- Demo 容器正文用于当前语言的示例说明，引用的 `.vue` 文件同时作为运行代码和源码展示来源。

示例：

```md
---
title: Button 按钮
description: 用于触发即时操作。
seo:
  title: Vue Button 按钮组件
  description: LuLu Vue Button 组件的用法、API 和示例。
  keywords:
    - Vue Button
    - 按钮组件
  image: /og/button.png
---

::: demo basic
基础按钮用法。
:::
```

### API 编写约定

- 每篇组件 README 都以组件实现为 API 的唯一依据。线上 Edge 文档只用于确定示例场景、原生语义和视觉行为，不能覆盖 Vue 组件的实际接口。
- `Props` 使用“参数、说明、类型、默认值”四列表格；参数名称使用源码中的 camelCase，双向绑定使用 `v-model` 或 `v-model:<name>`。
- 存在事件时，使用独立的 `Events` 表格列出事件名、说明和回调参数。`defineModel` 产生的 `update:*` 事件也需要记录。
- 表格单元格内的联合类型需转义竖线，避免 Markdown 将类型拆成多列；窄屏 API 表格允许横向滚动，不折断参数名。
- Demo 应展示关键交互的可见结果；原生属性和事件直接说明其透传语义，避免在组件 API 中重复包装。

### 编译与运行时

- Vite 的 `import.meta.glob` 在构建时扫描组件文档，自有清单模块负责字段校验和路由生成；`unplugin-vue-markdown` 负责解析 frontmatter，并把 Markdown 编译为 Vue 页面模块。浏览器不运行 Markdown 解析器。
- `unplugin-vue-markdown` 底层使用 `markdown-exit`，支持异步 Markdown 配置、兼容 Markdown It 插件，并复用 `@mdit-vue` 的 frontmatter 与 Vue 组件处理能力。
- 通用 Markdown、frontmatter 和代码高亮优先使用成熟生态；`::: demo` 的块级容器语法使用 `@mdit/plugin-container`。项目只实现 Demo 标识解析后的路径约束、按页导入、源码绑定和 `DemoBlock` 产品交互。
- 插件生成唯一的路由清单，客户端 hydration、开发服务器 SSR 和静态预渲染共用该清单。
- 静态页面 hydration 后拦截站内文档链接，通过 History API 切换当前页面；浏览器前进和后退必须同步内容、导航状态和页面 head，站点壳不得因此卸载。
- 品牌标识返回 `/`；首页的“浏览全部组件”和页头的“组件列表”进入组件文档，并与组件页面共用无刷新导航。
- 侧栏分组、侧栏名称以及上一篇/下一篇顺序共用同一份导航配置，避免不同入口产生顺序差异。
- Markdown 页面、Demo 与站点壳使用 Vue 3 Composition API、`<script setup lang="ts">` 和显式类型。
- 页面壳只负责导航、侧栏、正文和目录组合；Demo 预览、源码展开与复制由独立 `DemoBlock` 组件负责。
- 文档内容属于仓库内可信源码；仍禁止 Demo 标识进行目录穿越，不向 Markdown 开放任意文件导入。
- 文档构建工具链使用 Node.js 22 及以上版本，以满足 Vite 8、`unplugin-vue-markdown` 32 和 `@mdit/plugin-container` 1 的运行要求。

### SSG 构建

- 文档站只提供开发 SSR 与 SSG 构建两条工作流；不提供普通 SPA 构建或生产 SSR 服务。
- `build` 的唯一交付物是可直接静态托管的 `dist/`。客户端 hydration bundle、SSR manifest 和服务端 renderer 只作为同一次 SSG 构建的内部阶段，不作为独立产物交付。
- 开发、类型检查、测试和 SSG 构建直接解析 workspace 内的 `@lulu/vue` 源码，不以组件包 `dist/` 或预先执行 tsdown 为前置条件。
- 服务端构建导出路由枚举与单页渲染函数；渲染函数使用 Vue `createSSRApp` 和 `renderToString`。
- 预渲染程序遍历根路径和组件路由，为每个入口输出完整的 `index.html`；不得保留只有客户端占位符的 SPA HTML。
- 每个页面输出自己的 title、meta、canonical、Open Graph 信息以及实际使用模块对应的 CSS 和 preload 标签。
- 构建同时生成站点地图；页面 HTML 在不执行 JavaScript 时仍包含正文和 SEO 信息。
- 开发环境使用 Vite SSR 中间件加载同一服务端入口，Markdown 与 Vue Demo 变更参与 HMR。
- 使用 `body` Teleport 的交互浮层在客户端挂载后启用，服务端与客户端首次渲染必须保持一致，不得产生 hydration mismatch。
- 样式系统使用 UnoCSS。文档壳和 `DemoBlock` 复用 LuLu UI Edge 的主色、状态色、边框色与浅色表面，保证文档与组件属于同一视觉体系；Markdown 生成内容的元素级排版可以使用独立 CSS。页头主题切换器保留原生按钮的点击热区、键盘语义和焦点状态，但常态只呈现太阳或月亮图标，不显示按钮边框与底色；搜索入口使用明确的实线边框和轻量阴影，不能依赖浏览器按钮默认边框。
- 文档站外壳中的通用操作、输入与反馈优先消费 `@lulu/vue` 的公开组件；文档专属搜索索引、目录、移动端导航和 Markdown 渲染保留在 `apps/docs`。原生标题、链接、列表及单个源码折叠不强制包装为库组件。
- 线上文档入口提供可用的全文搜索、页内目录与移动端导航；静态构建输出 canonical 和 sitemap，并覆盖安装、快速开始、主题与按需使用指南。
- 主题指南提供在线调色盘，分别编辑 light/dark 的主要语义色，在组件局部预览中即时生效；可恢复默认值并复制两套 CSS 变量。主色变更同步主按钮底色，按钮文字自动选用对比更清晰的黑或白。调色状态只用于当前页面预览，不改动全站保存的明暗主题偏好。
- 文档站适配手机、平板和笔记本宽度；小于 1024px 时组件导航通过页头按钮打开，宽屏显示常驻侧栏，1280px 起显示页内目录。light 和 dark 主题共用组件包的语义 token。
- GitHub Pages 工作流在 `main` 分支构建 42 个静态页面，并从仓库 owner/name 计算站点 URL 与项目子路径；仓库名为 `owner.github.io` 时使用根路径。构建生成 canonical、Open Graph、sitemap、robots.txt 和 `.nojekyll`。

### 构建器决策

- 采用裸 Vite，不采用 VitePress。
- Vite 官方 SSR 管线支持分别构建客户端和服务端，并允许使用同一 SSR 渲染逻辑预渲染已知路由；客户端 `ssrManifest` 可结合 Vue SSR 上下文收集的模块 ID 生成按页资源提示。
- Rsbuild 可以通过 web/node 多环境、Environment API、manifest 和 `loadBundle` 自建同类管线，但其官方边界仍是提供低层能力而非内置 SSR。当前文档规模没有证据表明 Rspack 构建性能足以抵消额外适配成本。
- 不为未来可能切换构建器设计适配层；只有实际构建数据证明 Vite 成为瓶颈时再重新评估 Rsbuild。

## 范围与非目标

- 范围包括中文组件文档、自定义 SEO、Vue Demo 展示、开发预览、hydration 和静态页面生成。
- 首版不建设通用文档框架、CMS、在线代码沙箱、服务端内容接口或构建器抽象层。
- 首版不允许在 Markdown 中执行任意脚本或从约定目录外动态加载 Demo。
- Ant Design 风格指组件导航、示例预览和源码面板的交互结构，不要求复制其实现或逐像素复刻视觉。

## 验收标准

- 任一组件可以通过 `readme/README.md` 和至少一个 Vue Demo 生成中文静态页面。
- 文档站外壳复用已发布的 LuLu 通用组件；搜索、页内目录与移动端导航可正常操作且具备键盘语义。
- frontmatter 的 SEO 字段正确进入各页面 HTML；canonical 正确指向当前页面。
- 构建产物包含按正式站点 URL 生成的 sitemap；首页、指南页和组件页可通过静态托管直接访问。
- `::: demo basic` 能渲染对应 Vue Demo，并展示与运行文件一致的源码。
- 文档站通过 `workspace:*` 消费 `@lulu/vue`；Demo 保持使用组件包公开出口及其样式出口，由文档工具链在仓库内解析到 workspace 源码，不直接书写组件源码路径。
- 缺少 README、字段类型错误、重复路由、未知 Demo 或越界路径会令构建失败并指出源文件。
- 直接请求任一路由返回包含正文的 HTML，禁用 JavaScript 后仍可阅读；启用 JavaScript 后 Demo 正常 hydration。
- 根路径同样输出完整的预渲染页面，不依赖普通 SPA fallback 才能展示内容。
- 根路径输出独立品牌内容与组件入口，不包含组件文档侧栏；进入组件路由后才展示侧栏、正文与前后页导航。
- 修改导航配置后，组件侧栏按配置分组和排序展示，上一篇/下一篇遵循相同顺序；README 扫描顺序不影响导航结果。
- 点击站内组件导航时不重新加载 document；禁用 JavaScript、直接访问或刷新任一路由时仍使用对应的 SSG HTML。
- 客户端和服务端构建只执行一次，预渲染阶段复用产物生成全部路由，不为每个页面重新打包。
- 单元测试覆盖 frontmatter、路由映射、Demo 容器和路径校验；至少一个集成测试验证中文页面的 SSG 输出和 hydration。
- 手机、平板与笔记本上的 API 表格保持可读；表单提交、行选择和自动完成示例可实际操作，light/dark 主题下主要操作文字清晰。
- 在线调色盘在手机、平板和笔记本上可操作；改变颜色后预览组件及导出 CSS 一致，切换 light/dark 时两组调色值互不覆盖。

## 对后续计划的影响

- 后续新增组件时，组件交付标准需要包含中文文档和至少一个可运行示例。
- 版本切换、在线编辑和交互式 Playground 可在基础 SSG 管线稳定后作为独立需求评估。

## 技术依据

- [Vite 服务端渲染与预渲染](https://vite.dev/guide/ssr)
- [unplugin-vue-markdown](https://github.com/unplugin/unplugin-vue-markdown)
- [markdown-exit](https://markdown-exit.pages.dev/)
- [markdown-it-async](https://github.com/antfu/markdown-it-async)
- [@mdit/plugin-container](https://mdit-plugins.github.io/container.html)
- [Rsbuild 服务端渲染](https://rsbuild.rs/guide/advanced/ssr)
- [Rsbuild 多环境构建](https://rsbuild.rs/guide/advanced/environments)
- [Vue 服务端渲染](https://vuejs.org/guide/scaling-up/ssr.html)
