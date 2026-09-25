# 37 个组件的同类库对照

核对日期：2026-09-25。逐项检查 `packages/ui/src/components` 的实现、公开入口、中文 README、Demo 和现有测试；以 LuLu UI Edge 为视觉基准，以 Element Plus、Naive UI 的官方组件资料及 WAI-ARIA APG 为交互参照。下表记录值得吸收的行为，不把竞品功能数量作为交付目标。

判定：“保持”表示现有原生或组合方案足够；“已改”表示本轮处理；“待验”表示需要真实浏览器与边界测试；“按需”表示只有实际使用场景出现时再扩展。

## 通用、数据与反馈（9 项）

| 组件 | 当前能力与对照 | 判定与下一步 |
| --- | --- | --- |
| Button | 原生按钮、类型、禁用和加载；[Element Button][e-button] 还有尺寸、图标、链接与分组。 | 保持。尺寸与分组没有当前需求；继续核对加载中防重复提交和主题对比度。 |
| Table | 原生表格、caption/thead/tbody/tfoot 插槽和空态；[Element Table][e-table] 面向数据操作。 | 保持独立的语义表格，不把 DataTable 功能并入。 |
| DataTable | 类型化列、稳定行键、受控行选择、加载和空态；[Element Table][e-table] 还支持排序、筛选、固定列。 | 已改。表头、行选择、空态与加载文案可配置；已验选择重排、重复键和中文可访问名称。排序与筛选仍由应用管理。 |
| FieldError | 以 `role="alert"` 呈现字段错误；[Element Form][e-form] 由 FormItem 呈现错误。 | 保持与 FormField 分离，校验状态由调用方传入。 |
| Loading | 有状态语义与尺寸；[Element Loading][e-loading] 提供容器和全屏加载。 | 保持轻量状态指示，避免加入命令式全屏服务。 |
| LoadingOverlay | `v-model:open` 控制遮罩；[Element Loading][e-loading] 可绑定目标容器。 | 待验。核对遮罩期间目标区的焦点与 `aria-busy` 语义；无目标容器需求前不加指令。 |
| Message | 定时关闭、状态通知和关闭按钮；[Element Message][e-message] 还提供合并与位置选项。 | 保持。补计时器清理、关闭一次及屏幕阅读器通知测试。 |
| MessageHost | provide/inject 暴露类型化消息 API；[Element Message][e-message] 采用全局或局部调用。 | 保持局部宿主，避免全局单例；队列上限与合并等实际需求出现再加。 |
| Progress | 原生 `<progress>`，支持确定和不确定进度；[Element Progress][e-progress] 还有环形等展示。 | 保持原生语义；补不确定状态和数值边界测试。 |

## 表单与输入（17 项）

| 组件 | 当前能力与对照 | 判定与下一步 |
| --- | --- | --- |
| Autocomplete | 受控输入、筛选、加载、候选键盘选择；[Element Autocomplete][e-autocomplete] 有远程搜索场景。 | 保持数据请求由调用方负责；待验异步替换候选项、禁用项和焦点关闭。 |
| Checkbox | 原生复选框、半选态、`v-model`；[Element Checkbox][e-checkbox] 提供组与数量限制。 | 保持原生同名字段分组；数量限制属于业务规则。 |
| ColorPicker | 原生颜色输入加透明度滑块；[Element ColorPicker][e-color] 有预设颜色。 | 保持。预设可由外部按钮设置模型；待验非法模型值的回退。 |
| DatePicker | 原生 date/month/week/time/datetime-local；[Element DatePicker][e-date] 有快捷项和禁用日期。 | 保持原生边界并在文档说清浏览器外观差异；复杂日历作为独立需求。 |
| DateRangePicker | 两个原生输入和有序双值模型；[Element DatePicker][e-date] 提供范围与快捷项。 | 已改。两个输入分别配置字段名和可访问名称，并共享错误描述；FormData 与浏览器属性已验。复杂范围边界继续按需验收。 |
| Form | 原生提交透传、可取到底层表单元素；[Element Form][e-form] 使用 model/rules，[Naive Form][n-form] 也提供规则。 | 已改。新增原生约束加同步业务规则的完整 Demo；复杂异步表单建议应用层使用 [vee-validate][v-form]，不内置第二套状态引擎。 |
| FormField | 关联 label、控件与错误；[Element Form][e-form] 用 FormItem 同时管理布局和校验。 | 保持展示职责；待验自定义插槽和不同控件的 ARIA 透传。 |
| HourPicker | 原生数字输入，模型为 0–23 的小时；[Element TimePicker][e-time] 包含分钟、秒和面板。 | 保持“小时”范围，文档明确不是完整时间选择器。 |
| Input | 原生输入和 `v-model`；[Element Input][e-input] 有清空、密码显示、格式化等增强。 | 保持原生属性透传；清空按钮与格式化器暂不内置。 |
| Radio | 类型化选项值和原生同名分组；[Element Radio][e-radio] 另有 RadioGroup。 | 保持原生分组；待验多个同名组件的键盘与受控更新。 |
| RangeSlider | 双原生滑块和有序元组；[Element Slider][e-slider] 也支持范围和刻度。 | 已改。两个滑块分别配置字段名，共享错误描述；FormData 与浏览器属性已验。刻度与输入框按需增加。 |
| Rate | 原生 range 承载评分，支持只读和半级；[Element Rate][e-rate] 有清空与文字提示。 | 保持语义优先，确认 Edge 星级视觉与键盘步进；清空可由外部操作。 |
| Select | 原生单选/多选；[Element Select][e-select] 有搜索、远程数据和创建选项。 | 保持原生 Select；搜索场景使用 Autocomplete，不复制完整下拉框引擎。 |
| Slider | 原生 range，限制值域与步长；[Element Slider][e-slider] 有垂直和刻度模式。 | 保持。按需加入垂直视觉，不提前实现刻度系统。 |
| Switch | 原生 checkbox 加 switch 语义；[Element Switch][e-switch] 有加载与切换前拦截。 | 保持受控布尔模型；异步请求期间由应用传 `disabled`，不把业务 Promise 内置到控件。 |
| Textarea | 原生 textarea 和 `v-model`；[Element Input][e-input] 有自动高度。 | 已改测试：可编辑状态验证模型，`readonly` 单独验证原生属性；自动高度按需。 |
| YearPicker | 原生数字年份输入；[Element DatePicker][e-date] 有年份面板。 | 保持数字输入，文档明确它不是日历面板。 |

## 导航与展开（6 项）

| 组件 | 当前能力与对照 | 判定与下一步 |
| --- | --- | --- |
| Accordion | `<details>` 列表，支持单开或多开；[Element Collapse][e-collapse] 有禁用项与自定义标题。 | 待验原生 summary 的键盘与受控同步；禁用项有需求时再扩展数据契约。 |
| Disclosure | 单个原生 `<details>` 和 `v-model:open`；[Element Collapse][e-collapse] 是更重的组合方案。 | 保持原生展开语义。 |
| Tab | button、角色、选中状态、左右方向键；[WAI Tabs][w-tabs] 还列出可选 Home/End。 | 待验焦点、禁用项和动态 Tab；Home/End 为可选增强。 |
| TabPanel | 与 Tab 的 ID 和隐藏状态关联；[WAI Tabs][w-tabs] 要求面板正确标注。 | 保持；待验切换和 SSR hydration。 |
| Tabs | provide/inject 组合模型与稳定 SSR ID；[Element Tabs][e-tabs] 有位置、可关闭和新增模式。 | 保持当前水平页签职责；动态增删只在场景明确时实现。 |
| Pagination | 受控页码、总数和页长，含省略号；[Element Pagination][e-pagination] 有跳页和页长选择。 | 已改可访问名称配置并在中文 Demo 验收；跳页和页长选择交给应用。 |

## 浮层与确认（5 项）

| 组件 | 当前能力与对照 | 判定与下一步 |
| --- | --- | --- |
| Dialog | 原生 `<dialog>.showModal()`、关闭原因和插槽；[Element Dialog][e-dialog] 还提供关闭前拦截。 | 已验真实浏览器的打开初始焦点、Escape 后焦点归还及模态顶层；保持原生能力。 |
| Dropdown | 菜单角色、上下方向键、受控开合；[WAI Menu Button][w-menu] 与 [WAI Menu][w-menubar] 描述触发器和关闭后的焦点行为。 | 已改选择和 Escape 后的焦点归还；继续验外部点击和禁用项。 |
| Popconfirm | 组合 Popover 和双按钮；[Element Popconfirm][e-popconfirm] 有可配置动作。 | 已改并验收打开时聚焦取消、Escape 和确认后焦点归还；异步确认防重复仍由使用方处理。 |
| Popover | 触发按钮、受控浮层和局部主题；[Element Popover][e-popover] 有丰富内容与定位选项。 | 已改交互内容的首个焦点与 Escape 关闭归还；纯说明内容保留触发器焦点，不加虚拟触发器。 |
| Tooltip | hover/focus/click/manual 与描述关联；[WAI Tooltip][w-tooltip] 强调焦点留在真正触发元素。 | 已改交互插槽的 `triggerProps` 描述关联，并在浏览器确认仅有一个 Tab 停靠点。 |

## 测试结论与执行顺序

- 第二个 Vue 库参照：[Naive DataTable][n-data-table] 把远程数据、分页、筛选、排序作为显式模式，并强调稳定行键；我们保留稳定行键和受控选择，远程数据交给应用。[Naive DatePicker][n-date] 的多种日期范围与面板类型适合复杂日历需求，当前原生控件先解决常见输入。[Naive Pagination][n-pagination] 支持受控页码及自定义前后项；我们的优先项是让辅助文案可配置。[Naive Dropdown][n-dropdown] 显式提供键盘开关和禁用项；保留键盘操作，重点验焦点归还。[Naive Tooltip][n-tooltip] 复用 Popover API；我们维持轻量 Tooltip，优先解决可交互触发器的焦点问题。
- 37 个公开组件均有测试直接引用；本轮补了表单校验完整流程，并移除了只读 Textarea 测试中不真实的合成输入假设。静态文档站的真实浏览器验收已覆盖 Form 校验与 Dropdown 的 Escape/选择后焦点归还；其余原生控件、焦点和视觉仍按风险逐项验收。
- 本轮完成 DataTable/Pagination 文案、DateRangePicker/RangeSlider 双字段表单契约，并在浏览器验收 Popconfirm、Tooltip 与 Dialog 的关键焦点路径。后续仍需按实际场景覆盖更多原生控件边界和暗色对比度。
- 尺寸矩阵、虚拟表格、内置排序筛选、完整日历面板、全局消息单例和通用表单引擎均不作为当前 37 项的默认补齐目标。

[e-button]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/button.md
[e-table]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/table.md
[e-form]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/form.md
[e-loading]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/loading.md
[e-message]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/message.md
[e-progress]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/progress.md
[e-autocomplete]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/autocomplete.md
[e-checkbox]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/checkbox.md
[e-color]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/color-picker.md
[e-date]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/date-picker.md
[e-time]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/time-picker.md
[e-input]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/input.md
[e-radio]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/radio.md
[e-slider]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/slider.md
[e-rate]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/rate.md
[e-select]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/select.md
[e-switch]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/switch.md
[e-collapse]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/collapse.md
[e-tabs]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/tabs.md
[e-pagination]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/pagination.md
[e-dialog]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/dialog.md
[e-popconfirm]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/popconfirm.md
[e-popover]: https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/popover.md
[n-form]: https://github.com/tusen-ai/naive-ui/blob/b26496a26536918204722cb9b9e5dd9bfe31c893/src/form/demos/enUS/index.demo-entry.md
[n-data-table]: https://github.com/tusen-ai/naive-ui/blob/b26496a26536918204722cb9b9e5dd9bfe31c893/src/data-table/demos/enUS/index.demo-entry.md
[n-date]: https://github.com/tusen-ai/naive-ui/blob/b26496a26536918204722cb9b9e5dd9bfe31c893/src/date-picker/demos/enUS/index.demo-entry.md
[n-pagination]: https://github.com/tusen-ai/naive-ui/blob/b26496a26536918204722cb9b9e5dd9bfe31c893/src/pagination/demos/enUS/index.demo-entry.md
[n-dropdown]: https://github.com/tusen-ai/naive-ui/blob/b26496a26536918204722cb9b9e5dd9bfe31c893/src/dropdown/demos/enUS/index.demo-entry.md
[n-tooltip]: https://github.com/tusen-ai/naive-ui/blob/b26496a26536918204722cb9b9e5dd9bfe31c893/src/tooltip/demos/enUS/index.demo-entry.md
[v-form]: https://vee-validate.logaretm.com/v4/guide/composition-api/handling-forms/
[w-tabs]: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
[w-menu]: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
[w-menubar]: https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
[w-tooltip]: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
