# LuLu Vue 产品 PRD

## 产品范围

- `@lulu/vue` 是仓库唯一发布的 Vue 3 组件库。它以 LuLu UI Edge 的低耦合设计理念为参考，但不兼容旧 Web Components API，也不计划提供其他框架实现。
- `lulu/` 是本地只读迁移参考，不属于 workspace、源码或发布物。
- 组件文档站位于 `apps/docs`，线上入口为 <https://bosens-china.github.io/lulu-for-vue/>。根 `docs/` 只维护产品决策、计划和实施记录。

## 组件文档站

- 视觉以 Rspress 的阅读层级、留白和轻边框为参照，保留 LuLu 自身品牌与组件默认样式。首页突出品牌、入口和独立安装命令；正文最大阅读宽度 760px，导航、目录、Demo、代码块与 API 表格使用一致的字号、间距和明暗表面层级。阅读进度固定在顶部，不占正文布局；详细范围与验证见[视觉走查](./docs-visual-audit.md)。
- 文档外壳独立设置阅读字体与中性文字颜色，不覆盖演示控件的默认主题。桌面头部依次组织品牌、搜索、导航和工具，导航以文字强调当前章节；侧栏保留分组和筛选，正文与目录建立固定对齐关系。API 表格使用横向分隔与无标签背景的代码文字，按说明、类型及默认值分配列宽。
- CSS Tokens 按组件/家族变量和全局基础变量分层；全局基础变量默认折叠，可通过原生 summary 键盘展开，保留完整用途及明暗默认值。窄屏表格显示横向滚动提示。
- 文档站使用 Vue 3、Vite 和 Markdown 构建 SSG 页面；`tsdown` 只构建组件包。组件中文说明与可运行 Demo 由组件目录维护，站点通过公开包入口消费 LuLu 组件。
- 根路径展示品牌首页；组件页、安装与使用指南提供搜索、页内目录及移动端导航。站点支持手机、平板和笔记本尺寸，以及 light/dark 主题；在首屏绘制前恢复主题偏好。
- 指南和组件文档均按站点导航配置渲染上一页、下一页；相邻指南与组件在阅读顺序中连续。
- 未配置的文档路径展示带首页与组件入口的 404 页面；静态发布产出根目录 `404.html`，供 GitHub Pages 直接访问时使用。
- 顶部提供跟随系统、亮色、深色三态切换和全局主题调色盘。主色快捷设置按模式自动调整明度，保存在当前浏览器；全部公开全局 CSS Token 可按明暗模式分别覆盖、即时预览、逐项或全部恢复，并复制覆盖 CSS。手动覆盖优先于快捷主色，仅当前页面有效；编辑区保留默认主题以保证撤销操作可用。
- 主题指南提供全局 CSS Token 完整清单，按颜色、排版、尺寸间距、阴影动效与层级分组，列出用途和明暗默认值；清单与编辑器共用从公开 `tokens.css` 读取的数据，并包含在使用处回退的可选语义变量。组件和家族变量仍在各组件页列举。
- 导航区分输入选择、日期时间与表单校验，组合组件相邻排列。37 个公开组件对应 32 份主组件文档；Tabs、Tab、TabPanel 共用 Tabs 入口，Form 与 FormItem 共用 Form 入口，日期与时间各自将单值和范围合并展示；子组件保留公开 API。每页提供实际样式使用的 CSS Tokens、用途、明暗默认值及覆盖方式；示例覆盖有意义的属性状态、边界和自定义插槽，场景入口见[文档走查](./docs-experience-audit.md)。
- 手机导航打开后聚焦标题，静态标题不显示初始焦点装饰；关闭按钮等可操作控件保留可见键盘焦点，关闭后还原触发按钮焦点。手机搜索框采用至少 16px 字号，避免 iOS 输入聚焦时页面自动放大；侧栏折叠按钮保留可见键盘焦点。
- 手机导航复用原生 Dialog 模态行为，支持 Escape 关闭；筛选组件时保持打开，选择页面链接后关闭。首页反馈预览使用站点消息宿主展示真实提示。
- 浮层共用位置语义说明。所有 Demo 使用公开入口且可查看源码；普通 Markdown 代码块提供复制按钮和成功反馈；Callout 支持提示、警告、危险和可折叠说明，安装指南可切换 npm、yarn、pnpm、bun、deno 命令。表单复位同步业务模型与校验错误，消息示例展示自动关闭和手动清理。
- 宽表格在窄屏内使用带无障碍名称、可键盘聚焦的横向滚动区域，保留原生表格语义且不造成页面级横向溢出；非溢出表格至少铺满容器。
- Markdown 标题在 SSG 阶段生成稳定 ID；生产构建校验站内 HTML 路由和锚点，遇到死链时失败。
- 搜索覆盖导航名、标题、描述、Markdown 正文、普通代码块和 Demo 源码，索引按需加载。组件与指南页面在配置仓库地址时提供 GitHub 源文件入口。
- 生产构建按导航输出 `llms.txt`，并为每个指南和组件页面输出 `index.md`，为搜索引擎、Agent 和其他机器读取方保留 Markdown 入口。
- `main` 分支通过 [Docs Pages 工作流](../.github/workflows/docs-pages.yml)发布到 GitHub Pages；每个路由生成可直接访问的静态 HTML、独立 SEO 信息和站点地图。新增公开组件须在对应主文档入口提供中文说明和 Vue Demo，组合子组件可合并展示。

## 构建与兼容性

- 仓库使用 pnpm monorepo；初期只发布一个 ESM 包 `@lulu/vue`，并生成 TypeScript 声明文件。
- 源码目标为 `ESNext`，tsdown 不做语法降级。只采用已标准化的能力；新增运行时 API 前必须确认使用方的兼容基线或提供已确认的 polyfill。
- 默认主题由 `@lulu/vue/style.css` 独立发布；组件 JavaScript 不注入 CSS，应用按需显式导入。主题通过 `--lulu-*` CSS 变量覆盖，详细接入方式见[包 README](../packages/ui/README.md)。
- `--lulu-color-primary-solid` 和 `--lulu-shadow-focus` 在使用处回退当前容器的主色，不在根元素预先派生，保证局部主色同时影响实心操作与焦点光圈；仍可按需独立覆盖。全局 Token 只保留实际消费且具有稳定语义的变量。
- 组件和共享家族 Token 以全局语义 Token 为默认回退。普通组件通过根元素 `style`、Teleport 浮层通过 `panelStyle`、命令式 Host 通过透传属性支持单实例覆盖；不提供运行时主题 Provider。
- 全局排版覆盖原生输入、按钮、组合容器与浮层；禁用透明度、强调字重和减少动画遵守统一契约。组件 Token 文档校验共享样式、组合子组件和明暗全局默认值。
- 支持 `@lulu/vue` 完整入口和 `@lulu/vue/button` 等组件入口；全量样式使用 `style.css`，按需样式先在应用入口导入一次 `base.css`，再从 `@lulu/vue/button/style.css` 等入口导入。根、主题、resolver 与样式入口显式导出，组件 JavaScript 只通过指向公共 `dist/entries/*` 的通配符导出；禁止依赖 `dist/components` 深层路径。
- `@lulu/vue/resolver` 提供组件与 composable 的自动导入规则，分别接入 `unplugin-vue-components` 与 `unplugin-auto-import`。这两个插件由应用在构建期安装，不属于组件包运行时依赖。
- tsdown 以多入口和 `unbundle` 构建分层 ESM 模块。单组件入口复用内部构建模块，直接依赖仍随该组件进入应用依赖图，Vue 保持 peer dependency。
- `lulu-` 为组件结构类名、`--lulu-*` 为主题 token。包在构建期使用 UnoCSS，发布的静态 utility 使用 `lulu-u-` 前缀，不输出 preflight，也不要求使用者安装 UnoCSS。

## 组件 API 原则

- 使用 Vue 3 Composition API 与 `<script setup lang="ts">`。
- props 只读，状态变化通过 `v-model` 和语义化事件向上传递。只有必要的命令式能力才使用 `defineExpose`。
- 用户可见内置文案默认使用中文，并保留 Props、插槽或回调覆盖能力；确有多语言宿主需求后再引入统一文案配置。
- `LuluSelect` 的模型类型随 `multiple` 变化：单选为 `string`，多选为 `string[]`。`LuluAccordion` 使用 `string | number` 键，单选模式以 `null` 表示未展开。
- `LuluInput` 的模型随 `type` 推导：数字为 `number | ''`，文本为 `string`。FormItem 的校验 ARIA 属性传入实际原生控件；双输入共享错误关联，根元素承接布局样式。ColorPicker 的原生提交保留完整透明度值。
- `LuluSlider` 统一单值与同轨道双滑块：默认模型为数值，`range` 模式为有序数值元组；`LuluRangeSlider` 保留为范围模式的兼容入口。`LuluRate` 展示星形评分，保留数值模型，支持半分、指针预览、只读、清空与图形插槽。键盘和原生字段提交语义与视觉交互一致。
- 日期家族用 `picker` 统一日期、周、月和年份，`showTime` 表达日期加时间；旧 `type` 继续兼容。`LuluTimePicker` 和 `LuluTimeRangePicker` 使用原生时间字符串，时间范围默认保留跨午夜顺序。删除 YearPicker、HourPicker；年份使用 `DatePicker picker="year"` 的字符串模型，仅小时数使用带 0–23 约束的数值 Input。当前使用原生输入，不提供自定义日历面板或时区转换。
- 不提供旧 Custom Elements、自动 DOM 扫描、全局原型扩展、浏览器直引、旧深层导入或构造器式 API。
- 优先使用 Vue 响应式机制和原生 HTML 语义，避免移植旧版的 DOM 观察与手写状态同步。
- `LuluSpace` 提供横向与纵向的统一间距、三档尺寸和横向换行；仅用于普通内容排列，列表、表单语义和网格布局由原生容器与 CSS 负责。
- Space 与 Loading 使用 `small/default/large`，保留旧尺寸别名且默认视觉尺寸不变。Switch 以原生 checkbox 承接键盘、表单和禁用语义，另提供轨道、滑块与状态 Token。
- Tabs 根容器接收主题与布局属性，键盘顺序跟随当前 DOM；浮层打开期间响应位置参数变化，Dialog 内的浮层留在模态内容中。
- Popover、Dropdown、Popconfirm 的触发插槽提供 `triggerProps`，复用实际交互组件；Popconfirm 可用 `beforeConfirm` 等待异步操作，防止重复提交，失败允许重试并忽略外部关闭后的迟到结果。
- `LuluForm` 可通过对象 `model` 启用集成校验，`LuluFormItem` 以顶层字段名关联模型、标签、必填和错误。支持同步与异步规则、模型快照、重置和清除校验，并废弃过期异步结果；业务请求由应用负责。未传模型时保留原生表单行为，表单公开 API 仅保留 Form 与 FormItem，错误显示内聚在 FormItem，不提供 FormField、FieldError 或独立校验 hook 兼容入口。完整契约见 [Form 文档](../packages/ui/src/components/form/form/readme/README.md)。
- `LuluTable` 统一承接列定义、行数据、加载、空态、行选择和可选受控分页，基础原生表格转为内部实现；删除 DataTable 入口，不提供兼容层。分页默认关闭，启用后只展示传入的当前页数据；首载显示加载行，刷新保留已有行并覆盖加载状态。数据表不请求或二次切分数据，完整契约见 [Table 文档](../packages/ui/src/components/data/table/readme/README.md)。
- 消息通过应用根部的 `LuluMessageHost` 统一配置，业务组件调用 `useMessage()`。默认顶部居中，提供六种逻辑位置与 `newOnTop` 堆叠顺序；队列超出视口时可滚动，进入活动宿主弹窗后使用弹窗内布局，退出后恢复屏幕位置。每个 Host 保持独立队列；完整契约见 [MessageHost 文档](../packages/ui/src/components/feedback/message-host/readme/README.md)。

### 命令式弹窗

- `LuluDialogHost` 为后代的 `useDialog()` 提供 `open`、`confirm`、`alert`，底层复用 `LuluDialog`，保留受控模板用法。命令式入口归属于宿主，不提供模块级队列或全局静态 API。
- 弹窗打开时焦点进入内部，普通弹窗默认聚焦标题并允许原生 `autofocus` 覆盖；命令式确认优先聚焦取消按钮。静态标题不显示焦点装饰，交互控件保留可见键盘焦点，关闭后焦点返回触发元素。
- 每个宿主串行展示；确认以布尔结果结束，其余实例可等待关闭。调用方作用域和宿主销毁均清理请求，避免留下弹窗或未结束的等待。
- 异步确认期间阻止用户关闭和重复提交，失败在弹窗内反馈并允许重试。内容继承宿主的注入与主题，响应式内容使用渲染函数；业务请求及取消由应用负责。
- 单次请求可设置 `class/style`，与 Host 属性合并，允许实例定制语义 Token。
- 外层 `LuluMessageHost` 的消息随活动宿主弹窗进入模态内容，关闭后回到原处。SSR 只允许获取 API，显示操作要求客户端宿主已挂载。完整接入与边界见 [DialogHost 文档](../packages/ui/src/components/overlay/dialog-host/readme/README.md)。

## 已完成的 Edge 功能与视觉迁移

Edge 的全部用户可见运行时功能已转换为 Vue API，并提供以 Edge 默认调色板和尺寸为基线的可覆盖主题。完整的旧功能映射见[组件 API 映射](./components.md)。根入口只导出面向使用者的组件、composable 和类型。

### 基础与输入

- 基础展示：`LuluButton`、`LuluLoading`、`LuluLoadingOverlay`、`LuluProgress`。
- 原生表单：`LuluInput`、`LuluTextarea`、`LuluCheckbox`、`LuluRadio`、`LuluSwitch`、`LuluSelect`。
- 选择与高级输入：`LuluSlider`、`LuluRangeSlider`、`LuluRate`、`LuluAutocomplete`、`LuluColorPicker`。
- 日期时间：`LuluDatePicker`、`LuluDateRangePicker`、`LuluTimePicker`、`LuluTimeRangePicker`。

### 导航、浮层与反馈

- 导航：`LuluPagination`、`LuluTabs`、`LuluTab`、`LuluTabPanel`、`LuluDisclosure`、`LuluAccordion`。
- 浮层：`LuluDialog`、`LuluDialogHost`、`useDialog`、`LuluPopover`、`LuluDropdown`、`LuluPopconfirm`、`LuluTooltip`。
- 反馈：`LuluMessage`、`LuluMessageHost`、`useMessage`。

### 表单与数据

- 表单：`LuluForm`、`LuluFormItem`；支持原生约束和对象模型规则，提交请求由业务层负责。
- 数据：`LuluTable`。数据表渲染受控行列、加载/空态、选择状态与可选分页导航；查询、筛选、分页请求及数据切分由应用层协调。

## 已验证的迁移边界

- 不迁移 Custom Elements、自动 DOM 扫描、原型扩展、构造器 API、全局 document API、旧浏览器 polyfill、字符串 HTML 模板或组件内 Ajax。
- `Follow` 与 `Keyboard` 不再单独导出；定位、关闭、键盘和 ARIA 行为内聚到浮层、Tabs、Autocomplete 等实际使用处。
- `Placeholder` 保持原生 HTML 行为；不提供旧浏览器 polyfill。默认主题使用新的 `--lulu-*` token，不兼容旧 `--ui-*` token、`.ui-*` 选择器、`[is]` 结构或逐像素主题。
- 当前组件包已通过 Vitest 行为、CSS 契约与公开发布物测试、`vue-tsc`、ESLint 与 tsdown 的 ESM/声明/CSS 构建。

## 设计依据

- [LuLu UI Edge 命名与设计](https://l-ui.com/edge/about.design.html)
- [LuLu UI Edge Pagination](https://l-ui.com/edge/apis.pagination.html)
- [LuLu UI Edge 组件资源概览](https://l-ui.com/edge/about.use.html)
