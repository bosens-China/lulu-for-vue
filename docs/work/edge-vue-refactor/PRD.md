# Edge 基准的 Vue 组件库重构

- 基线：[当前产品 PRD](../../PRD.md)
- 盘点：[Edge 组件盘点与迁移核对](./AUDIT.md)
- 同类库对照：[37 个组件逐项核对](./COMPONENT-BENCHMARK.md)
- 范围：`@lulu/vue`；`lulu/theme/edge` 只作为迁移参考

## 背景与目标

现有 Vue 包已公开 37 个组件，但组件、样式、主题和按需构建需要重新梳理。重构以 LuLu UI Edge 的视觉与交互语义为基准，保留 Vue 3 的受控组件 API，不复刻旧 Custom Element 和全局 DOM API。

Edge 的 `js/common/ui` 有 16 个 JS 文件，`css/common/ui` 有 22 个 CSS 文件，两组不能相加作为组件数。按用户可见能力归并后，以 20 个视觉样式模块及无独立 CSS 的 ErrorTip、Validate 两项功能作为首轮核对清单；Follow、Keyboard 和 Placeholder 属于辅助能力。Vue 可以为一个旧能力提供多个组合组件，因此不以旧文件数强制限定最终 Vue 组件数。

| Edge 能力（22 项） | 当前 Vue 对应 API |
| --- | --- |
| Button、Loading、Progress、Table | Button；Loading、LoadingOverlay；Progress；Table、DataTable |
| Input、Textarea、Checkbox、Radio、Switch、Select | 同名组件 |
| Range、Color、Date、Datalist | Slider、RangeSlider、Rate；ColorPicker；DatePicker、DateRangePicker、YearPicker、HourPicker；Autocomplete |
| Pagination、Tab | Pagination；Tabs、Tab、TabPanel、Disclosure、Accordion |
| Dialog、Drop、Tips | Dialog；Popover、Dropdown、Popconfirm；Tooltip |
| LightTip、ErrorTip、Validate | Message、MessageHost、useMessage；FieldError；Form、FormField、useFormValidation |

表中的 Vue 名称均省略 `Lulu` 前缀。此表只表示功能归属，尚不代表行为和视觉已经通过验收。

## 重构要求

### 组件与实现

- 建立 Edge 能力、当前 Vue API 和拟保留 API 的逐项映射，再决定保留、合并或重写；已有 37 个组件不能仅凭文件存在视为迁移完成。
- 逐项对照同类库的公开用法、键盘和表单行为，记录保留、修正与按需扩展的决定；只吸收能解决当前问题的能力。
- 组件以 Vue 3 `<script setup lang="ts">` 和 template 为主；只有模板明显不适合表达的复杂渲染才用 JSX。
- 优先使用原生表单、键盘和无障碍语义；组合组件明确父子契约。保留必要测试、Demo 与公共导出。

### 样式与主题

- 包内以 UnoCSS 构建静态样式，复杂状态、伪元素和结构选择器使用 CSS。生成后的样式随 npm 包发布，使用方不需要安装或运行 UnoCSS。
- 组件结构类名使用 `lulu-`，内部 utility 使用 `lulu-u-` 前缀；不输出影响使用方全局元素的 preflight。
- 以 Edge 的颜色、字号、控件尺寸和交互状态为浅色基准，整理基础值、语义 token、必要的组件 token 三层 `--lulu-*` CSS 变量。避免把文档站专用 token 混入组件公共主题契约。
- 提供完整的浅色与深色 token 表，支持显式局部主题和系统深色偏好；显式选择优先于系统偏好。原 Edge 不提供完整深色主题，深色配色按相同语义重新设计并验证对比度、焦点、禁用态和原生控件。
- 浮层若传送到 `body`，必须保持其所属局部主题；主题切换不得造成 SSR hydration 错误。

### 发布与按需使用

- 继续使用 tsdown 构建多入口 ESM、Vue SFC 和声明文件；UnoCSS 在构建期生成静态 CSS。CSS 入口与共享样式的去重以真实消费产物验证，不仅依赖构建器配置推断。
- 保留根入口、单组件入口和自动导入 resolver；组件之间共享同一构建模块，不复制被依赖组件代码。Vue 保持 peer dependency。
- 全量样式和单组件样式都可导入；公共 token/基础样式只发布并引用一份。多个组件并用时，构建结果不得重复包含公共 CSS 或共享 JS；单组件不能引入无关组件样式。
- resolver 同时处理组件与所需样式；自动导入插件只在应用构建期使用，不成为包的运行时依赖。

## 实施顺序

1. 完成 Edge 能力和现有 37 个组件的 API、视觉、交互、可访问性差异清单。
2. 先打通一个基础组件和一个依赖别的组件的组合组件，验证 UnoCSS 前缀、主题 token、SSR 与真实消费者打包结果。
3. 按输入、反馈、导航、浮层和数据能力迁移；每批同步文档、Demo 和必要测试。
4. 收敛根入口、子路径、resolver 和主题接入文档，并测量全量与按需产物。

## 验收标准

- Edge 的 22 项核对能力均有明确的 Vue API、原生替代或不迁移理由，映射与代码一致。
- 使用方无需 UnoCSS 配置即可使用打包样式；产物中的 utility 都带 `lulu-u-` 前缀，且不含全局 preflight。
- 覆盖 `--lulu-*` 能改变全局和局部主题；浅色、深色、系统偏好及显式覆盖均可工作，浮层与原生控件保持一致。
- 真实消费者分别只引入 Button、同时引入 Button 和 Input、同时引入 Popconfirm 和 Popover，并分别从根入口、组件子路径和 resolver 构建；检查无关组件排除、公共 CSS 与共享 JS 去重、运行时行为和类型声明。
- `pnpm typecheck`、`pnpm lint`、`pnpm test` 和 `pnpm verify:package` 通过。

## 设计依据

- [Ant Design 主题文档](https://ant.design/docs/react/customize-theme-cn.md)：借鉴 Seed、Map、Alias 与组件 token 的分层，不引入其 React 运行时主题算法。
- [UnoCSS Mini 前缀与 preflight 选项](https://unocss.dev/presets/mini.md)：构建期设置 utility 前缀并关闭 preflight。
- [UnoCSS CLI 静态生成](https://unocss.dev/integrations/cli.md)：静态 CSS 可以从指定源码提取并输出。
- [tsdown Vue 支持](https://tsdown.dev/recipes/vue-support.md)、[多入口](https://tsdown.dev/options/entry.md)和[unbundle](https://tsdown.dev/options/unbundle.md)：继续复用现有组件构建方式。
- [tsdown CSS 支持](https://tsdown.dev/options/css.md)：官方仍标记为实验功能，样式产物需要消费者侧回归验证。
