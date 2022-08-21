# Space 间距

Space 设置组件之间的间距。

## 代码演示

<demo title="基本用法" describe="相邻组件水平间距。">
<template>
  <lu-space>
    <lu-button>world</lu-button>
    <lu-button type='primary'>world</lu-button>
  </lu-space>
</template>
</demo>

<demo title="垂直间距" describe="相邻组件垂直间距。">
<template>
  <lu-space direction="vertical" :style="{display: 'flex'}">
    <lu-button block>world</lu-button>
    <lu-button type='primary'>world</lu-button>
  </lu-space>
</template>
</demo>

<demo title="间距大小" describe="间距预设大、中、小三种大小。通过设置 size 为 `large middle` 分别把间距设为大、中间距。<br > 若不设置 size，则间距默认为小。" src="./demo/size.vue"></demo>

<demo title="对齐" describe="设置对齐模式。" src="./demo/alignment.vue"></demo>

<demo title="自动换行" describe="自动换行。" src="./demo/warp.vue"></demo>

<demo title="分隔符" describe="相邻组件分隔符。" src="./demo/division.vue"></demo>

## API

| 属性      | 说明                                 | 类型                                 | 默认值     |
| --------- | ------------------------------------ | ------------------------------------ | ---------- |
| align     | 对齐方式                             | `small \| middle \| large \| number` | -          |
| direction | 间距方向                             | `vertical \| horizontal`             | horizontal |
| size      | 间距大小                             | `SpaceSIze`                          | small      |
| wrap      | 是否自动换行，仅在 horizontal 时有效 | `boolean`                            | -          |

- SpaceSIze

`'small' | 'middle' | 'large' | number`

### 插槽

| 属性  | 说明     | 类型    | 默认值 |
| ----- | -------- | ------- | ------ |
| split | 设置拆分 | `slots` | -      |
