# 文档与交互走查

走查日期：2026-09-25。下文的数量与浏览器覆盖均为当日快照；2026-09-26 的组件入口复核见文末。

## 结论

原走查清单中的剩余场景已补齐：新增 34 组可运行示例，覆盖禁用、错误、只读、加载、空态、关闭策略及自定义插槽。Tab/TabPanel 复用 Tabs 的数字值与禁用组合示例，Loading 沿用已完整的尺寸示例。37 个组件页均保留 CSS Tokens。覆盖的是清单中的行为场景，不意味着枚举任意字符串、数值或所有属性组合。

导航已将原“表单与输入”拆成“输入与选择”“日期与时间”“表单与校验”。没有足够依据删除公开组件：多数相似组件是基础组件与组合组件的关系。文档应突出组合使用，避免把每个导出都解释成独立产品。

## 参考方式

对照本地保存的 Element Plus 官方文档：

- [Button](https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/button.md)：按类型、禁用、加载等场景展示，再列 API。
- [DatePicker](https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/date-picker.md)：把不同日期模式和范围作为独立场景。
- [Form](https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/component/form.md)：表单组合、校验与可访问性同时说明。

建议沿用这种场景组织方式，不机械枚举字符串、数字或所有属性排列组合。有限枚举应尽量展示全部值；布尔状态至少覆盖行为不同的两面；插槽需展示有实际业务意义的自定义内容。本次没有独立核验 Ant Design 当前版本全部页面。

## 逐组件示例覆盖

下表保留原有基础能力，列出补全后的示例入口。示例直接消费公开入口，可在页面展开并复制源码。

| 组件 | 已有演示 | 新增或复用示例 | 状态 |
| --- | --- | --- | --- |
| Button | 类型、状态和表单相关用法 | [原生表单重置](../packages/ui/src/components/action/button/demos/ResetDemo.vue) | 已覆盖 |
| Input | 文本双向绑定；Form 中有 email | [输入类型与状态](../packages/ui/src/components/form/input/demos/StatesDemo.vue) | 已覆盖 |
| Textarea | 多行文本绑定 | [文本域状态](../packages/ui/src/components/form/textarea/demos/StatesDemo.vue) | 已覆盖 |
| Autocomplete | 候选项与输入绑定 | [筛选、受控展开与候选项](../packages/ui/src/components/form/autocomplete/demos/AdvancedDemo.vue) | 已覆盖 |
| Select | 单选原生选项 | [多选与状态](../packages/ui/src/components/form/select/demos/StatesDemo.vue) | 已覆盖 |
| Checkbox | 布尔选中 | [半选与禁用](../packages/ui/src/components/form/checkbox/demos/StatesDemo.vue) | 已覆盖 |
| Radio | 同名互斥组、绑定选项 | [禁用选项](../packages/ui/src/components/form/radio/demos/StatesDemo.vue) | 已覆盖 |
| Switch | 开关与文字 | [禁用开关](../packages/ui/src/components/form/switch/demos/StatesDemo.vue) | 已覆盖 |
| Slider | 数字绑定 | [范围与状态](../packages/ui/src/components/form/slider/demos/StatesDemo.vue) | 已覆盖 |
| RangeSlider | 双值范围、端点标签 | [边界与状态](../packages/ui/src/components/form/range-slider/demos/StatesDemo.vue) | 已覆盖 |
| Rate | 默认 0–5、半分步长的数值评分 | [只读与自定义评分](../packages/ui/src/components/form/rate/demos/StatesDemo.vue) | 已覆盖 |
| ColorPicker | 颜色绑定 | [透明度与禁用](../packages/ui/src/components/form/color-picker/demos/StatesDemo.vue) | 已覆盖 |
| DatePicker | 基础用法；新增 date/datetime-local/month/time/week | [日期约束与状态](../packages/ui/src/components/form/date-picker/demos/StatesDemo.vue) | 已覆盖 |
| DateRangePicker | 双值绑定；新增 date/month/week | [范围约束与状态](../packages/ui/src/components/form/date-range-picker/demos/StatesDemo.vue) | 已覆盖 |
| YearPicker | 年份与范围 | [必填与清空](../packages/ui/src/components/form/year-picker/demos/StatesDemo.vue) | 已覆盖 |
| HourPicker | 小时数绑定 | [步长与清空](../packages/ui/src/components/form/hour-picker/demos/StatesDemo.vue) | 已覆盖 |
| Form | 原生提交、业务校验 | [重置数据与校验](../packages/ui/src/components/form/form/demos/ResetDemo.vue) | 已覆盖 |
| FormField | label、required、controlProps；错误在 Form 页演示 | [错误与自定义插槽](../packages/ui/src/components/form/form-field/demos/ErrorDemo.vue) | 已覆盖 |
| FieldError | message 文本 | [自定义错误内容](../packages/ui/src/components/feedback/field-error/demos/SlotDemo.vue) | 已覆盖 |
| Table | caption、表头与默认内容 | [空态、表体与表尾](../packages/ui/src/components/data/table/demos/SlotsDemo.vue) | 已覆盖 |
| DataTable | 行列与行键、受控行选择 | [加载、空态与单元格](../packages/ui/src/components/data/data-table/demos/StatesDemo.vue) | 已覆盖 |
| Accordion | 单项展开 | [多项展开与自定义内容](../packages/ui/src/components/navigation/accordion/demos/MultipleDemo.vue) | 已覆盖 |
| Disclosure | 基础展开与内容 | [自定义标题](../packages/ui/src/components/navigation/disclosure/demos/SummaryDemo.vue) | 已覆盖 |
| Progress | 确定进度 | [不确定进度与自定义上限](../packages/ui/src/components/feedback/progress/demos/StatesDemo.vue) | 已覆盖 |
| Pagination | 总数、页大小、当前页 | [禁用与分页边界](../packages/ui/src/components/pagination/demos/StatesDemo.vue) | 已覆盖 |
| Dropdown | 菜单数据与触发器 | [受控菜单与自定义项目](../packages/ui/src/components/overlay/dropdown/demos/AdvancedDemo.vue) | 已覆盖 |
| Tabs | 标签与面板联动 | [数字值与禁用标签](../packages/ui/src/components/navigation/tabs/demos/NumericDemo.vue) | 已覆盖 |
| Tab | 在 Tabs 内切换 | [共享完整示例](../packages/ui/src/components/navigation/tabs/demos/NumericDemo.vue) | 已覆盖 |
| TabPanel | value 对应的面板内容 | [共享完整示例](../packages/ui/src/components/navigation/tabs/demos/NumericDemo.vue) | 已覆盖 |
| Dialog | 受控开关、title、footer | [自定义标题与关闭策略](../packages/ui/src/components/overlay/dialog/demos/PolicyDemo.vue) | 已覆盖 |
| Popover | 受控浮层与可交互内容 | [位置与关闭策略](../packages/ui/src/components/overlay/popover/demos/PolicyDemo.vue) | 已覆盖 |
| Popconfirm | 提示、确认与自定义按钮文字 | [受控确认与取消反馈](../packages/ui/src/components/overlay/popconfirm/demos/ControlledDemo.vue) | 已覆盖 |
| Tooltip | 基础提示；新增 hover/focus/click/manual | [位置、间距与禁用](../packages/ui/src/components/overlay/tooltip/demos/PlacementDemo.vue) | 已覆盖 |
| Message | 新增四种 type、可关闭与不可关闭 | [自动关闭与重新显示](../packages/ui/src/components/feedback/message/demos/DurationDemo.vue) | 已覆盖 |
| MessageHost | useMessage 调用与宿主 | [消息类型、时长与队列](../packages/ui/src/components/feedback/message-host/demos/QueueDemo.vue) | 已覆盖 |
| Loading | 新增 sm/md/lg、block 与插槽 | [共享完整示例](../packages/ui/src/components/feedback/loading/demos/SizesDemo.vue) | 已覆盖 |
| LoadingOverlay | 可切换遮罩、message 与内容区域 | [自定义遮罩内容](../packages/ui/src/components/feedback/loading-overlay/demos/SlotDemo.vue) | 已覆盖 |

## 分类与组合边界

| 组件族 | 判断与建议 |
| --- | --- |
| Form / FormField / FieldError | 保留三个 API；同组相邻，以 Form 页作为完整校验流程入口。 |
| Tabs / Tab / TabPanel | 是容器与子组件；保留三个公开导出，示例与 API 集中在 Tabs 文档入口。 |
| Table / DataTable | 前者负责插槽式原生表格，后者负责数据映射、状态与选择；保留。 |
| Message / MessageHost | 单条展示与全局消息宿主职责不同；应在同一场景中说明组合。 |
| Loading / LoadingOverlay | 行内指示器与区域遮罩不同；保留相邻条目。 |
| Disclosure / Accordion | 单面板与多面板状态管理不同；保留并互相引用。 |
| Slider / RangeSlider / Rate | 单值、双值与评分语义不同。Rate 当前是范围输入，不是星形评分；需要明确这一预期，不能仅凭相似外观删除。 |
| DatePicker / DateRangePicker / YearPicker / HourPicker | 单值、范围及数字输入边界不同；放入同一日期时间组。Year/Hour 不应被描述成复杂日历选择器。 |

已实施分组、相邻排序及 Tabs 组合示例链接；折叠导航、组件重命名和 API 删除不在本次示例补全范围。

## CSS Token 与主题

- 37/37 组件页提供变量名称、用途、浅色/深色默认值和覆盖示例；变量来自现有组件及其组合子组件样式。
- 浮层页说明挂载容器的继承边界，避免以为触发器局部变量一定作用于传送后的浮层。
- 指南页不重复组件 Token 表；主题指南提供总体接入说明与调色盘入口说明。
- 顶部调色盘可从任意页面打开，保存两套配色与当前编辑模式；重置只作用于正在编辑的模式，重新打开和刷新可恢复。
- 调色盘保持局部预览与 CSS 导出，不会把任意自定义颜色自动应用到整站。浏览器禁止存储时仍可预览，并显示保存失败提示。
- 文档站浅色辅助文字单独提高对比度；Token 表列的是组件包原始默认值。

## 浏览器覆盖与发现

示例补全后，再次逐页验证 37 个组件页面的深色渲染、源码展开与页宽，未出现浏览器警告或页面级横向溢出。浅色下复验表单复位、半选、自动完成、表格状态、对话框/气泡关闭策略、组合链接和消息队列；390×844 下复验数字标签与日期范围输入。当时文档共 80 组可运行示例。

使用实际浏览器访问本地文档站，不只检查生成文件。桌面逐页覆盖 41 个文档路由的浅色与深色模式，共 82 次；逐组件展开源码并检查复制按钮、Token 章节、页宽溢出。另检查首页，以及 390×844 手机视口的导航、搜索、日期范围、调色盘和对话框。

关键交互实测包括调色盘刷新恢复、独立重置、复制 CSS、Escape 与焦点归还；表单失败/成功反馈；数据表行选择；下拉菜单关闭；确认框取消/确认；Tabs 点击与方向键切换；加载遮罩开关。全页遍历并不等于测试了每个原生输入控件的全部操作系统弹层。

| 发现 | 本次处理 |
| --- | --- |
| 深色偏好在客户端初始化后才生效 | 页面 head 提前恢复主题，降低首屏闪亮。 |
| Prism 自动扫描改变服务端 DOM，引发初始化不匹配 | 在加载应用前启用 manual，由 DemoBlock 显式高亮。 |
| 搜索按 Enter 后焦点归还可能再次激活搜索按钮 | 阻止 Enter 默认行为，补回归测试。 |
| 全局 margin 重置使原生 Dialog 靠左上 | Dialog 明确 margin:auto，复验居中。 |
| Markdown 表格 CSS 覆盖真实 Table/DataTable | API 表格选择器排除组件表格；演示区域允许局部横向滚动。 |
| 深色加载遮罩仍用白底 | 新增 --lulu-color-loading-overlay，覆盖显式与系统深色主题。 |
| 加载按钮在遮罩内部，开启后难以关闭 | 将演示开关放到遮罩外。 |
| 部分 Demo 输入没有明确可访问名称 | 为示例输入补名称，Radio 补同名组。 |
| Dialog 插槽名称文档有误、部分插槽缺失 | 修正 header，补 Disclosure summary、Table default、Switch default。 |

覆盖限制：当前浏览器与视口下未发现页面级横向溢出；移动端 API/Token 表采用局部横向滚动。没有执行所有浏览器/操作系统矩阵、屏幕阅读器验收或所有自定义颜色组合的 WCAG 审计，不能据此宣称完全无障碍或视觉零缺陷。

## 验证

- 文档生产构建通过。
- Vitest：36 个测试文件、125 项测试通过。
- ESLint、组件包和文档 vue-tsc 通过。
- 新增回归覆盖调色盘恢复/损坏数据/存储不可用、首屏主题与 Prism 初始化、搜索 Enter、组件 Token 章节和加载遮罩深色 Token。

新增行为回归覆盖表单复位、半选复原、表格加载/空态插槽、数字标签键盘切换、消息自动关闭与队列时长。组件示例清单已无待补项；导航折叠和 API 变更仍须作为独立产品决策评估。

## 2026-09-26 组件入口复核

当前公开组件为 38 个，文档为 36 个组件页、4 个指南页和首页，共 79 组可运行 Demo。Tab 与 TabPanel 离开 Tabs 无法独立使用，三个页面的基础 Demo 也重复；现已将三者的用法、API 和 CSS Tokens 集中到 Tabs 页，并移除两个独立路由及重复 Demo。组件导出不变。

其余相邻组件按实际职责复核：FormField 可独立组合任意表单控件，FieldError 可独立呈现错误；Table 接受原生行插槽，DataTable 接受列和行数据；Disclosure 管理单个原生 details，Accordion 管理一组受控面板；Select 使用原生选择框，Autocomplete 提供可搜索的候选列表；日期单值、日期范围、数字年份和数字小时的值类型不同；Slider、RangeSlider、Rate 分别处理单值、区间和评分。DialogHost 与 MessageHost 提供命令式调用的宿主和队列，分别有不同于单个 Dialog、Message 的接入流程；LoadingOverlay 在区域中组合 Loading。上述组件目前没有与 Tabs 子组件相同的“必须依附父组件且文档示例重复”问题，保留独立入口。
