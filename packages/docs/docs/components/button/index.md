# Button 按钮

按钮用于开始一个即时操作。

## 代码演示

<demo title="不同类型按钮">
  <lu-button>按钮</lu-button>
  <lu-button type='normal'>按钮</lu-button>
  <lu-button type='primary'>按钮</lu-button>
  <lu-button type='success'>按钮</lu-button>
  <lu-button type='warning'>按钮</lu-button>
  <lu-button type='danger'>按钮</lu-button>
</demo>

<demo title="块按钮">
  <lu-button block>按钮</lu-button>
  <lu-button block type='primary'>按钮</lu-button>
</demo>

<demo title="禁用按钮">
  <lu-button disabled>按钮</lu-button>
  <lu-button disabled type='primary'>按钮</lu-button>
</demo>

<demo title="loading">
  <lu-button loading>按钮</lu-button>
  <lu-button loading type='primary'>按钮</lu-button>
</demo>

## API

| 属性     | 说明                   | 类型                                                          | 默认值 |
| -------- | ---------------------- | ------------------------------------------------------------- | ------ |
| block    | 将按钮调整到父宽度大小 | `boolean`                                                     | false  |
| type     | 设置按钮类型           | `'normal' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | -      |
| disabled | 是否为禁用状态         | `boolean`                                                     | false  |
| loading  | 是否为加载中状态       | `boolean`                                                     | false  |

支持原生 button 的所有属性
