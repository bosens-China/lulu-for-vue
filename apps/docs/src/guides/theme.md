---
title: 主题定制
description: 使用 LuLu UI Vue 的 CSS 变量定制 light 和 dark 主题。
seo:
  keywords: [LuLu UI Vue 主题, CSS 变量, 暗色模式]
---

# 主题定制

组件通过 `--lulu-*` CSS 变量读取语义色、尺寸与间距。默认主题以 LuLu UI Edge 为基准，并提供 light、dark 两套颜色。

## 在线调色盘

使用色盘分别调整浅色和深色主题。调整强调色会同步主按钮底色，也可以单独微调按钮。预览只作用于下方组件区域；复制生成的 CSS 后，放在 LuLu 样式之后即可应用到项目。

<ThemePlayground />

## 选择明暗主题

在根元素或局部容器上设置 `data-lulu-theme`：

```html
<div data-lulu-theme="dark">
  <!-- 此容器中的 LuLu 组件使用暗色主题 -->
</div>
```

值为 `light` 时使用浅色主题；不设置时根据系统偏好选择。文档站右上角的按钮会保存当前选择。

## 覆盖语义变量

在引入 LuLu 样式之后覆盖 CSS 变量。优先修改语义 token，组件会自动跟随：

```css
:root {
  --lulu-color-primary: #245edb;
  --lulu-color-primary-solid: #245edb;
  --lulu-radius: 8px;
}

[data-lulu-theme='dark'] {
  --lulu-color-primary: #73c8ff;
  --lulu-color-bg-page: #0b1220;
}

@media (prefers-color-scheme: dark) {
  :root:where(:not([data-lulu-theme])) {
    --lulu-color-primary: #73c8ff;
    --lulu-color-bg-page: #0b1220;
  }
}
```

`--lulu-color-primary` 用于强调色，`--lulu-color-bg-page` 用于页面背景，`--lulu-color-text` 与 `--lulu-color-text-heading` 用于正文和标题，`--lulu-color-border` 用于边框。变量定义可在组件包的 `tokens.css` 中查看。

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

Popover、Dropdown、Tooltip 和 Autocomplete 的浮层会传送到最近的 `data-lulu-theme` 容器。要覆盖浮层变量，请将它们设置在该容器上；只设置在触发组件上的变量不会传给浮层。修改主色时，也要检查文字与暗色主题的对比度。
