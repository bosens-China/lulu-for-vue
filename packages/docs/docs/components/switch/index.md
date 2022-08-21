# Switch 开关

Switch 在开启和关闭的场景下使用。

## 代码演示

<demo title="基本用法" describe="swtich默认状态。">
<template>
  <lu-switch />
</template>
</demo>

<demo title="双向绑定示例" describe="如果指定了属性，则 switch 的状态为对应对象的值。" src="./demo/model.vue"></demo>

<demo title="禁用" describe="指定 disabled 属性，当前组件不可被点击。">
<template>
  <lu-switch disabled />
</template>
</demo>

## API

| 属性     | 说明         | 类型      | 默认值 |
| -------- | ------------ | --------- | ------ |
| disabled | 组件是否禁用 | `boolean` | -      |
| v-model  | 双向绑定     | `boolean` | -      |

### 事件

| 属性   | 说明             | 类型                | 默认值 |
| ------ | ---------------- | ------------------- | ------ |
| change | 组件被改变时触发 | `(e:Event) => void` | -      |
