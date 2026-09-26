---
title: 主题定制
description: 使用 LuLu UI Vue 的 CSS 变量定制 light 和 dark 主题。
seo:
  keywords: [LuLu UI Vue 主题, CSS 变量, 暗色模式]
---

# 主题定制

组件通过 `--lulu-*` CSS 变量读取语义色、尺寸与间距。默认主题以 LuLu UI Edge 为基准，并提供 light、dark 两套颜色。

## 在线设置主色

点击页面顶部的“设置主色调”按钮，选择颜色后会立即应用到整个文档站，并保存在当前浏览器。点击“恢复默认主色”即可撤销定制。

主色选择共享一个色相；亮色与深色分别计算适合背景的明度，其他语义色仍使用各模式默认值。因此切换到深色后，定制主色仍然生效。选色器只使用所选颜色的色相和饱和度，明度会自动调整。

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

`--lulu-color-primary` 用于强调色，`--lulu-color-bg-page` 用于页面背景，`--lulu-color-text` 与 `--lulu-color-text-heading` 用于正文和标题，`--lulu-color-border` 用于边框。变量定义可在组件包的 `tokens.css` 中查看。在线选色只修改文档站；业务项目仍可按需覆盖 CSS 变量。

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
