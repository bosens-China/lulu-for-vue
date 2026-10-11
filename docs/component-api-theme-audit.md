# 全量组件 API 与主题复审

核对日期：2026-10-10。原始复审覆盖 42 个公开组件、3 个 composable、40 个组件文档页；组件入口收敛后为 37 个公开组件、2 个 composable、32 个组件文档页，以及全局、共享家族和组件样式。Tab 与 TabPanel 共用 Tabs 文档；FormItem 并入 Form，日期与时间的范围组件分别并入主文档。

参考 Element Plus、Naive UI 的语义参数、可组合触发器和主题分层；交互参考 WAI-ARIA APG。具体组件及固定版本来源见[同类库对照](./work/edge-vue-refactor/COMPONENT-BENCHMARK.md)。本轮保留原生控件、Vue 受控模型及轻量组合边界。

本轮主题与交互参照来自本地官方文档快照：

- [Element Plus Theming](https://github.com/element-plus/element-plus/blob/d47d3f9417f83098aeeb2a0589bf4154c19e5d0a/docs/en-US/guide/theming.md)：全局语义变量与组件局部 CSS 变量覆盖。
- [Ant Design Tooltip](https://ant.design/components/tooltip.md)：真实交互触发器与全局/组件 Token 分层。
- [Ant Design Popconfirm](https://ant.design/components/popconfirm.md)：异步确认与等待反馈。
- [Ant Design Slider](https://ant.design/components/slider-cn.md)、[Rate](https://ant.design/components/rate-cn.md)：单值/范围属于滑块家族，星形评分单独表达。
- [Ant Design DatePicker](https://ant.design/components/date-picker-cn.md)、[TimePicker](https://ant.design/components/time-picker-cn.md)：统一日期粒度、日期时间配置与独立时间入口。
- [Ant Design Form](https://ant.design/components/form-cn.md)、[Table](https://ant.design/components/table-cn.md)：表单字段与校验组合、表格加载/空态/分页组合。
- [Ant Design Message](https://ant.design/components/message-cn.md)、[Notification](https://ant.design/components/notification-cn.md)：消息宿主与调用上下文分离；本库根据使用需求提供六种消息位置。

## 已完成修复

| 范围 | 结果 |
| --- | --- |
| 全局字体 | 原生按钮和输入不再被 `font: inherit` 覆盖；容器、浮层和反馈继承字体、字号与行高。 |
| 局部主色 | 实心主色、焦点光圈在消费处回退当前主色，避免根元素派生值冻结局部覆盖。 |
| 状态与尺寸 | Tabs、Pagination 继承禁用透明度；强调字重统一；减少动画时停止加载旋转。补齐常用尺寸、间距、选中/悬停、错误态 Token。 |
| 表单校验 | FormItem 的错误与关联属性落到实际原生控件；RangeSlider、DateRangePicker 两端共享错误描述，布局样式落到外层。 |
| Form / FormItem | 对象模型、同步/异步规则、提交/失败事件、校验/清除/重置在 Form 内组合；库内控件自动关联 label/name/required/错误，同字段多个控件使用唯一 ID。废弃过期异步结果。 |
| Slider / Rate | Slider 支持单值和同轨道双滑块，RangeSlider 为兼容包装；Rate 使用真实星形，支持半分、预览、清空、只读及图形插槽。原生事件、键盘与表单提交同步。 |
| 日期时间 | DatePicker/DateRangePicker 共享 picker/showTime；新增 TimePicker、TimeRangePicker。年份字符串与旧数值适配器分开，纯时间范围默认允许跨午夜。 |
| Table | 加载、空态与可选受控分页组合；首载加载行，刷新保留数据并暂时禁用交互。传入当前页 rows，不二次切片。 |
| MessageHost | 六位置、堆叠顺序、长内容换行、队列视口内滚动；业务通过 useMessage 调用，保留独立宿主和原生弹窗内展示。 |
| Input | 模型随 type 推导：数字为 `number \| ''`，文本为 `string`，提供公开 Props 类型和编译期反例。 |
| 高级输入 | Autocomplete 不再抢占输入法选词；ColorPicker 原生提交保留透明度，受控模型同轮 input/change 读取新值；日期范围取两端约束交集。 |
| Switch | 原生 checkbox 保留表单、键盘和 label 语义；提供轨道、滑块、选中状态与焦点 Token。 |
| Button / Tabs | 禁用和加载链接阻止用户点击处理器；Tabs 根元素接受主题和布局属性，keyed 重排后键盘顺序与 DOM 一致。 |
| 浮层 | Dialog 内浮层留在原生模态内容；打开期间更新 placement/offset 会重新定位。Popover、Dropdown、Popconfirm 可绑定 triggerProps 复用真实按钮；触发器查找限于自身容器，兼容多个 Vue 应用同页。 |
| 确认与服务 | Popconfirm 可等待 beforeConfirm，防重入、失败重试、隔离迟到结果，成功后等待解除禁用再恢复焦点；Dialog 单次请求可合并 class/style。 |
| Loading | 使用 small/default/large，兼容 sm/md/lg；祖先尺寸 Token 生效，自定义 LoadingOverlay 内容仍保留辅助名称。Space 同样使用 default 并兼容 middle。 |
| 文档 | 补齐共享样式与组合子组件 Token 表，检查遗漏、陈旧项及明暗全局默认值；同步 API、Demo、数值归一化和主题指南。 |

## 全组件覆盖

| 分组 | 已复核组件 |
| --- | --- |
| 基础与布局（2） | Button、Space |
| 数据（1） | Table |
| 反馈与分页（6） | Loading、LoadingOverlay、Progress、Message、MessageHost、Pagination |
| 输入与表单（17） | Input、Textarea、Select、Checkbox、Radio、Switch、Slider、RangeSlider、Rate、Autocomplete、ColorPicker、DatePicker、DateRangePicker、TimePicker、TimeRangePicker、Form、FormItem |
| 导航与展开（5） | Tabs、Tab、TabPanel、Disclosure、Accordion |
| 浮层（6） | Dialog、DialogHost、Popover、Dropdown、Tooltip、Popconfirm |

useDialog、useMessage 保留现有入口；表单模型规则统一归入 Form，字段错误内聚在 FormItem。新增公开组件同步了独立入口、样式、resolver、中文文档与 Demo。

## 兼容性与边界

- 旧尺寸别名继续可用；默认视觉尺寸保留。Switch 外观改为轨道与滑块，原生语义不变。
- 数字 Input 的类型现在反映已有运行时行为；使用字符串数字模型的调用需改为 number 或空字符串。
- primary-solid、shadow-focus 改为可选覆盖值；业务自写 CSS 直接读取这两个变量时须提供主色回退，具体写法见[主题指南](../apps/docs/src/guides/theme.md)。
- 全局与家族 Token 继承到局部组件；普通容器变量不会跨 Teleport 自动复制。区域浮层主题使用 data-lulu-theme 容器或所属 Dialog，单次面板使用 panelStyle。
- RangeSlider 保留兼容入口及模型。表单不保留旧入口兼容层。Rate 外观改为星形；底层原生字段保留键盘、表单和 ARIA 语义。MessageHost 默认改为顶部居中。
- 日期家族继续使用原生面板；Form 字段按顶层键查找，重置复制普通对象、数组和 Date；Table 分页默认关闭，启用后由业务提供当前页数据与总数。完整日历、嵌套字段路径、表格排序/查询、全局主题 Provider 和业务请求未纳入本轮。
- Token 校验读取当前平铺 CSS 选择器；引入 CSS nesting 时需升级解析方式。原生日期、颜色面板的外观受浏览器影响。

## 验证

- 2026-10-11 表单收敛复查：全量 57 个文件、345 项测试通过；组件包及文档类型检查、Lint、包与消费打包验证、文档构建通过。浏览器确认 Form 必填、修正后提交、FormItem 自定义错误清除与精简导航，未发现控制台警告或错误。
- Vitest：54 个文件、329 项测试通过，包含模型表单的原生/异步校验及重置、组合控件和多个 Radio 的关联、双滑块/星形交互、日期时间协议、表格分页/加载、消息位置/顺序，以及前轮主题与浮层回归。
- `pnpm typecheck`、`pnpm typecheck:docs`、`pnpm lint` 与 diff whitespace 检查通过；本轮修改的源码、测试和 fixture 均未超过 400 行。
- `pnpm build:docs` 通过客户端/SSR 构建与静态路由、锚点检查。文档主分块仍有超过 500kB 的构建提示，本轮未扩展包体优化范围。
- `pnpm verify:package` 通过组件包构建、48 个公开导出、单组件/组合组件/自动导入消费打包验证。
- 真实 Chromium 浏览器：局部字体 18px、紫色主色、禁用透明度 0.3、Tabs 根面板样式、Switch 空格切换与焦点光圈通过；原生 Dialog 内四类浮层自检 29/29 通过，打开期间切换 placement/offset、下拉和自动补全选择、Popover 操作按钮均可交互。
- 新增浏览器检查：双滑块真实拖动与方向键、半星点击与键盘、Form 错误/成功提交、跨午夜时间、受控翻页、加载保留行与空态、六种消息位置及 DOM 排序通过。暗色切换保留局部紫色滑轨，星形继承暗色 warning；375px 视口下长 URL 无横向溢出，20 条消息限制在视口内且可实际滚动，无控制台警告/错误。
- 浏览器[回归 fixture](../apps/docs/src/test/fixtures/theme-contract.html)保留在测试目录，可经 Vite 的 `/@fs/` 文件地址打开；不进入生产路由。减少动画由 CSS 契约验证，未覆盖原生日期/颜色面板的跨浏览器外观和读屏器实测。
- [组件家族 fixture](../apps/docs/src/test/fixtures/family-contract.html)提供新交互的手工回归入口，同样不进入生产路由。

## 2026-10-11 入口收敛验证

Form/FormItem 合并文档与导航，日期和时间各合并单值与范围文档；所有子组件 API、示例、公开类型与 Token 仍完整展示。Table 使用原 DataTable 实现并内置原生语义表格，旧 DataTable、YearPicker、HourPicker 的导出、样式与 resolver 入口已删除，不提供兼容层。

类型检查（组件与文档）、Lint、发布包及按需消费验证、文档 SSG 与站内链接检查通过；Vitest 共 57 个测试文件、347 项测试通过。浏览器已验证合并导航/API、Table 翻页、行选择、刷新 Loading、默认与自定义空态，以及跨午夜时间范围；静态预览与重启后的 5173 开发服务均正常，浏览器无警告或错误。未发布 npm 或部署线上。
