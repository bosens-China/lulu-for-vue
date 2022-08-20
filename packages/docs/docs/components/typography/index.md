# Typography 排版

基础排版组件，在需要使用文字和链接的场景下使用。

## 代码演示

### Text

<demo title="type类型" describe="如果不指定type，默认为dark">
<template>
  <lu-space direction="vertical" :style="{display: 'flex'}">
    <lu-text block type="dark">这是一句话</lu-text>
    <lu-text block type="light">这是一句话</lu-text>
    <lu-text block type="gray">这是一句话</lu-text>
    <lu-text block type="blue">这是一句话</lu-text>
    <lu-text block type="red">这是一句话</lu-text>
    <lu-text block type="orange">这是一句话</lu-text>
    <lu-text block type="green">这是一句话</lu-text>
    <lu-text block type="white">这是一句话</lu-text>
  </lu-space>
</template>
</demo>

### Link

<demo title="type类型" describe="跟Text类似，在不指定type的情况下为淡蓝色">
<template>
  <lu-space direction="vertical" :style="{display: 'flex'}">
    <lu-link href="#link">这是一句话</lu-link>
    <lu-link href="#link" type="dark">这是一句话</lu-link>
    <lu-link href="#link" type="light">这是一句话</lu-link>
    <lu-link href="#link" type="gray">这是一句话</lu-link>
    <lu-link href="#link" type="blue">这是一句话</lu-link>
    <lu-link href="#link" type="red">这是一句话</lu-link>
    <lu-link href="#link" type="orange">这是一句话</lu-link>
    <lu-link href="#link" type="green">这是一句话</lu-link>
    <lu-link href="#link" type="white">这是一句话</lu-link>
  </lu-space>

</template>

</demo>

## API

### Text

| 属性  | 说明               | 类型                                                                               | 默认值 |
| ----- | ------------------ | ---------------------------------------------------------------------------------- | ------ |
| type  | 指定文本的颜色类型 | `'dark' \| 'light' \| 'gray' \| 'blue' \| 'red' \| 'orange' \| 'green' \| 'white'` | dark   |
| block | 是否独占一行       | `boolean`                                                                          | -      |

支持原生 span 的所有属性

### Link

| 属性 | 说明               | 类型                                                                               | 默认值     |
| ---- | ------------------ | ---------------------------------------------------------------------------------- | ---------- |
| type | 指定文本的颜色类型 | `'dark' \| 'light' \| 'gray' \| 'blue' \| 'red' \| 'orange' \| 'green' \| 'white'` | 正在加载中 |
| href | 指定链接地址       | `string`                                                                           | -          |

支持原生 a 的所有属性
