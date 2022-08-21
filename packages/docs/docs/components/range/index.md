# Range 范围选择

Range 在选择区间的时候使用。

## 代码演示

<demo title="基本用法" describe="选择范围。">
<template>
  <lu-range></lu-range>
</template>
</demo>

<demo title="负数" describe="负数范围也是支持的。">
<template>
  <lu-range :min="-10" :max="10"></lu-range>
</template>
</demo>

<demo title="文字方向调整" describe="默认文字提示是朝上的，如果希望调整可以使用 `direction` 属性调整。">
<template>
  <lu-range :min="-10" :max="10" direction="reverse"></lu-range>
</template>
</demo>

<demo title="自定义提示模板" describe="如果默认提示信息不能满足要求，还可以根据函数进行调整，返回 `false` 类型则不进行提示。" src="./demo/tips.vue"></demo>

<demo title="区块范围选择" describe="默认只能选择一端，如果需要选择一个范围可以使用区块选择。">
<template>
  <lu-range multiple ></lu-range>
</template>
</demo>

<demo title="disabled" describe="处于禁用状态的时候，范围选择框无法滑动，无法点击，无法聚焦，且视觉半透明。">
<template>
  <lu-space direction="vertical" :style="{display: 'flex'}">
    <lu-range disabled multiple ></lu-range>
    <lu-range disabled></lu-range>
  </lu-space>
</template>
</demo>

<demo title="block" describe="range 默认为内联元素，但是指定 `block` 则会独占一行。">
<template>
  <lu-space direction="vertical" :style="{display: 'flex'}">
    <lu-range block  multiple ></lu-range>
    <lu-range block></lu-range>
  </lu-space>
</template>
</demo>

<demo title="双向绑定" describe="range 也支持双向绑定，此时 range 的值为绑定的值。" src="./demo/model.vue"></demo>

<demo title="条件切换" describe="可以根据条件不同显示切换是否用区间选择。" src="./demo/change.vue"></demo>

## API

### 通用属性

| 属性         | 说明                                  | 类型                                    | 默认值                          |
| ------------ | ------------------------------------- | --------------------------------------- | ------------------------------- |
| v-model      | 双向绑定，决定当前范围                | `number`                                | -                               |
| min          | 最小范围值                            | `number`                                | 0                               |
| max          | 最大范围值                            | `number`                                | 100                             |
| step         | 每次滑动的个数                        | `number`                                | 1                               |
| direction    | 显示的方向，默认为朝上                | `normal \| reverse`                     | normal                          |
| promptFormat | 提示的信息，返回为 `false` 不进行展示 | `(from: number) => string \| undefined` | (value:number) => String{value) |
| disabled     | 是否禁用                              | `boolean`                               | -                               |

### multiple 特有属性

| 属性         | 说明                                  | 类型                                                          | 默认值                                                   |
| ------------ | ------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| multiple     | 是否为区间选择                        | `boolean`                                                     | -                                                        |
| v-model:from | 当前范围最小值                        | `number`                                                      | 0                                                        |
| v-model:to   | 当前范围最大值                        | `number`                                                      | 100                                                      |
| promptFormat | 提示的信息，返回为 `false` 不进行展示 | `(from: number, to: number) => [string, string] \| undefined` | (from: number, to: number) => [String(from), String(to)] |

### 事件

| 属性   | 说明           | 类型                 | 默认值 |
| ------ | -------------- | -------------------- | ------ |
| input  | 每次滑动时触发 | `(e: Event) => void` | -      |
| change | 滑动结束时触发 | `(e: Event) => void` | -      |
