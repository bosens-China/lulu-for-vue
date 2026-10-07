# @lulu/vue

Vue 3 组件库，API 以现代 Vue 受控组件为中心，并提供基于 LuLu UI Edge 默认调色板的可覆盖主题。

## 导入组件

完整引入适合演示、原型或确实需要大部分组件的应用：

```ts
import { LuluButton, LuluDialog } from '@lulu/vue'
import '@lulu/vue/style.css'
```

业务应用优先按组件引入。组件入口只引用其运行时依赖，`base.css` 在应用入口导入一次，每个组件再导入自己的独立样式：

```ts
import LuluButton from '@lulu/vue/button'
import '@lulu/vue/base.css'
import '@lulu/vue/button/style.css'
```

Composable 同样有稳定入口；例如 `useMessage` 可从 `@lulu/vue/use-message` 具名导入。需要消息视觉样式时，在应用入口导入 `base.css` 和 `@lulu/vue/message/style.css`。

包只公开根入口、`resolver`、组件短路径和样式入口。组件 JavaScript 短路径通过受限通配符映射到公共 `entries` 构建目录；不要从 `dist/components` 等内部路径导入。组件入口导向共享的构建模块：例如 `popconfirm` 会引用 `popover`，不会把 Popover 的源码复制进每一个组件入口。最终应用仍会包含该组件的直接依赖，这是正常且必要的依赖图。

手动引入组合组件时，还需引入其直接依赖的样式：`data-table → table`、`dialog-host → dialog`、`form-field → field-error`、`loading-overlay → loading`、`message-host → message`、`popconfirm → popover`。`LuluResolver` 会自动补齐这些依赖。

## 模板自动导入

自动导入是可选的开发体验，不是 tree-shaking 的前提。应用安装构建插件后，可直接在模板中使用组件，resolver 会同时导入共享基础样式、组件样式及其直接依赖样式：

```ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { LuluApiResolver, LuluResolver } from '@lulu/vue/resolver'

export default {
  plugins: [
    Components({ resolvers: [LuluResolver()] }),
    AutoImport({ resolvers: [LuluApiResolver()] }),
  ],
}
```

`LuluResolver` 只解析 `Lulu*` 公开组件；`LuluApiResolver` 解析 `useMessage`、`useDialog` 和 `useFormValidation`。插件由应用作为开发依赖安装，`@lulu/vue` 不会把它们带入运行时。

## 命令式弹窗

在祖先模板中放置 `LuluDialogHost`，后代 setup 从 `@lulu/vue/use-dialog` 获取 `useDialog()`，事件中调用 `open`、`confirm` 或 `alert`。按需使用时在应用入口引入一次 `base.css`，再依次引入 `dialog/style.css` 与 `dialog-host/style.css`；resolver 会自动补齐。根入口同样导出宿主、hook 和类型。

`confirm` 等待确认结果，`open` 返回可关闭句柄；同一宿主串行显示，调用者卸载时自动清理。与消息组合时，让 `LuluMessageHost` 包裹 `LuluDialogHost`。完整选项与生命周期见 [DialogHost 文档](./src/components/overlay/dialog-host/readme/README.md)。

## 使用样式

组件逻辑和默认主题分开发布。全量引入使用 `style.css`；按需引入时在应用入口导入一次 `base.css`，再导入所需组件的样式入口。不要同时导入 `style.css` 和按需样式。

```ts
import '@lulu/vue/style.css'
```

## 覆盖 Token

主题通过 CSS 自定义属性提供。默认主题采用 Edge 的浅色值；没有显式主题时，根节点跟随系统深色偏好。可以在根节点显式选定浅色或深色：

```html
<html data-lulu-theme="dark">
```

局部主题使用相同属性。Popover、Dropdown、Tooltip 和 Autocomplete 的浮层会传送到最近的 `[data-lulu-theme]` 容器，并继承该容器的变量。只有普通 class 的局部容器不会成为传送目标，其中的变量也不会跨 Teleport；区域级定制请把变量放在最近的 `[data-lulu-theme]` 容器上，单个浮层实例使用 `panelStyle`。局部主题容器应避免设置 `transform` 或裁剪浮层的 `overflow`。

```html
<section data-lulu-theme="light">
  <!-- 这里的 LuLu 组件及其浮层使用浅色主题 -->
</section>
```

全局自定义值放在 `:root`，局部覆盖放在主题容器上：

```css
.admin-theme {
  --lulu-color-primary: #7c3aed;
  --lulu-radius: 8px;
  --lulu-control-height: 44px;
}
```

`--lulu-color-primary-solid` 默认继承 `--lulu-color-primary`，因此修改主色会同时影响强调文字、选中态和实心主操作；只有需要区分两者时才单独覆盖 `primary-solid`。Token 分为颜色、排版、尺寸、间距、圆角、阴影、动效和层级。组件使用 `--lulu-*` 变量；不支持旧版 `--ui-*` 变量、`.ui-*` 选择器或 `[is]` Custom Element 结构。自定义值若要覆盖显式主题，选择器需要至少与 `[data-lulu-theme]` 一样具体，并放在主题 CSS 之后。

必要的组件 Token 使用全局语义 Token 作为回退，例如 `--lulu-dialog-background` 回退到 `--lulu-color-surface`。全局主题优先改语义 Token；只定制一类组件时改组件 Token；只定制一个普通组件实例时可直接在组件 `style` 上设置。输入控件家族还支持 `--lulu-control-background`、`--lulu-control-border`、`--lulu-control-color`、`--lulu-control-radius`、`--lulu-control-padding-inline` 与 `--lulu-control-focus-shadow`，浮层面板支持对应的 `--lulu-floating-*` Token。

Teleport 面板使用 `panelStyle` 做单实例覆盖：

```vue
<LuluTooltip
  :panel-style="{ '--lulu-tooltip-background': '#312e81' }"
>
  说明
</LuluTooltip>
```

`LuluMessageHost` 和 `LuluDialogHost` 会把 class、style、`data-lulu-theme` 等 Attributes 转交给实际消息层或弹窗，因此也可直接设置单实例 Token。

## UnoCSS 命名约定

包在构建期使用 UnoCSS，发布的 `base.css` 包含带 `lulu-u-` 前缀的静态 utility，不输出 preflight。使用方无需安装 UnoCSS。`lulu-` 是组件结构类名，`--lulu-*` 是主题 token；主题覆盖通过 CSS 变量完成。

## 许可证与来源

`@lulu/vue` 使用 MIT 许可证。组件的视觉语义参考了 [LuLu UI](https://github.com/yued-fe/lulu)，并保留其原始 MIT 版权声明；Vue API、主题扩展和文档由本项目维护。详见仓库根目录的 `LICENSE`。
