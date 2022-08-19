# Progress 进度条

在耗时较长的交互中使用

## 代码演示

<demo title="基础状态">
  <lu-progress :value="20">按钮</lu-progress>
</demo>

<demo title="100% 宽度">
  <lu-progress :value="40" block>按钮</lu-progress>
</demo>

<demo title="指定最大值">
  <lu-progress :max="20" :value="10">按钮</lu-progress>
</demo>

## API

| 属性  | 说明                   | 类型      | 默认值 |
| ----- | ---------------------- | --------- | ------ |
| block | 将按钮调整到父宽度大小 | `boolean` | false  |
| value | 设置当前进度条位置     | `number`  | 0      |
| max   | 进度条最大值           | `number`  | 100    |

支持原生 progress 的所有属性
