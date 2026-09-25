# LuLu Vue 产品 PRD

## 产品范围

- `@lulu/vue` 是仓库唯一发布的 Vue 3 组件库。它以 LuLu UI Edge 的低耦合设计理念为参考，但不兼容旧 Web Components API，也不计划提供其他框架实现。
- `lulu/` 是本地只读迁移参考，不属于 workspace、源码或发布物。
- 组件文档站位于 `apps/docs`，线上入口为 <https://bosens-china.github.io/lulu-for-vue/>。根 `docs/` 只维护产品决策、计划和实施记录。

## 组件文档站

- 文档站使用 Vue 3、Vite 和 Markdown 构建 SSG 页面；`tsdown` 只构建组件包。组件中文说明与可运行 Demo 由组件目录维护，站点通过公开包入口消费 LuLu 组件。
- 根路径展示品牌首页；组件页、安装与使用指南提供搜索、页内目录及移动端导航。站点支持手机、平板和笔记本尺寸，以及 light/dark 主题。主题指南提供可在线调整并导出 CSS 变量的调色盘。
- `main` 分支通过 [Docs Pages 工作流](../.github/workflows/docs-pages.yml)发布到 GitHub Pages；每个路由生成可直接访问的静态 HTML、独立 SEO 信息和站点地图。新增公开组件须同时提供中文 README 和 Vue Demo。

## 构建与兼容性

- 仓库使用 pnpm monorepo；初期只发布一个 ESM 包 `@lulu/vue`，并生成 TypeScript 声明文件。
- 源码目标为 `ESNext`，tsdown 不做语法降级。只采用已标准化的能力；新增运行时 API 前必须确认使用方的兼容基线或提供已确认的 polyfill。
- 默认主题由 `@lulu/vue/style.css` 独立发布；组件 JavaScript 不注入 CSS，应用按需显式导入。主题通过 `--lulu-*` CSS 变量覆盖，详细接入方式见[包 README](../packages/ui/README.md)。
- 支持 `@lulu/vue` 完整入口和 `@lulu/vue/button` 等组件入口；全量样式使用 `style.css`，按需样式先在应用入口导入一次 `base.css`，再从 `@lulu/vue/button/style.css` 等入口导入。根、主题、resolver 与样式入口显式导出，组件 JavaScript 只通过指向公共 `dist/entries/*` 的通配符导出；禁止依赖 `dist/components` 深层路径。
- `@lulu/vue/resolver` 提供组件与 composable 的自动导入规则，分别接入 `unplugin-vue-components` 与 `unplugin-auto-import`。这两个插件由应用在构建期安装，不属于组件包运行时依赖。
- tsdown 以多入口和 `unbundle` 构建分层 ESM 模块。单组件入口复用内部构建模块，直接依赖仍随该组件进入应用依赖图，Vue 保持 peer dependency。
- `lulu-` 为组件结构类名、`--lulu-*` 为主题 token。包在构建期使用 UnoCSS，发布的静态 utility 使用 `lulu-u-` 前缀，不输出 preflight，也不要求使用者安装 UnoCSS。

## 组件 API 原则

- 使用 Vue 3 Composition API 与 `<script setup lang="ts">`。
- props 只读，状态变化通过 `v-model` 和语义化事件向上传递。只有必要的命令式能力才使用 `defineExpose`。
- 不提供旧 Custom Elements、自动 DOM 扫描、全局原型扩展、浏览器直引、旧深层导入或构造器式 API。
- 优先使用 Vue 响应式机制和原生 HTML 语义，避免移植旧版的 DOM 观察与手写状态同步。

## 已完成的 Edge 功能与视觉迁移

Edge 的全部用户可见运行时功能已转换为 Vue API，并提供以 Edge 默认调色板和尺寸为基线的可覆盖主题。完整的旧功能映射见[组件 API 映射](./components.md)。根入口只导出面向使用者的组件、composable 和类型。

### 基础与输入

- 基础展示：`LuluButton`、`LuluLoading`、`LuluLoadingOverlay`、`LuluProgress`。
- 原生表单：`LuluInput`、`LuluTextarea`、`LuluCheckbox`、`LuluRadio`、`LuluSwitch`、`LuluSelect`。
- 选择与高级输入：`LuluSlider`、`LuluRangeSlider`、`LuluRate`、`LuluAutocomplete`、`LuluColorPicker`、`LuluDatePicker`、`LuluDateRangePicker`、`LuluYearPicker`、`LuluHourPicker`。

### 导航、浮层与反馈

- 导航：`LuluPagination`、`LuluTabs`、`LuluTab`、`LuluTabPanel`、`LuluDisclosure`、`LuluAccordion`。
- 浮层：`LuluDialog`、`LuluPopover`、`LuluDropdown`、`LuluPopconfirm`、`LuluTooltip`。
- 反馈：`LuluFieldError`、`LuluMessage`、`LuluMessageHost`、`useMessage`。

### 表单与数据

- 表单：`LuluForm`、`LuluFormField`、`useFormValidation`；校验优先使用浏览器约束校验，提交请求由业务层负责。
- 数据：`LuluTable`、`LuluDataTable`。数据表仅渲染受控行列、加载/空态与选择状态；查询、筛选、分页请求由应用层协调。

## 已验证的迁移边界

- 不迁移 Custom Elements、自动 DOM 扫描、原型扩展、构造器 API、全局 document API、旧浏览器 polyfill、字符串 HTML 模板或组件内 Ajax。
- `Follow` 与 `Keyboard` 不再单独导出；定位、关闭、键盘和 ARIA 行为内聚到浮层、Tabs、Autocomplete 等实际使用处。
- `Placeholder` 保持原生 HTML 行为；不提供旧浏览器 polyfill。默认主题使用新的 `--lulu-*` token，不兼容旧 `--ui-*` token、`.ui-*` 选择器、`[is]` 结构或逐像素主题。
- 当前组件包已通过 Vitest 行为、CSS 契约与公开发布物测试、`vue-tsc`、ESLint 与 tsdown 的 ESM/声明/CSS 构建。

## 设计依据

- [LuLu UI Edge 命名与设计](https://l-ui.com/edge/about.design.html)
- [LuLu UI Edge Pagination](https://l-ui.com/edge/apis.pagination.html)
- [LuLu UI Edge 组件资源概览](https://l-ui.com/edge/about.use.html)
