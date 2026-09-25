# Edge 到 Vue 组件 API 映射

这份映射记录已确定的 Vue API 边界；逐项视觉和交互验收见[重构盘点](./work/edge-vue-refactor/AUDIT.md)。Vue API 按组件职责拆分，不保留旧版的 Custom Element、构造器、DOM 属性或全局实例。

| Edge 功能概念 | Vue API | 明确不迁移的旧行为 |
| --- | --- | --- |
| Button | `LuluButton` | 样式类型占用原生 `type` |
| Input / Textarea | `LuluInput`、`LuluTextarea` | DOM 自动计数和扫描 |
| Checkbox / Radio / Switch | `LuluCheckbox`、`LuluRadio`、`LuluSwitch` | 自定义内置元素 |
| Progress / Loading | `LuluProgress`、`LuluLoading`、`LuluLoadingOverlay` | `HTMLElement.prototype.loading`、`document.loading` |
| Range / Rate | `LuluSlider`、`LuluRangeSlider`、`LuluRate` | `from` / `to` / 逗号字符串 `range` 协议 |
| Select | `LuluSelect` | DOM MutationObserver、`refresh()` |
| Pagination | `LuluPagination` | `href` 模板、long/short 模式、构造器 |
| Tab | `LuluTabs`、`LuluTab`、`LuluTabPanel`；泛化开合拆为 `LuluDisclosure`、`LuluAccordion` | 路由 history、自动播放、万能 A/B 切换 |
| Dialog | `LuluDialog` | `new Dialog()`、全局 `alert()` / `confirm()` 工厂 |
| Drop | `LuluPopover`、`LuluDropdown`、`LuluPopconfirm` | target 选择器、位置码、DOM 方法 |
| Tips | `LuluTooltip` | `title` 劫持、`tips()` 原型方法 |
| ErrorTip | `LuluFieldError` | 全局唯一命令式错误浮层 |
| LightTip | `LuluMessage`、`LuluMessageHost`、`useMessage` | `new LightTip()`、document 单例 |
| Datalist | `LuluAutocomplete` | 组件内 Ajax、localStorage 历史、字符串 data 配置 |
| Color | `LuluColorPicker` | 暴露内部 DOM、localStorage 颜色历史 |
| DateTime | `LuluDatePicker`（date/month/week/time/datetime-local）、`LuluDateRangePicker`（date/month/week）、`LuluYearPicker`、`LuluHourPicker` | 非标准 type 和“至”拼接字符串 |
| Validate / Form | `LuluForm`、`LuluFormField`、`useFormValidation` | 自动 XHR、全局 `document.validate` |
| Table | `LuluTable`、`LuluDataTable` | HTML 字符串模板、组件内请求和分页耦合 |
| Follow / Keyboard | 吸收到浮层、Tabs、菜单和输入的内部实现 | 独立公开工具和全局监听 |
| Edge CSS / 设计 token | `@lulu/vue/style.css`、`--lulu-*` token | `--ui-*` token、`.ui-*` 选择器、`[is]` 结构与逐像素兼容 |
| Placeholder | 原生 `placeholder` 属性 | 旧浏览器 placeholder polyfill |

`LuluDataTable` 只消费受控数据；数据请求、路由和业务缓存仍由应用层负责。静态 `<datalist>` 继续可以直接使用浏览器原生元素；需要搜索、加载状态或键盘选择时使用 `LuluAutocomplete`。

## 发布入口

- 完整引入：`@lulu/vue` 配合 `@lulu/vue/style.css`。
- 按组件引入：在应用入口导入一次 `@lulu/vue/base.css`，再引入 `@lulu/vue/button` 与 `@lulu/vue/button/style.css`；组件样式目前按 action、form、overlay 等域共享。
- `useMessage`、`useFormValidation` 等 composable 提供独立短路径。`@lulu/vue/resolver` 可为模板和 composable 提供自动导入；公开通配符只映射公共组件入口，不支持深层构建路径。
