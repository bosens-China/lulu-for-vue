---
title: 主题定制
description: 使用 LuLu UI Vue 的 CSS 变量定制 light 和 dark 主题。
seo:
  keywords: [LuLu UI Vue 主题, CSS 变量, 暗色模式]
---

# 主题定制

组件通过 `--lulu-*` CSS 变量读取语义色、尺寸与间距。默认主题以 LuLu UI Edge 为基准，并提供 light、dark 两套颜色。

## 如何读变量名

- `--lulu-color-*` 是跨组件的语义色。`primary` 是全局主色入口，用于强调文字、选中态和实色主操作；`primary-solid` 未设置时在使用处回退到当前容器的主色，仅在需要区分实色背景时单独覆盖。`on-neutral`、`on-status` 表示叠在对应底色上的文字颜色。
- `--lulu-font-*`、`--lulu-line-height`、`--lulu-radius*`、`--lulu-space-*` 是共用排版、圆角与间距。字体默认 14px、行高 1.5，强调字重使用 `--lulu-font-weight-strong`（600）。间距的 `1`、`2`、`3`、`4` 默认分别为 4、8、12、16px。
- `--lulu-button-*`、`--lulu-dialog-*`、`--lulu-loading-*` 等以组件名开头的变量控制该组件，并回退到全局语义变量。其中 `--lulu-button-color` 对应 CSS 的 `color`，控制按钮文字颜色。
- `--lulu-control-*`、`--lulu-floating-*` 分别控制输入控件家族和浮层面板；`--lulu-trigger-*`、`--lulu-disclosure-*` 控制触发器和折叠面板家族。它们统一回退全局变量。
- `--lulu-opacity-disabled`、`--lulu-shadow-focus` 控制禁用透明度和焦点光圈。焦点光圈未设置时在使用处按当前主色生成；系统要求减少动画时停止加载旋转、缩短过渡。
- `--lulu-z-index-popup` 控制贴近触发元素的浮层（下拉菜单、提示等）的层级；模态弹窗和消息各有独立层级。

各组件文档的 CSS Tokens 表涵盖组件、共享样式与组合子组件实际读取的变量，测试校验覆盖范围及明暗全局默认值。组件和家族变量通常不在根元素预先赋值，而是在使用处回退，因此局部语义覆盖可以继续生效。调整整站外观时优先覆盖共用语义变量；仅调整一个组件时再覆盖组件专用变量。

业务 CSS 直接读取可选的 `--lulu-color-primary-solid` 或 `--lulu-shadow-focus` 时，也要写回退值，例如 `var(--lulu-color-primary-solid, var(--lulu-color-primary))` 和 `var(--lulu-shadow-focus, 0 0 0 3px var(--lulu-color-primary))`。

## 在线设置全局主题

点击页面顶部的“设置全局主题”调色盘，可设置主色以及全部公开全局 CSS Token。

主色快捷设置会自动调整亮暗明度，并保存在当前浏览器。点击“恢复默认主色”即可撤销主色定制。

主色选择共享一个色相；亮色与深色分别计算适合背景的明度，其他语义色仍使用各模式默认值。因此切换到深色后，定制主色仍然生效。选色器只使用所选颜色的色相和饱和度，明度会自动调整。

全局变量区支持按组筛选、按名称和用途搜索；颜色可用选色器，也可输入任意有效 CSS 颜色，透明色使用文本框。字体、圆角、间距、阴影、动效等直接输入 CSS 值，留空恢复继承值。明暗模式分别设置，顶部切换主题即可编辑另一套值。

手动覆盖优先于主色快捷设置，只在当前页面有效；关闭调色盘仍保留预览，刷新恢复默认值。可逐项恢复、恢复全部，或复制包含明暗和系统主题规则的 CSS 到业务样式中。复制只包含手动覆盖；主色快捷设置不包含在其中。编辑区固定使用默认变量，预览不会让设置控件变得无法操作。

## 全局 CSS Token 清单

以下是全部公开全局变量的用途与明暗默认值。控件家族和组件专用变量仍在各组件页列举；文档站私有的 `--docs-*` 变量不属于组件库公开主题。

<GlobalTokenTable />

## 选择明暗主题

在根元素或局部容器上设置 `data-lulu-theme`：

```html
<div data-lulu-theme="dark">
  <!-- 此容器中的 LuLu 组件使用暗色主题 -->
</div>
```

值为 `light` 时使用浅色主题；不设置时根据系统偏好选择。文档站右上角的主题菜单可以选择跟随系统、浅色和深色，并保存当前选择。

## 覆盖语义变量

在引入 LuLu 样式之后覆盖 CSS 变量。优先修改语义 token，组件会自动跟随：

```css
:root {
  --lulu-color-primary: #245edb;
  --lulu-radius: 8px;
}

[data-lulu-theme='dark'] {
  --lulu-color-primary: #73c8ff;
}

@media (prefers-color-scheme: dark) {
  :root:where(:not([data-lulu-theme])) {
    --lulu-color-primary: #73c8ff;
  }
}
```

`--lulu-color-primary` 会同时影响强调文字、选中态和默认实心主操作；`--lulu-color-text` 用于正文，`--lulu-color-border` 用于控件边框。变量定义可在组件包的 `tokens.css` 中查看；页面、标题、代码块和 Demo 卡片颜色属于文档站私有 Token，不进入组件包主题契约。在线设置只修改文档站中的组件主题；业务项目仍需自行引入覆盖 CSS。

需要分别覆盖显式深色主题和跟随系统的深色主题；上面的媒体查询用于后者。

## 局部定制

变量遵循 CSS 继承规则，可以只覆盖某个业务区域。单个按钮也可以覆盖组件专用变量，其他样式仍继承全局主题：

```vue
<LuluButton class="special-button" variant="primary">保存</LuluButton>
```

```css
.special-button {
  --lulu-button-background: #7c3aed;
  --lulu-button-border: #7c3aed;
  --lulu-button-color: #fff;
}
```

Popover、Dropdown、Tooltip 和 Autocomplete 的浮层会传送到最近的 `data-lulu-theme` 容器；原生 Dialog 内的浮层优先留在该 Dialog 内，避免被模态层遮住或无法交互。区域级覆盖请将变量设置在该主题容器或 Dialog 上；普通容器的变量不会随 Teleport 自动复制，单实例覆盖使用 `panelStyle`：

```vue
<LuluTooltip
  :panel-style="{ '--lulu-tooltip-background': '#312e81' }"
>
  说明
</LuluTooltip>
```

`LuluMessageHost` 和 `LuluDialogHost` 会把 `style`、`class`、`data-lulu-theme` 等 Attributes 转交给实际视觉层；`useDialog()` 的单次调用也可设置 `class`、`style`。修改主色时，也要检查文字与暗色主题的对比度。

尺寸档位使用 `small`、`default`、`large`。Space 保留 `middle`，Loading 保留 `sm`、`md`、`lg` 作为兼容别名；默认间距和加载图标尺寸不变。Switch 保留原生 checkbox 的表单和键盘行为，轨道、滑块及选中颜色可通过 `--lulu-switch-*` 定制。
