---
title: Form 表单
description: 表单组件组合模型校验、字段错误和语义化提交。
seo:
  title: Vue Form 表单组件
  description: LuLu UI Vue 表单组件的中文用法与示例。
  keywords:
    - 表单
    - Vue 表单
---

# Form 表单

## 基础用法

::: demo basic
Form 管理模型、校验与提交，FormItem 组合字段标签、帮助和错误。输入姓名后点击提交，必填校验通过后触发 `finish`，由应用保存数据。
:::

表单由 Form 与 [FormItem](/components/form/#luluformitem) 组合使用，错误自动显示在对应表单项中。FormItem 也可独立展示外部传入的错误或使用 `error` 插槽自定义内容。

不传 `model` 时保留原生表单行为：`action`、`method`、`autocomplete` 等属性和 `@submit` 事件可用；在 `@submit` 中调用 `event.preventDefault()` 可由业务接管提交。

## 表单校验

::: demo validation
传入 `model` 后，Form 自动拦截默认提交，检查必填、原生输入约束和业务规则；FormItem 根据 `name` 展示错误。库内控件自动获得 ID、name、required 和错误关联，不需要手动传递 `errors` 或 `controlProps`。
:::

模型是可变的普通对象，`name` 对应顶层字段键，不解析点号路径。布尔、数值、数组等保持原类型传给规则；规则参数是 `unknown`，使用前先缩窄。原生约束通过后，先执行 Form 规则，再执行 FormItem 的规则，每个字段遇到首个错误便停止。

```ts
const rules: FormRules = {
  enabled: value => value === true ? undefined : '请启用此项',
  tags: value => Array.isArray(value) && value.length > 0 ? undefined : '请选择标签',
}
```

规则签名为 `(value: unknown, { name, model }) => string | undefined | Promise<string | undefined>`。返回字符串表示失败，返回 `undefined` 表示通过；支持异步规则和通过 `model` 快照读取其他字段。抛出或拒绝的 `Error` 展示其 message，其他异常展示“校验失败，请重试”。规则应只读取输入，不修改快照。

默认在提交时校验，也可调用 `await form.validate()`，它只更新错误，不发送提交结果事件。异步校验期间修改模型、改变规则、开始新校验、清除错误或重置表单，都会废弃旧结果；过期的 `validate()` 返回 `false`，不会覆盖当前错误或发送 finish 事件。

## 重置数据与校验

::: demo reset
`resetFields()` 恢复首次挂载时的模型快照并清除错误，无需再手动修改各字段。模型模式下，原生 reset 按钮也会执行同样操作。
:::

快照支持普通对象、数组和 Date；新增的顶层字段会在重置时删除。不要将 Map、Set、文件或自定义类实例作为需要恢复的模型值。未传 model 的原生表单仍由浏览器执行 reset。

## 表单项

`name` 对应 Form 模型的顶层键，不解析点号路径。`required` 同时用于必填标记、原生控件和模型校验；`null`、`undefined`、空字符串、`false` 和空数组视为空，数值 `0` 可以通过。默认生成唯一控件 ID，也可以通过 `controlId` 指定；需要自定义 ID 时在 FormItem 上统一设置。

默认错误来自 Form；显式 `error` 优先，传空字符串可隐藏上下文错误。帮助说明和错误会合并到 `aria-describedby`，错误还通过 `aria-errormessage` 和 `aria-invalid` 关联。错误由 FormItem 内部渲染，不需要额外错误组件。

独立使用 FormItem 时仍可展示 label/help/error，但规则由模型 Form 执行。一个 FormItem 对应一个逻辑字段；多输入组件由组件内部把 ID 关联主输入、把错误关联传播到两端。

## 原生或第三方控件

::: demo native-controls
第三方控件与原生元素通过 scoped slot 的 controlProps 接入；把属性绑定到实际可聚焦的输入，而不是布局容器。
:::

手动按需导入时，除应用入口的 `@lulu/vue/base.css` 外，只需导入 `@lulu/vue/form-item/style.css`；字段与错误样式已包含其中。

## 自定义标签、帮助与错误

::: demo field-slots
FormItem 可以独立展示业务错误。使用 label、help 和 error 插槽定制内容，错误节点保留 errorId 与 role="alert"，让输入和错误继续关联。
:::

## API

### LuluForm

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model` | 可变表单模型，传入后启用集成校验与提交；支持业务接口类型。 | `object` | — |
| `rules` | 以顶层字段名为键的规则；单字段可提供多条规则。 | `FormRules` | — |

#### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `submit` | 原生提交事件；模型模式自动阻止默认提交。 | `event: Event` |
| `reset` | 原生重置事件；模型模式自动恢复模型。 | `event: Event` |
| `finish` | 模型模式提交校验成功。 | `values: FormModel`，独立快照 |
| `finishFailed` | 模型模式提交校验失败。 | `{ values: FormModel, errors: FormErrors }` |

#### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 原生表单控件与操作按钮。 | — |

#### Expose

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `element` | 原生表单元素，供浏览器原生 Form API 使用。 | `HTMLFormElement \| null` |
| `errors` | 当前字段错误。 | `Readonly<FormErrors>` |
| `validating` | 是否存在当前有效的待完成校验。 | `boolean` |
| `validate` | 执行校验，不发送 finish/finishFailed。 | `() => Promise<boolean>` |
| `resetFields` | 恢复初始模型并清除错误。 | `() => void` |
| `clearValidate` | 清除全部或指定字段错误，并废弃待完成校验。 | `(names?: string \| readonly string[]) => void` |

组件实例可用 `FormInstance` 类型标注；模型规则使用 `FormRule` 和 `FormRules`。

### LuluFormItem

#### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 模型 Form 的顶层字段名。 | `string` | — |
| `controlId` | 标签关联的控件 ID。 | `string` | 自动生成 |
| `label` | 字段标签。 | `string` | — |
| `required` | 必填标记和模型必填校验。 | `boolean` | `false` |
| `help` | 字段帮助说明。 | `string` | — |
| `error` | 显式错误，优先于 Form 的字段错误。 | `string` | — |
| `rules` | 同步或异步规则，在 Form 的字段规则之后执行。 | `FormRule \| readonly FormRule[]` | — |

#### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 字段控件；库内控件自动连接上下文。 | `{ controlProps }` |
| `label` | 自定义标签，保留关联 ID。 | — |
| `help` | 自定义帮助说明，自动关联描述。 | — |
| `error` | 自定义错误展示，应保留 errorId。 | `{ errorId, message }` |

## CSS Tokens

以下变量涵盖本页组件及其组合子组件，可在业务容器或应用根节点覆盖。

### 组件与家族变量

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-form-error-color` | 字段错误文字颜色 | `#c53030` | `#f87171` |
| `--lulu-form-error-font-size` | 字段错误字体尺寸 | `12px` | `12px` |
| `--lulu-form-error-margin` | 字段错误外边距 | `4px 0 0` | `4px 0 0` |
| `--lulu-form-gap` | 表单间距 | `16px` | `16px` |
| `--lulu-form-item-gap` | 表单字段间距 | `4px` | `4px` |
| `--lulu-form-label-color` | 表单标签文字颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-form-label-weight` | 表单标签字重 | `600` | `600` |

</div>

<details class="docs-token-details">
<summary>全局基础变量</summary>

<div class="docs-token-table">

| Token | 用途 | 浅色默认值 | 深色默认值 |
| --- | --- | --- | --- |
| `--lulu-color-danger` | 危险或错误状态 | `#c53030` | `#f87171` |
| `--lulu-color-text` | 正文颜色 | `#4c5161` | `#f4f4f5` |
| `--lulu-color-text-muted` | 辅助文案或禁用文字 | `#667085` | `#a1a1aa` |
| `--lulu-font-family` | 字体族 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--lulu-font-size` | 正文大小 | `14px` | `14px` |
| `--lulu-font-size-sm` | 辅助文字大小 | `12px` | `12px` |
| `--lulu-font-weight-strong` | 字体字重强调 | `600` | `600` |
| `--lulu-line-height` | 行高 | `1.5` | `1.5` |
| `--lulu-space-1` | 最小间距 | `4px` | `4px` |
| `--lulu-space-4` | 大间距 | `16px` | `16px` |

</div>

</details>
