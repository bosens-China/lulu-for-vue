# Edge 组件盘点与迁移核对

## 计数口径

`lulu/theme/edge/css/common/ui` 有 22 个 CSS 文件，其中 `Keyboard.css`、`Placeholder.css` 是辅助样式；余下 20 个文件代表可见 UI 能力。`lulu/theme/edge/js/common/ui` 有 16 个 JS 文件，`ErrorTip.js`、`Validate.js` 补充了两个无独立 CSS 的能力，`Follow.js` 是定位辅助模块。因此首轮迁移核对口径为 **22 项能力**，而不是 22 + 16 个组件。

Vue 包当前有 **37 个 `Lulu*.vue` 组件**。有些 Edge 能力拆成多个 Vue 组件；数量相等不是迁移完成的条件。

## 对照表

| Edge 能力 | 原始来源 | 当前 Vue 对应 | 后续核对重点 |
| --- | --- | --- | --- |
| Button | Button.css | Button | 状态、尺寸、焦点、主题 |
| Checkbox | Checkbox.css | Checkbox | 原生表单事件和半选态 |
| Color | Color.css、Color.js | ColorPicker | 颜色与透明度输入 |
| Datalist | Datalist.css、Datalist.js | Autocomplete | 建议列表、键盘导航、异步数据 |
| Date | Date.css、DateTime.js | DatePicker、DateRangePicker、YearPicker、HourPicker | 日期格式、范围和原生输入差异 |
| Dialog | Dialog.css、Dialog.js | Dialog | 焦点管理、关闭条件、滚动锁定 |
| Drop | Drop.css、Drop.js | Popover、Dropdown、Popconfirm | 定位、局部主题、组合依赖 |
| Input | Input.css | Input | 校验态、占位符、禁用态 |
| LightTip | LightTip.css、LightTip.js | Message、MessageHost、useMessage | 消息队列、无障碍通知 |
| Loading | Loading.css、Loading.js | Loading、LoadingOverlay | 尺寸、遮罩和减少动态效果 |
| Pagination | Pagination.css、Pagination.js | Pagination | 页码边界、键盘语义 |
| Progress | Progress.css | Progress | 值范围、状态和原生进度语义 |
| Radio | Radio.css | Radio | 分组语义和键盘交互 |
| Range | Range.css、Range.js | Slider、RangeSlider、Rate | 双滑块、评分和垂直模式差异 |
| Select | Select.css、Select.js | Select | 原生选择器与旧增强行为差异 |
| Switch | Switch.css | Switch | 开关语义与表单提交 |
| Tab | Tab.css、Tab.js | Tabs、Tab、TabPanel、Disclosure、Accordion | 标签键盘规则；折叠能力需单独确认来源 |
| Table | Table.css | Table、DataTable | 排序、选择、加载、空态 |
| Textarea | Textarea.css | Textarea | 自适应高度与校验态 |
| Tips | Tips.css、Tips.js | Tooltip | 触发方式、定位与无障碍描述 |
| ErrorTip | ErrorTip.js | FieldError | 错误显示、字段关联 |
| Validate | Validate.js | Form、FormField、useFormValidation | 原生约束校验与错误呈现 |

`Keyboard.css`、`Keyboard.js`、`Placeholder.css`、`Follow.js` 作为辅助能力核对，不单独计入 22 项。表中“当前 Vue 对应”表示已有 API，并不表示已达到 Edge 的视觉或交互一致性；每项仍需在组件 Demo 与测试中核对。旧版 `Custom Element`、`[is]` 和直接操作全局 DOM 的 API 不进入 Vue 公共契约。

## 已确认的架构差异

- Edge 的 `variables.css` 只提供浅色变量。Vue 包的暗色语义值为新增设计，使用 `[data-lulu-theme='dark']` 或系统偏好启用。
- Edge 蓝色 `#2a80eb` 配白字约为 3.90:1，因此浅色主题的实心主操作采用 Edge 已有深蓝 `#0057c3`（约 6.66:1）；状态色搭配深色文字。页面级视觉和交互对比仍待逐项验收。
- 现有按需 CSS 按六个领域输出，单个组件仍可能带入同领域其他组件的规则。共享 token 已单独输出，后续需要拆细样式入口。
- 目前 UnoCSS 只用于 Button 的三个布局 utility；其余复杂状态和结构选择器仍为 CSS。迁移时逐项判断，避免为了使用 utility 拆散清晰的状态样式。
