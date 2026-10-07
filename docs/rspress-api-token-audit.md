# Rspress 借鉴与组件 API、Token 审查

## 结论

当前文档站不需要迁移到 Rspress。现有 Vue + Vite + Markdown SSG 已覆盖路由、搜索、主题、Demo、SEO 与静态发布。直接借鉴小而稳定的能力，成本低于迁移并重建 Vue Demo 链路。

本轮已落地普通代码块复制、Callout、包管理器安装标签、构建期死链检查，以及组件专属 CSS Token 文档校验。API 审查发现的默认文案语言混用、Select 模型类型和 Accordion 键类型问题也已处理；当前仍需关注 Token 表人工维护和数值约束说明。

## Rspress 内置文档组件

Rspress 提供 9 类可直接用于 MDX 的文档组件。组件清单来自 [Rspress 文档组件](https://rspress.rs/zh/ui/components/)。

| 组件 | Rspress 用途 | 对当前文档站的判断 |
| --- | --- | --- |
| Badge | 在正文或标题中展示状态徽标 | 暂不实现。出现稳定、实验性或弃用状态后再加。 |
| Callout | 展示提示、警告、危险和可折叠说明 | 已借鉴。复用现有 Markdown 容器，支持常用语义、自定义标题和可折叠详情，无新增依赖。[来源](https://rspress.rs/zh/ui/components/callout) |
| CodeBlockRuntime | 在浏览器运行时高亮动态代码 | 不借鉴。当前代码是静态内容，继续使用编译期 Prism 更轻。[来源](https://rspress.rs/zh/ui/components/code-block-runtime) |
| PackageManagerTabs | 生成 npm、yarn、pnpm、bun、deno 命令 | 已借鉴。安装指南默认展示 pnpm，并可切换五类命令；复用 LuLu Tabs 的键盘与 ARIA 行为。[来源](https://rspress.rs/zh/ui/components/package-manager-tabs) |
| PageTabs | 把单页拆成带动态目录的子页面 | 暂不实现。该能力仍标为实验性，且会增加目录与锚点复杂度。[来源](https://rspress.rs/zh/ui/components/page-tabs) |
| Prompt | 展示可折叠、可复制的 Agent Prompt | 暂不实现。当前文档没有稳定的 Agent 操作流程。[来源](https://rspress.rs/zh/ui/components/prompt) |
| SourceCode | 展示 GitHub 或 GitLab 源码入口 | 已借鉴。组件与指南路由自动关联仓库内的 Markdown 源文件，配置仓库地址后统一显示 GitHub 入口。[来源](https://rspress.rs/zh/ui/components/source-code) |
| Steps | 把标题与正文渲染为步骤 | 适合安装和快速开始指南，优先级低于 Callout 与包管理器标签。[来源](https://rspress.rs/zh/ui/components/steps) |
| Tabs / Tab | 切换多组内容，并支持同组同步 | 适合框架、包管理器和导入方式对照。当前需求可先由专用 PackageManagerTabs 覆盖。[来源](https://rspress.rs/zh/ui/components/tabs) |

## API 审查

审查范围为 39 个公开组件入口、3 个 composable 和 37 个组件文档页。Tab 与 TabPanel 作为组合子组件并入 Tabs 页面。逐项核对 Props、Models、Events、Slots、Expose 和文档默认值后，没有发现实现与 API 表的默认值不一致。

### 已经合理的部分

- 原生语义优先。Button 默认 `nativeType="button"`；日期、范围、选择和表单组件复用原生控件。
- 受控状态边界清楚。复杂选择、分页、Tabs、Accordion 和数据表要求调用方提供模型；简单开关和浮层状态提供安全的关闭默认值。
- 浮层组件统一提供 `placement`、`offset`、受控 `open` 和关闭事件，能够覆盖常见定位与业务协调场景。
- DataTable 使用泛型行、稳定 `rowKey`、单元格插槽和受控选择，查询、分页与缓存继续留在业务层。
- 文案大多可以通过 Props 或调用选项覆盖，不需要业务修改组件内部。

### 审查结果与后续风险

| 优先级 | 发现 | 影响与建议 |
| --- | --- | --- |
| 已解决 | 默认文案混用中文和英文。 | 用户可见内置文案统一为中文，现有 Props、插槽和回调继续支持业务覆盖；未提前引入全局 i18n 层。 |
| 已解决 | `LuluSelect` 用 `multiple` 决定行为，但模型类型始终为 `string \| string[]`。 | 组件改为泛型条件模型：单选为 `string`，多选为 `string[]`。 |
| 已解决 | `LuluAccordion` 只接受字符串键，并用空字符串表示“全部关闭”。 | 键扩展为 `string \| number`，单选关闭使用 `null`，空字符串可以作为正常键。 |
| P2 | 数值组件会规范化非法的 `min`、`max`、`step`，但文档未集中说明规范化规则。 | 默认值合理，异常输入也不会破坏控件。建议在范围输入家族增加统一的约束说明，而不是为每个组件重复实现新策略。 |

## CSS Token 审查

全局 Token 已按颜色、表面、边框、排版、尺寸、间距、阴影和层级分组，并提供显式与系统深色模式。`--lulu-color-primary-solid` 默认继承 `--lulu-color-primary`，业务修改一个主色即可覆盖强调文字、选中态和实心主操作，仍可按需单独覆盖实色背景。审查中删除了无运行时消费者的预设和文档站专用颜色；文档页背景、标题、代码块及 Demo 卡片改用 `--docs-*` 私有变量，不再污染组件包契约。

共享输入控件、浮层、触发器、选择控件和关闭按钮提供家族级 Token；Button、Loading、Dialog、Message、Progress、Table、Tooltip 等高频视觉槽提供组件级 Token，并统一以全局语义 Token 作为回退。普通组件可在组件根元素用 `style` 一次性覆盖；Teleport 浮层使用 `panelStyle`；`LuluMessageHost` 与 `LuluDialogHost` 会把属性传给实际渲染层。实现没有增加运行时主题 Provider，也没有为每条 CSS 声明机械创建别名。

浅色和深色边框、焦点色与对应表面的对比度均达到 3:1，并由测试锁定；组件文档继续自动校验直接使用的 Token，避免实现与文档漂移。

Table 已增加保留原生表格语义的横向滚动容器，宽列在移动端不再被强行压缩；没有引入依赖业务字段含义的通用卡片化布局。

当前最大维护风险不是 Token 数量，而是 37 个页面人工复制默认值。后续可以从 `tokens.css` 生成表格或至少校验默认值；Rspress 的 CSS 变量页面也采用集中展示和实时预览，可作为交互参考。[来源](https://rspress.rs/zh/ui/vars)

## 还可以借鉴的站点能力

按收益和实现成本排序：

1. **死链检查（已落地）**：构建阶段验证内部 HTML 路由和锚点，外链与静态资源不误报；同时将 Markdown 标题 ID 前移到 SSG 输出。[来源](https://rspress.rs/zh/guide/use-mdx/link)
2. **搜索正文与代码块（已落地）**：搜索索引覆盖标题、描述、Markdown 正文、普通代码块和 Demo 源码，并使用独立懒加载分块，避免索引进入首屏 JavaScript。[来源](https://rspress.rs/zh/guide/advanced/custom-search)
3. **`llms.txt` 与 Markdown 入口（已落地）**：生产构建按导航输出 `llms.txt`，并为每个指南和组件页面保留 `index.md` 原始 Markdown 地址。[来源](https://rspress.rs/zh/guide/basic/ssg-md)
4. **文件代码块与代码块标题**：Demo 已通过 `?raw` 保持展示源码和运行源码同源。普通指南可继续扩展文件引用、标题、行高亮和折叠；先有真实长代码需求再实现。[来源](https://rspress.rs/zh/guide/use-mdx/code-blocks)
5. **自动概览页**：可从现有导航和页面 H2 生成组件概览，减少手工维护目录。[来源](https://rspress.rs/zh/guide/advanced/overview-page)
6. **API 漂移检查**：Rspress 的 API Docgen 面向 React，TypeDoc 面向 TS 模块，不能直接覆盖 Vue SFC。可以借鉴“从源码生成或校验”的方向，继续在现有 Vitest 中校验 Vue API 文档。[来源](https://rspress.rs/zh/plugin/official-plugins/api-docgen)
7. **Twoslash 与在线 Playground**：类型悬浮和实时编辑体验很好，但会增加编译、编辑器和浏览器包体。当前可运行 Demo 已覆盖主要需求，暂不引入。[Twoslash](https://rspress.rs/zh/plugin/official-plugins/twoslash)、[Playground](https://rspress.rs/zh/plugin/official-plugins/playground)

## 推荐顺序

- 近期：Callout、PackageManagerTabs、死链检查（已完成）。
- 中期：正文搜索、源码链接、`llms.txt`（已完成）。
- 有明确场景后：Steps、文件代码块、自动概览页、Twoslash 或 Playground。
- 不建议：为获得上述能力整体迁移到 Rspress，或引入运行时代码高亮。
