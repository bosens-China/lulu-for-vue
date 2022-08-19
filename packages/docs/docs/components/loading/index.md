# Loading 加载中

Loading 用于交互中提示使用

## 代码演示

### Loading

<demo title="加载中">
  <lu-loading></lu-loading>
</demo>

<demo title="自定义颜色">
  <lu-loading color="#000"></lu-loading>
</demo>

<demo title="指定大小">
  <lu-loading :size="4"></lu-loading>
</demo>

<demo title="块级元素，指定高度">
  <lu-loading :rows="5"></lu-loading>
</demo>

<demo title="3s后关闭" src="./demo/demo1.vue"></demo>

### Dot

<demo title="默认">
  <lu-loading-dot></lu-loading-dot>
</demo>

<demo title="指定加载文字">
  <lu-loading-dot describe="加载中"></lu-loading-dot>
</demo>

<demo title="插槽方式使用" describe="如果存在插槽和describe属性默认使用describe属性">
  <lu-loading-dot>加载中</lu-loading-dot>
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
