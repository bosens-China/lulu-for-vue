# 文档站组件缺口盘点

## 当前覆盖

`@lulu/vue` 已公开 **37 个 Vue 组件**，37 个组件各有中文 README 与基础 Demo。现有能力覆盖 Button、Input、Dialog、Tooltip、Tabs、Loading、表单和常见浮层，足以搭建首版文档站的交互骨架。

但文档站外壳（首页、页头、侧栏、前后页、DemoBlock）目前**没有直接使用 `@lulu/vue` 的组件**；库组件主要在各组件 Demo 中运行。因此“用自己的组件构建文档站”尚未落实到站点外壳。

## 先复用已有组件

| 站点位置 | 可复用的 LuLu API | 处理方式 |
| --- | --- | --- |
| 首页主操作、Demo 复制与其他操作 | `LuluButton` | 替换通用操作按钮；品牌链接和正文链接继续使用原生 `<a>` |
| 搜索输入与弹窗 | `LuluInput`、`LuluDialog`、`LuluLoading` | 搜索索引、结果排序和键盘导航留在文档站，不进组件包 |
| Demo 多视图与帮助提示 | `LuluTabs`、`LuluTooltip` | 只在确实出现多视图或提示时使用；当前单源码折叠用原生 `<details>` 即可 |
| 侧栏分组 | `LuluDisclosure` 或 `LuluAccordion` | 仅在分组需要交互折叠时使用；页面导航保持 `<nav><ul><a>` 语义 |
| 确认与反馈 | `LuluMessageHost`、`useMessage` | 复制失败或动作结果有明确反馈需求时复用 |

不把文档专属的路由、Markdown 容器、搜索索引或侧栏状态提升为公共 UI API；也不为了“组件化”替换语义清晰的标题、段落、链接和列表。

## 缺少的文档站内部组件

| 优先级 | 内部组件 | 具体职责 |
| --- | --- | --- |
| P0 | `DocsSearch` | 连接静态搜索索引，提供 Ctrl/⌘ K、结果列表、键盘选择和空结果状态；复用 LuLu Input/Dialog |
| P0 | `DocsOutline` | 从 Markdown 标题生成页内目录，随路由更新并支持锚点跳转 |
| P0 | `DocsMobileNav` | 窄屏打开/关闭组件导航，处理焦点与遮罩；保留原生导航链接 |
| P1 | `DocsAdmonition` | 文档中的提示、警告和迁移注意事项；需求稳定后再评估提升为通用 `LuluAlert` |

## 可补充的公共 UI 组件

这些是与 [Ant Design 组件分类](https://ant.design/components/overview-cn)对照后，当前库明显缺失且以后可复用于业务界面的能力；**没有一个是上线 SSG 的前置条件**。

| 顺序 | 建议组件 | 为什么先做或后做 |
| --- | --- | --- |
| 近期 | `Alert`、`Empty`、`Card`、`Tag/Badge` | 文档提示、搜索空态、内容卡片和状态标记有复用场景，API 边界清楚 |
| 视导航增长而定 | `Breadcrumb`、`Anchor`、`Menu` | 出现多层指南与复杂页内导航时再抽成公共组件；当前站点可用语义 HTML |
| 后续库广度 | `Icon`、`Avatar`、`Image`、`Skeleton`、`Drawer`、`Notification`、`Steps`、`Timeline`、`Result` | Ant Design 类组件库的常见展示/反馈能力，需按真实业务需求排序 |
| 独立产品需求 | `Upload`、`InputNumber`、`Tree/TreeSelect`、`Cascader`、`Transfer`、`Calendar` | 交互、可访问性和测试成本高，不因建设文档站而顺带实现 |

首版先让站点外壳复用现有 Button、Input、Dialog 等组件，再补齐搜索和目录。公共组件的新增应由组件库 API 与真实复用需求驱动，不能只为文档站内部的一处 UI 创建发布入口。
