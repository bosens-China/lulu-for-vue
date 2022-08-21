# Loading 加载中

Loading 用于交互中提示使用。

## 代码演示

### Loading

<demo title="基本用法" describe="组件的基本用法。">
<template>
  <lu-loading></lu-loading>
</template>
</demo>

<demo title="自定义颜色" describe="如果对默认颜色不满意，可以传递 color 属性进行调整。">
<template>
  <lu-loading color="#000"></lu-loading>
</template>
</demo>

<demo title="指定大小" describe="大小默认为2，可以在 1-4 区间进行调整。">
<template>
  <lu-loading :size="4"></lu-loading>
</template>
</demo>

<demo title="块级元素，指定高度" describe="loading 默认为内联元素，可以指定 rows 属性对高度进行调整，此时 loading 为块元素。">
<template>
  <lu-loading :rows="5"></lu-loading>
</template>
</demo>

<demo title="3s后关闭" describe="下面演示点击按钮 loading 3s 后关闭。" src="./demo/demo1.vue"></demo>

### Dot

<demo title="基本用法" describe="Dot 用于文字提示加载，可以结合 Loading 一起使用。">
<template>
  <lu-loading-dot></lu-loading-dot>
</template>
</demo>

<demo title="指定加载文字" describe="如果对默认文字不满意可以指定 describe 属性进行调整。">
<template>
  <lu-loading-dot describe="加载中"></lu-loading-dot>
</template>
</demo>

<demo title="插槽方式使用" describe="如果存在插槽和 describe 属性默认使用 describe 属性。">
<template>
  <lu-loading-dot>加载中</lu-loading-dot>
</template>
</demo>

## API

### Loading

| 属性    | 说明                                                   | 类型           | 默认值 |
| ------- | ------------------------------------------------------ | -------------- | ------ |
| color   | Loading 加载的颜色值                                   | `string`       | -      |
| size    | 指定 Loading 加载的大小                                | `number<1-4>`  | 2      |
| rows    | 指定 Loading 的高度，使用此属性 Loading 会变成块级元素 | `number<1-15>` | 1      |
| visible | 是否为加载中状态                                       | `boolean`      | true   |

### Loading.Dot

| 属性     | 说明         | 类型                        | 默认值     |
| -------- | ------------ | --------------------------- | ---------- |
| describe | 指定描述文本 | `string` \| `slots.default` | 正在加载中 |
