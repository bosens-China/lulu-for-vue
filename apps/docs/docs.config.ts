import type { DocsConfig } from './src/types'

// README 扫描负责发现页面；这里仅维护用户可见的导航结构。
export default {
  navigation: [
    {
      name: '通用',
      items: [
        { component: 'button', name: 'Button 按钮' },
      ],
    },
    {
      name: '输入与选择',
      items: [
        { component: 'input', name: 'Input 输入框' },
        { component: 'textarea', name: 'Textarea 文本域' },
        { component: 'autocomplete', name: 'Autocomplete 自动完成' },
        { component: 'select', name: 'Select 选择器' },
        { component: 'checkbox', name: 'Checkbox 多选框' },
        { component: 'radio', name: 'Radio 单选框' },
        { component: 'switch', name: 'Switch 开关' },
        { component: 'slider', name: 'Slider 滑块' },
        { component: 'range-slider', name: 'RangeSlider 范围滑块' },
        { component: 'rate', name: 'Rate 评分' },
        { component: 'color-picker', name: 'ColorPicker 颜色选择器' },
      ],
    },
    {
      name: '日期与时间',
      items: [
        { component: 'date-picker', name: 'DatePicker 日期选择器' },
        { component: 'date-range-picker', name: 'DateRangePicker 日期范围选择器' },
        { component: 'year-picker', name: 'YearPicker 年份选择器' },
        { component: 'hour-picker', name: 'HourPicker 小时选择器' },
      ],
    },
    {
      name: '表单与校验',
      items: [
        { component: 'form', name: 'Form 表单' },
        { component: 'form-field', name: 'FormField 表单字段' },
        { component: 'field-error', name: 'FieldError 字段错误' },
      ],
    },
    {
      name: '数据展示',
      items: [
        { component: 'table', name: 'Table 表格' },
        { component: 'data-table', name: 'DataTable 数据表格' },
        { component: 'accordion', name: 'Accordion 手风琴' },
        { component: 'disclosure', name: 'Disclosure 折叠面板' },
        { component: 'progress', name: 'Progress 进度条' },
      ],
    },
    {
      name: '导航',
      items: [
        { component: 'pagination', name: 'Pagination 分页' },
        { component: 'dropdown', name: 'Dropdown 下拉菜单' },
        { component: 'tabs', name: 'Tabs 标签页' },
        { component: 'tab', name: 'Tab 标签' },
        { component: 'tab-panel', name: 'TabPanel 标签面板' },
      ],
    },
    {
      name: '反馈与浮层',
      items: [
        { component: 'dialog', name: 'Dialog 对话框' },
        { component: 'popover', name: 'Popover 气泡卡片' },
        { component: 'popconfirm', name: 'Popconfirm 气泡确认框' },
        { component: 'tooltip', name: 'Tooltip 文字提示' },
        { component: 'message', name: 'Message 消息提示' },
        { component: 'message-host', name: 'MessageHost 消息宿主' },
        { component: 'loading', name: 'Loading 加载' },
        { component: 'loading-overlay', name: 'LoadingOverlay 加载遮罩' },
      ],
    },
  ],
} satisfies DocsConfig
