# Button 按钮

Button 用于开始一个即时操作。

## 代码演示

<demo title="基本用法" describe="下面为所有 按钮的 type。">
<template>
  <lu-space>
    <lu-button>按钮</lu-button>
    <lu-button type='normal'>按钮</lu-button>
    <lu-button type='primary'>按钮</lu-button>
    <lu-button type='success'>按钮</lu-button>
    <lu-button type='warning'>按钮</lu-button>
    <lu-button type='danger'>按钮</lu-button>
  </lu-space>
</template>
</demo>

<demo title="块按钮" describe="设置 block 属性会让按钮独占一行。">
<template>
  <lu-space direction="vertical" :style="{display: 'flex'}">
    <lu-button block>按钮</lu-button>
    <lu-button block type='primary'>按钮</lu-button>
  </lu-space>
</template>

</demo>

<demo title="禁用按钮" describe="设置 disabled 会让按钮变成不可点击以及透明。">
<template>
  <lu-space>
    <lu-button disabled>按钮</lu-button>
    <lu-button disabled type='primary'>按钮</lu-button>
  </lu-space>
</template>
</demo>

<demo title="loading" describe="设置 loading 让按钮处于加载状态，此时按钮点击事件将会失效。">
<template>
  <lu-space>
    <lu-button loading>按钮</lu-button>
    <lu-button loading type='primary'>按钮</lu-button>
  </lu-space> 
</template>
</demo>

## API

| 属性     | 说明                   | 类型                                                          | 默认值 |
| -------- | ---------------------- | ------------------------------------------------------------- | ------ |
| block    | 将按钮调整到父宽度大小 | `boolean`                                                     | false  |
| type     | 设置按钮类型           | `'normal' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | -      |
| disabled | 是否为禁用状态         | `boolean`                                                     | false  |
| loading  | 是否为加载中状态       | `boolean`                                                     | false  |

支持原生 button 的所有属性
