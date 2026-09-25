# 组件文档站实施清单

## 基础骨架

- [x] 激活组件文档站计划并确认首阶段边界。
- [x] 创建 `apps/docs` workspace 与 Vite、Vue、UnoCSS 配置。
- [x] 建立类型化静态路由、双端应用入口和无样式站点壳。
- [x] 实现开发 SSR，并跑通客户端 hydration 和中文页面静态预渲染。
- [x] 为路由、SSR 输出和 hydration 补充最小行为测试。
- [x] 通过 build、typecheck、lint 和 test 验证。

## Markdown 文档能力

- [x] 扫描组件目录中的中文 README。
- [x] 接入 `unplugin-vue-markdown`，解析并校验 YAML frontmatter 与 SEO 字段。
- [x] 将 Markdown 页面模块接入自有路由清单。
- [x] 基于 `@mdit/plugin-container` 实现 `::: demo` 转换，并自研 Demo 路径约束、按页导入和源码展示。
- [x] 生成 canonical、Open Graph 和 sitemap。
- [x] 增加扫描、编译、路径安全、SSR 和 hydration 行为测试。
- [x] 增加读取实际构建产物的完整 SSG 集成测试。

## SSG 构建收口

- [x] 将 `build` 收口为只交付 `dist/` 静态站点的 SSG 流程，移除独立 SPA 构建入口。
- [x] 预渲染根路径，确保最终 `index.html` 包含正文与 SEO 信息。
- [x] 延迟启用 `body` Teleport，修复 Autocomplete、Dropdown、Popover 和 Tooltip 的 SSR hydration mismatch。
- [x] 增加根页面构建产物与 Autocomplete hydration 回归测试。
- [x] 通过 typecheck、lint、test、build 和静态托管浏览器验收。
- [x] 让 docs 工具链直接解析 `@lulu/vue` workspace 源码，移除开发、类型检查和 SSG 构建前的组件包预编译。
- [x] 增加基于 History API 的站内无刷新导航，保持页头和侧栏不卸载。
- [x] 同步前进后退、页面 title/meta、导航高亮和滚动位置，并补充回归测试与浏览器验收。
- [x] 将页头深浅主题切换器改为无常驻按钮容器的纯图标视觉，并验证两种主题与键盘焦点状态。
- [x] 修复页头搜索入口继承浏览器 `outset` 边框导致底边不清晰的问题，并验证深浅主题。
- [x] 新增独立 `/` 品牌首页，展示组件库定位、特性和组件入口，不渲染组件文档侧栏。
- [x] 调整品牌链接与组件入口，通过 History API 无刷新切换首页和组件文档。
- [x] 补充首页 SSR、SSG、hydration 与浏览器视觉回归验证。
- [x] 新增类型化文档导航配置，声明组件显示名称、顺序和分组。
- [x] 校验配置与 README 扫描结果一致，并让侧栏和前后页导航共用配置顺序。
- [x] 补充导航配置校验、渲染、类型检查和构建验证。

## Button 真实消费验证

- [x] 将文档约定调整为仅识别大写 `README`：`readme/README.md` 中文。
- [x] 将 `@lulu/vue` 作为文档站的 `workspace:*` 本地依赖。
- [x] 迁移 LuLu UI Edge Button 文档结构，并改写为 Vue 组件 API 和示例。
- [x] 让 Button Demo 保持使用 `@lulu/vue/button` 和公开样式出口，并由 docs 工具链解析 workspace 源码。
- [x] 使用 UnoCSS 实现 LuLu UI Edge 色系的 `DemoBlock` 和最小文档壳样式。
- [x] 通过单元测试、类型检查、构建和浏览器视觉验收。

## 全量组件中文文档

- [x] 为 37 个公开组件补齐中文 `README.md`、关键 API 说明和基础 Vue Demo。
- [x] 移除英文 README、语言切换界面与双语路由校验，统一使用 `/components/<component>/`。
- [x] 增加公开入口与文档、Demo 的覆盖校验，并通过文档构建、类型检查、lint 与测试。
- [x] 按 LuLu UI Edge 页面核对 Demo 场景，并将 Props 和 Events 改为以源码为准的标准 API 表格。

## 线上文档站补齐

- [x] 复核 Vite/VitePress/Rspress 与现有 38 页 SSG 产物，确定继续使用 Vite。
- [x] 盘点站点外壳对自有组件的使用情况及内部/公共组件缺口。
- [x] 用现有 `@lulu/vue` Button、Input、Dialog 等公开入口改造可复用的站点交互。
- [x] 实现静态搜索索引、搜索对话框与键盘操作，替换当前无行为的搜索按钮。
- [x] 补页内目录与窄屏组件导航，并做真实浏览器验收。
- [x] 新增安装、快速开始、主题和按需引入指南页，接入现有 SSG 路由。
- [x] 从 GitHub Pages 仓库信息推导站点 URL 和子路径，生成 canonical、Open Graph、sitemap 和 robots.txt。
- [x] 移除占位 GitHub 链接与硬编码版本，验证静态托管深链、刷新和 hydration。
- [x] 验收 390px 手机、820px 平板、1280px 笔记本的 light/dark 页面，修复 UnoCSS 前缀配置。
- [ ] 将仓库连接到 GitHub 并首次启用 Pages 发布；当前本地仓库未配置 remote。

## 文档与组件 API 审查收口

- [x] 在主题指南接入 light/dark 在线调色盘、局部组件预览、默认值恢复和 CSS 导出；完成 SSG、行为测试及 390/820/1280px 浏览器验收。

- [x] 修正 Markdown API 表格中的联合类型，并让手机端表格横向滚动。
- [x] 将表单、行选择和自动完成示例改为可验证的交互演示。
- [x] 对齐 Vue 原生语义：表单事件透传、输入控件双向绑定、Tabs 的 SSR 稳定 ID、表格选择事件去重。
- [x] 修正主要按钮与首页入口的浅色主题对比度，移除首页预览中的伪操作按钮。
- [x] 用浏览器复核手机端 light/dark、API 表格与关键示例交互，并通过类型检查、测试、lint 和构建。
