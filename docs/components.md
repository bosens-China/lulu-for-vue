# Edge 到 Vue 组件 API 映射

这份映射记录当前 Vue API 边界。37 个公开组件对应 32 份主组件文档，Tab/TabPanel、FormItem、日期范围与时间范围分别合并到对应主文档；逐项视觉和交互验收见[重构盘点](./work/edge-vue-refactor/AUDIT.md)。Vue API 按组件职责拆分，不保留旧版的 Custom Element、构造器、DOM 属性或全局实例。

| Edge 功能概念 | Vue API | 明确不迁移的旧行为 |
| --- | --- | --- |
| Button | `LuluButton` | 样式类型占用原生 `type` |
| Input / Textarea | `LuluInput`、`LuluTextarea` | DOM 自动计数和扫描 |
| Checkbox / Radio / Switch | `LuluCheckbox`、`LuluRadio`、`LuluSwitch` | 自定义内置元素 |
| Progress / Loading | `LuluProgress`、`LuluLoading`、`LuluLoadingOverlay` | `HTMLElement.prototype.loading`、`document.loading` |
| Range / Rate | `LuluSlider` 单值或同轨道范围、`LuluRangeSlider` 兼容入口、`LuluRate` 星形评分 | `from` / `to` / 逗号字符串 `range` 协议 |
| Select | `LuluSelect` | DOM MutationObserver、`refresh()` |
| Pagination | `LuluPagination` | `href` 模板、long/short 模式、构造器 |
| Tab | `LuluTabs`、`LuluTab`、`LuluTabPanel`；泛化开合拆为 `LuluDisclosure`、`LuluAccordion` | 路由 history、自动播放、万能 A/B 切换 |
| Dialog | `LuluDialog`、`LuluDialogHost`、`useDialog` | `new Dialog()`、全局 `alert()` / `confirm()` 工厂 |
| Drop | `LuluPopover`、`LuluDropdown`、`LuluPopconfirm` | target 选择器、位置码、DOM 方法 |
| Tips | `LuluTooltip` | `title` 劫持、`tips()` 原型方法 |
| ErrorTip | `LuluFormItem` 内置错误展示 | 全局唯一命令式错误浮层 |
| LightTip | 业务通过 `useMessage` 调用，`LuluMessageHost` 统一配置位置与堆叠，`LuluMessage` 展示单条消息 | `new LightTip()`、document 单例 |
| Datalist | `LuluAutocomplete` | 组件内 Ajax、localStorage 历史、字符串 data 配置 |
| Color | `LuluColorPicker` | 暴露内部 DOM、localStorage 颜色历史 |
| DateTime | `LuluDatePicker`、`LuluDateRangePicker` 的 `picker/showTime`，`LuluTimePicker`、`LuluTimeRangePicker`；年份使用 DatePicker，小时数使用数值 Input | 非标准 type 和“至”拼接字符串 |
| Validate / Form | `LuluForm` 模型校验、提交与重置；`LuluFormItem` 字段关联和错误展示 | 自动 XHR、全局 `document.validate` |
| Table | `LuluTable` 统一列与行、加载/空态/选择及可选受控分页，原生结构为内部实现 | HTML 字符串模板、组件内请求或二次切分当前页数据 |
| Follow / Keyboard | 吸收到浮层、Tabs、菜单和输入的内部实现 | 独立公开工具和全局监听 |
| Edge CSS / 设计 token | `@lulu/vue/style.css`、`--lulu-*` token | `--ui-*` token、`.ui-*` 选择器、`[is]` 结构与逐像素兼容 |
| Placeholder | 原生 `placeholder` 属性 | 旧浏览器 placeholder polyfill |

`LuluSlider range` 使用 `[number, number]` 模型，两端共享轨道且不能交叉；默认单值模型为 `number`。Rate 默认五颗星和 `0.5` 步长，支持预览、只读、清空和 `icon` 插槽。旧 RangeSlider 入口保持兼容。

日期家族的 `picker` 优先于兼容的 `type`，日期时间使用 `showTime`。统一日期与时间入口保持字符串模型，不再提供 YearPicker、HourPicker 入口；TimeRangePicker 默认保留跨午夜顺序。当前输入面板由浏览器提供。

`LuluForm` 的 `model` 是可变对象，FormItem 的 `name` 对应顶层字段键。模型模式管理原生约束、同步/异步规则、字段错误和重置；未传 model 时保留原生表单。库内控件自动关联字段，原生或第三方控件使用 `controlProps` 插槽接入。

`LuluTable` 只消费受控数据。`pagination` 默认关闭，启用后通过 `total/pageSize` 和 `v-model:page` 展示分页导航，`rows` 始终是当前页数据；加载中保留已有行，首载展示 Loading。数据请求、切片、路由和业务缓存仍由应用负责。

`LuluMessageHost` 通常在应用根部配置一次，默认 `top` 居中；支持 top/bottom 与 start/end 组合的六种位置。`newOnTop=false` 按到达顺序排列，设为 true 时最新消息位于最上方。进入宿主弹窗后保留弹窗内消息布局。

静态 `<datalist>` 继续可以直接使用浏览器原生元素；需要搜索、加载状态或键盘选择时使用 `LuluAutocomplete`。

## 发布入口

- 完整引入：`@lulu/vue` 配合 `@lulu/vue/style.css`。
- 按组件引入：在应用入口导入一次 `@lulu/vue/base.css`，再引入 `@lulu/vue/button` 与 `@lulu/vue/button/style.css`。每个组件有独立样式出口；组合组件还需导入直接依赖样式，完整清单见[包 README](../packages/ui/README.md)。
- `useMessage`、`useDialog` composable 提供独立短路径。`@lulu/vue/resolver` 可为模板和 composable 提供自动导入；公开通配符只映射公共组件入口，不支持深层构建路径。
