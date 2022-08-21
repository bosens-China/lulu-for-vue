# Radio 单选框

存在多个选项时使用（建议最多不超过三个）。

## 代码演示

<demo title="基本用法" describe="最简单的用法。">
<template>
  <lu-radio>文本</lu-radio>
</template>
</demo>

<demo title="单选互斥" describe="指定 name 之后当前单选框互斥，name 也可以不指定由组件生成。" src="./demo/mutex.vue"></demo>

<demo title="双向绑定" describe="演示指定值和双向绑定使用方式。" src="./demo/model.vue"></demo>

<demo title="禁用" describe="添加 disabled 属性，此时 Radio 不可选中。" src="./demo/disabled.vue"></demo>

<demo title="属性生成" describe="除了支持 radio 组件使用，还可以使用 options 快速生成。" src="./demo/options.vue"></demo>

## API
