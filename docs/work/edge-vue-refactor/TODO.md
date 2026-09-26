# Edge Vue 重构实施清单

- [x] 清点 Edge 22 项能力及当前 37 个 Vue 组件。
- [x] 逐项对照 37 个组件与 Element Plus、Naive UI 和 WAI-ARIA APG，记录取舍及后续验收点。
- [x] 补全 Form 原生校验与同步规则 Demo，修正 Textarea 只读测试，并处理 Dropdown 关闭后的焦点归还。
- [x] 拆出共享基础样式，消除按需样式重复携带公共 CSS。
- [x] 用 Button 和 Popconfirm / Popover 验证多入口、共享依赖与消费者打包结果。
- [x] 用真实 Vue 自动导入插件验证组件默认导出、composable 和关联样式。
- [x] 接入包内静态 UnoCSS 生成，并确保 `lulu-u-` 前缀与无全局 preflight。
- [x] 以 Button 完成首个 Edge 视觉、主题前景色、加载状态和文档联动的组件试点。
- [x] 整理 Edge 浅色 token、完整暗色 token、系统偏好和局部主题。
- [ ] 实际界面核对暗色对比度、焦点、禁用态和原生表单控件。
- [ ] 将领域样式拆成单组件样式，并保证组合组件所需样式自动引入且不重复。
- [ ] 逐项核对并重构组件行为、视觉、文档与测试。
- [x] 明确 DateRangePicker 和 RangeSlider 双输入的表单字段名、提交与错误描述关联。
- [x] 补 DataTable 和 Pagination 的可配置文案，验收 Popover、Popconfirm、Tooltip 焦点及 Dialog 浏览器生命周期。
- [x] 调整 Dialog 初始焦点与键盘焦点提示，确认弹窗优先聚焦取消按钮。
- [ ] 验证根入口、单组件入口、resolver、类型声明及全量测试。
