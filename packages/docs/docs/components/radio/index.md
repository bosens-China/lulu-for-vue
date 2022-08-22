# Radio 单选框

存在多个选项时使用（建议最多不超过三个）。

## 代码演示

<demo title="基本用法" describe="最简单的用法。">
<template>
  <lu-radio>文本</lu-radio>
</template>
</demo>

<demo title="单选互斥" describe="指定 name 之后当前单选框互斥，name 也可以不指定由组件生成。" src="./demo/mutex.vue"></demo>

<demo title="指定默认值" describe="在不指定 v-model 的情况下，你可以指定 defaultValue 来决定当前选中的值。" src="./demo/default.vue"></demo>

<demo title="双向绑定" describe="演示指定值和双向绑定使用方式。" src="./demo/model.vue"></demo>

<demo title="禁用" describe="添加 disabled 属性，此时 Radio 不可选中。" src="./demo/disabled.vue"></demo>

<demo title="属性生成" describe="除了支持 radio 组件使用，还可以使用 options 快速生成。" src="./demo/options.vue"></demo>

## API

| 属性     | 说明                                               | 类型      | 默认值 |
| -------- | -------------------------------------------------- | --------- | ------ |
| disabled | 是否禁用                                           | `boolean` | -      |
| v-model  | 指定 radio 是否选中，注意如果存在 group 此属性失效 | `boolean` | -      |
| value    | group 下决定组件是否被选中                         | `any`     | -      |

### group

| 属性         | 说明                                                    | 类型             | 默认值 |
| ------------ | ------------------------------------------------------- | ---------------- | ------ |
| disabled     | 是否全部禁用                                            | `boolean`        | -      |
| v-model      | 指定当前 radio 的选中值                                 | `boolean`        | -      |
| name         | 配置 input 的 name 属性，决定是否为一组，默认为计数累加 | `string`         | -      |
| name         | 配置 input 的 name 属性，决定是否为一组，默认为计数累加 | `string`         | -      |
| options      | 配置 radio 生成的快捷方式                               | `string`         | -      |
| defaultValue | 默认 radio 的选中值                                     | `Array<Options>` | -      |

- Options

`string | number | { label: string; value: string; disabled?: boolean }`
