# Rate 评分

Rate 在对评价进行展示或者对事物进行快速的评级操作时使用。

## 代码演示

<demo title="基本用法" describe="最简单用法。">
<template>
  <lu-rate></lu-rate>
</template>
</demo>

<demo title="自定义个数" describe="传递 count 属性可以控制显示的个数。">
<template>
  <lu-rate :count="10"></lu-rate>
</template>
</demo>

<demo title="半个选择" describe="除了支持最小选中一个还支持选中半个。">
<template>
  <lu-rate :allow-half="true"></lu-rate>
</template>
</demo>

<demo title="只读和禁用" describe="除了支持最小选中一个还支持选中半个。">
<template>
  <lu-space direction="vertical" :style="{display: 'flex'}">
    <lu-rate :model-value="2" disabled></lu-rate>
    <lu-rate :model-value="3" readonly></lu-rate>
  </lu-space>
</template>
</demo>

<demo title="双向绑定" describe="选中的个数受传递的属性控制。" src="./demo/model.vue"></demo>

<demo title="自定义大小" describe="可以传递 `fontSize` 来控制显示的大小。" src="./demo/size.vue"></demo>

## API

| 属性      | 说明         | 类型      | 默认值 |
| --------- | ------------ | --------- | ------ |
| v-model   | 双向绑定     | `number`  | -      |
| count     | 显示评分个数 | `number`  | 5      |
| disabled  | 是否禁用     | `boolean` | -      |
| readonly  | 是否禁用     | `boolean` | -      |
| allowHalf | 是否可选半个 | `boolean` | -      |

### 事件

| 属性   | 说明             | 类型                | 默认值 |
| ------ | ---------------- | ------------------- | ------ |
| change | 当选择评分时触发 | `(e:Event) => void` | -      |
