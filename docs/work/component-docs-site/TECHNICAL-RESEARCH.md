# 文档站技术选型复核

## 结论

继续使用 **Vite 8 + Vue 3 + `unplugin-vue-markdown` + 现有预渲染插件**建设文档站。`tsdown` 继续只负责 `@lulu/vue` 组件包，不承担站点构建。站点输出纯静态文件，部署不需要 Node 服务。

这次是对已有实现的复核，不另建一套 SSG。2026-09-25 在本仓库执行 `pnpm build:docs` 成功，`apps/docs/dist` 中有首页和 37 个组件页，共 **38 个包含正文的 `index.html`**。构建会分别产出客户端和服务端包，然后复用服务端渲染函数生成所有页面；[预渲染实现](../../../apps/docs/build/prerenderPlugin.ts)及[产物测试](../../../apps/docs/build/test/ssgOutput.test.ts)已经覆盖这条路径。

| 方案 | 与本项目的关系 | 结论 |
| --- | --- | --- |
| 现有 Vite SSG | 保留 Vue Demo、README 扫描、品牌首页、自定义导航、UnoCSS 和现有路由；可直接复用已工作的 38 页构建 | **采用**；继续补齐上线能力 |
| VitePress 自定义主题 | 原生 SSG，Markdown 可直接嵌入 Vue 组件，也支持完整 Vue 主题；但需要迁移现有 Demo 容器、路径、路由、主题和 SEO 契约 | 适合从零建标准文档站，当前不迁移 |
| Rspress | 内置丰富的文档能力，但使用 React/MDX 渲染，无法直接把本包 Vue SFC 当作原生文档 Demo | 不采用 |
| tsdown | 现有组件包的多入口 ESM/类型构建工具，没有理由替代站点的 Vue 页面与 SSG 管线 | 保留在组件包 |

Vite 官方把其 SSR 接口定位为低层能力；本项目已经承担了路由、页面渲染和预渲染插件的维护责任。如果这些代码后续明显膨胀，或需要大量通用文档功能，再以实际维护成本复核 VitePress。当前不增加构建器适配层。

## 已有链路和证据

- `apps/docs/vite.config.ts` 使用 Vue、Markdown、UnoCSS 和 SSR/SSG 插件；`apps/docs/src/routes.ts` 从组件 `readme/README.md` 扫描路由。
- `apps/docs/src/entry-server.ts` 使用 Vue SSR 输出页面正文及部分页面 meta；`apps/docs/build/prerenderPlugin.ts` 从同一次构建的 server bundle 渲染所有路由。
- 组件 Demo 经 `@lulu/vue` 公开入口导入，文档站开发构建用 `uiSourceAliases.ts` 解析到 workspace 源码。组件库自身的发布包仍由 tsdown 构建。
- 本地实测 `apps/docs/dist/components/button/index.html` 包含 Button 正文，首页与组件页均有独立静态 HTML。

## 上线前的构建与内容缺口

这些是站点功能缺口，不能靠新增 UI 组件自动解决：

1. **SEO 收口：**已有 title、description 和部分 Open Graph 字段，但尚未输出 canonical、`sitemap.xml`；当前构建产物检查确认两者不存在。需要配置正式站点 URL 后生成绝对地址。
2. **搜索：**页头“搜索文档与组件…”目前是无事件处理的按钮；需要构建期索引与可访问的搜索交互。37 页规模先用静态索引即可。
3. **内容层级：**目前只有首页和组件页，缺安装/快速开始、主题定制、按需引入、迁移指南等入口；组件页没有正文目录。指南页应进入同一 SSG 路由与导航体系。
4. **移动端：**侧栏只支持 260px/64px 收起，缺窄屏导航入口和覆盖式导航体验。需要在实际设备宽度验证页面与 Demo。
5. **线上信息：**页头版本文案硬编码 `v0.1.0`，组件包当前版本为 `0.0.0`；GitHub 链接指向 `https://github.com` 首页。上线时应从真实发布信息填充或先移除。
6. **验收：**现有 SSG 测试检查页面 HTML，仍需以静态托管方式验证深链、刷新、hydration、站内跳转、移动端和搜索键盘操作。

## 官方依据

- [Vite SSR 指南](https://vite.dev/guide/ssr.md)：客户端/服务端入口、构建与预渲染所需的低层能力。
- [VitePress 介绍](https://vitepress.dev/guide/what-is-vitepress)、[Markdown 使用 Vue](https://vitepress.dev/guide/using-vue)、[自定义主题](https://vitepress.dev/guide/custom-theme)：其原生 SSG 与 Vue 组件嵌入能力。
- [Rspress 介绍](https://rspress.rs/zh/guide/start/introduction)：其 React/MDX 渲染边界。
