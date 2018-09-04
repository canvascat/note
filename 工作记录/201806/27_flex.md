# 20160627

## flex弹性布局复习
使用flex(Flexible Box)布局之后，子元素的`float`、`clear`、`vertical-align`属性会失效
```css
.box {
  display: flex;
  display: inline-flex;
}
```
flex container 默认存在两跟轴：水平主轴(main axis)及纵向交叉轴(cross axis)

### 父容器存在6个相关属性：

1. `flex-direction: row | row-reverse | column | column-reverse;`
主轴方向：水平→ | 水平← | 垂直↓ | 垂直↑
<div style="display: flex;align-items: center;justify-content: space-around">
  <div style="display: flex;flex-direction: row;width: 100px;border: 2px solid #f00;" title="flex-direction: row;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">4</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">5</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">6</div>
  </div>
  <div style="display: flex;flex-direction: row-reverse;width: 100px;border: 2px solid #f00;" title="flex-direction: row-reverse;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">4</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">5</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">6</div>
  </div>
  <div style="display: flex;flex-direction: column;width: 100px;border: 2px solid #f00;" title="flex-direction: column;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">4</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">5</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">6</div>
  </div>
  <div style="display: flex;flex-direction: column-reverse;width: 100px;border: 2px solid #f00;" title="flex-direction: column-reverse;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">4</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">5</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">6</div>
  </div>
</div>
<br/>

2. `flex-wrap: nowrap | wrap | wrap-reverse;`
一行排不下是否换行：不换行 | 换行 | 换行的第二排在上方
<div style="display: flex;align-items: center;justify-content: space-around">
  <div style="display: flex;flex-wrap: no-wrap;width: 100px;border: 2px solid #f00;" title="flex-wrap: no-wrap;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">4</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">5</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">6</div>
  </div>
  <div style="display: flex;flex-wrap: wrap;width: 100px;border: 2px solid #f00;" title="flex-wrap: wrap;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">4</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">5</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">6</div>
  </div>
  <div style="display: flex;flex-wrap: wrap-reverse;width: 100px;border: 2px solid #f00;" title="flex-wrap: wrap-reverse;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">4</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">5</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">6</div>
  </div>
</div>
<br/>

3. `flex-flow`=`flex-direction`+`flex-wrap` 默认`row nowrap`

4. `justify-content: flex-start | flex-end | center | space-between | space-around;`
主轴对齐方式：左对齐 | 右对齐 | 居中 | 两端对齐 | 分散对齐(两边留白宽度为子元素之间距离一半)
<div style="display: flex;align-items: center;justify-content: space-around;flex-wrap: wrap;width: 100%">
  <div style="display: flex;justify-content: flex-start;width: 120px;border: 2px solid #f00;margin-bottom: 5px;" title="justify-content: flex-start;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">4</div>
  </div>
  <div style="display: flex;justify-content: flex-end;width: 120px;border: 2px solid #f00;margin-bottom: 5px;" title="justify-content: flex-end;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">4</div>
  </div>
  <div style="display: flex;justify-content: center;width: 120px;border: 2px solid #f00;margin-bottom: 5px;" title="justify-content: center;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">4</div>
  </div>
  <div style="display: flex;justify-content: space-between;width: 120px;border: 2px solid #f00;margin-bottom: 5px;" title="justify-content: space-between;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">4</div>
  </div>
  <div style="display: flex;justify-content: space-around;width: 120px;border: 2px solid #f00;margin-bottom: 5px;" title="justify-content: space-around;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">4</div>
  </div>
</div>
<br/>

5. `align-items: flex-start | flex-end | center | baseline | stretch;`
纵轴对齐方式：↓ | ↑ | 居中 | 以子元素第一行文字的基准线对齐 | 伸展至整个高度
<div style="display: flex;align-items: center;justify-content: space-around;width: 100%">
  <div style="display: flex;align-items: flex-start;width: 80px;border: 2px solid #f00;" title="flex-start">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 30px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 25px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 40px;border: 2px solid skyblue;">4</div>
  </div>
  <div style="display: flex;align-items: flex-end;width: 80px;border: 2px solid #f00;" title="flex-end">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 30px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 25px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 40px;border: 2px solid skyblue;">4</div>
  </div>
  <div style="display: flex;align-items: center;width: 80px;border: 2px solid #f00;" title="center">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 30px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 25px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 40px;border: 2px solid skyblue;">4</div>
  </div>
  <div style="display: flex;align-items: baseline;width: 80px;border: 2px solid #f00;" title="baseline">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="width: 16px;height: 30px;line-height: 30px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;height: 25px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 40px;line-height: 40px;border: 2px solid skyblue;">4</div>
  </div>
  <div style="display: flex;align-itemst: stretch;width: 80px;border: 2px solid #f00;" title="align-itemst: stretch;">
    <div style="width: 16px;border: 2px solid skyblue;">12</div>
    <div style="width: 16px;border: 2px solid skyblue;">2</div>
    <div style="width: 16px;border: 2px solid skyblue;">3可！</div>
    <div style="width: 16px;border: 2px solid skyblue;">4</div>
  </div>
</div>
<br/>

6. `align-content: flex-start | flex-end | center | space-between | space=around | strech;`
多行轴线对齐方式，只有多行(`flex-wrap: wrap;`)时才有效，效果参考`align-items`

### 子元素相关属性

1. `order: <integer>;`
子元素的排列顺序，数值越小越靠前，默认值0.

2. `flex-grow: <number>;`
子元素放大比例，默认值0，即有多余空间也不放大。

3. `flex-shrink:<number>;`
子元素缩小比例，默认1，即空间不足等比缩小。

4. `flex-basis: <length> | auto;`
子元素占据主轴的的大小，默认auto即本来大小。
设置为和`width`/`height`一样将占据固定空间。

5. `flex`=`flex-grow`+`flex-shrink`+`flex-basis`
默认值`0 1 auto`，设置为`auto`表示`1 1 auto`，`none`表示`0 0 auto`。

6. `align-self: auto | flex-start | flex-end | center | baseline | stretch;`
`align-self`可以覆盖父容器的`align-items`属性，允许其与其他子元素对齐方式不一，`auto`表示继承父容器的`align-items`属性。
<div style="display: flex;align-items: center;justify-content: space-around;width: 100%">
  <div style="display: flex;align-items: flex-start;width: 80px;border: 2px solid #f00;">
    <div style="width: 16px;height: 20px;border: 2px solid skyblue;">1</div>
    <div style="align-self: flex-end;width: 16px;height: 30px;border: 2px solid blue;" title="align-self: flex-end;">2</div>
    <div style="width: 16px;height: 25px;border: 2px solid skyblue;">3</div>
    <div style="width: 16px;height: 40px;border: 2px solid skyblue;">4</div>
    <div style="width: 16px;height: 15px;border: 2px solid skyblue;">5</div>
  </div>
</div>
