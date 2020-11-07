# CSS 选择器

> 注：《CSS 选择器世界》归纳

## 基本概念

CSS 选择器可以分为 4 类，即选择器、选择符、伪类和伪元素。

1. 选择器这里的“选择器”指的就是平常使用的 CSS 声明块前面的标签、类名等。例如：`body { font: menu; }` 这里的 body 就是一种选择器，是类型选择器，也可以称为标签选择器。
2. 选择符目前我所知道的 CSS 选择器世界中的选择符有 5 个，即表示后代关系的空格` `，表示父子关系的尖括号`>`，表示相邻兄弟关系的加号`+`，表示兄弟关系的弯弯`~`，以及表示列关系的双管道`||`。这 5 种选择符分别示意如下：

```css
/* 后代关系 */
.container img {
  object-fit: cover;
}
/* 父子关系 */
ol > li {
  margin: 0.5em 0;
}
/* 相邻兄弟关系 */
button + button {
  margin-left: 10px;
}
/* 兄弟关系 */
button ~ button {
  margin-left: 10px;
}
/* 列 || 组合器选择属于某个表格行的节点 */
/* col || td 会匹配所有 <col> 作用域内的 <td> 元素 */
.col||td {
  background-color: skyblue;
}
```

3. 伪类伪类的特征是其前面会有一个冒号`:`，通常与浏览器行为和用户行为相关联，可以看成是 CSS 世界的 JavaScript。伪类和选择符相互配合可以实现非常多的纯 CSS 交互效果。例如：`a:hover { color: darkblue; }`
4. 伪元素伪元素的特征是其前面会有两个冒号`::`，常见的有`::be-fore`，`::after`，`::first- letter` 和`::first-line` 等。

整体焦点伪类 `:focus-within`，在当前元素或者当前元素的任意子元素处于聚焦状态时会被匹配。
键盘焦点伪类 `:focus-visible`，当元素匹配`:focus`伪类并且客户端(UA)的启发式引擎决定焦点应当可见(在这种情况下很多浏览器默认显示“焦点框”。)时，`:focus-visible` 伪类将生效。
占位符显示伪类 `:placeholder-shown`，在 `<input>` 或 `<textarea>` 元素显示 `placeholder text` 时生效。[利用 `:placeholder-shown` 实现 Material Design 风格输入框](https://demo.cssworld.cn/selector/9/1-1.php)

## CSS 优先级

CSS 优先级有着明显的不可逾越的等级制度，我将其划分为 0 ～ 5 这 6 个等级，其中前 4 个等级由 CSS 选择器决定，后 2 个等级由书写形式和特定语法决定。下面我将对这 6 个等级分别进行讲解。

1. 0 级：通配选择器、选择符和逻辑组合伪类。其中，通配选择器写作星号`*`。示例如下：
   `* { color: #000; }`
   选择符指`+`、`>`、`~`、空格和`||`。
   逻辑组合伪类有`:not()`、`:is()`和`:where`等，这些伪类本身并不影响 CSS 优先级，影响优先级的是括号里面的选择器。
   `:not() {}`需要注意的是，只有逻辑组合伪类的优先级是 0，其他伪类的优先级并不是这样的。
2. 1 级：标签选择器。示例如下：`body { color: #333; }`
3. 2 级：类选择器、属性选择器和伪类。示例如下：
   `.foo { color: #666; }`
   `[foo] { color: #666; }`
   `:hover { color: #333; }`
4. 3 级：ID 选择器。示例如下：
   `#foo { color: #999; }`
5. 4 级：style 属性内联。示例如下：
   `<span style="color: #ccc;">优先级</span>`
6. 5 级：`!important`。示例如下：
   `.foo { color: #fff !important; }`
   `!important`是顶级优先级，可以重置 JavaScript 设置的样式，唯一推荐使用的场景就是使 JavaScript 设置无效。例如：

```css
.foo[style*='color: #ccc'] {
  color: #fff !important;
}
```

不难看出，CSS 选择器的优先级（0 级至 3 级）属于 CSS 优先级的一部分，也是最重要、最复杂的部分。

### CSS 选择器优先级

每一段 CSS 语句的选择器都可以对应一个具体的数值，数值越大优先级越高，其中的 CSS 语句将被优先渲染。其中，出现一个 0 级选择器，优先级数值+0；出现一个 1 级选择器，优先级数值+1；出现一个 2 级选择器，优先级数值+10；出现一个 3 级选择器，优先级数值+100。

| 选择器                     | 计算值 | 计算细则                                                                              |
| -------------------------- | ------ | ------------------------------------------------------------------------------------- |
| `* {}`                     | 0      | 1 个 0 级通配选择器，优先级数值为 0                                                   |
| `div {}`                   | 1      | 1 个 1 级标签选择器，优先级数值为 1                                                   |
| `ul > li {}`               | 2      | 2 个 1 级标签选择器，1 个 0 级选择符，优先级数值为 1+0+1                              |
| `li > ol + ol {}`          | 3      | 3 个 1 级标签选择器，2 个 0 级选择符，优先级数值为 1+0+1+0+1                          |
| `.foo {}`                  | 10     | 1 个 2 级类名选择器，优先级数值为 10                                                  |
| `a:not([rel=nofollow]) {}` | 11     | 1 个 1 级标签选择器，1 个 0 级否定伪类，1 个 2 级属性选择器，优先级数值为 1+0+10      |
| `a:hover {}`               | 11     | 1 个 1 级标签选择器，1 个 2 级伪类，优先级数值为 1+10                                 |
| `ol li.foo {}`             | 12     | 1 个 2 级类名选择器，2 个 1 级标签选择器，1 个 0 级空格选择符，优先级数值为 1+0+1+10  |
| `li.foo.bar {}`            | 21     | 2 个 2 级类名选择器，1 个 1 级标签选择器，优先级数值为 10×2+1                         |
| `#foo {}`                  | 100    | 1 个 3 级 ID 选择器，优先级数值为 100                                                 |
| `#foo .bar p {}`           | 111    | 1 个 3 级 ID 选择器，1 个 2 级类名选择器，1 个 1 级标签选择器，优先级数值为 100+10+11 |

举个例子：

```html
<html lang="zh-CN">
  <body class="foo">
    颜色是？
  </body>
</html>
<style>
  body.foo:not([dir]) {
    color: red;
  }
  html[lang] > .foo {
    color: blue;
  }
</style>
```

首先是`body.foo:not([dir])`，出现了 1 个标签选择器`body`，1 个类名选择器`.foo`和 1 个否定伪类`:not`，以及属性选择器`[dir]`，计算结果是 1+10+0+10，也就是 21。接下来是`html[lang] > body.foo`，出现了 1 个标签选择器`html`，1 个属性选择器`[lang]`和 1 个类名选择器`.foo`，计算结果是 1+10+10，也就是 21。

当两个选择器的计算值是一样的时候就需要另外一个重要的规则——“后来居上”。也就是说，当 CSS 选择器的优先级数值一样的时候，后渲染的选择器的优先级更高。因此，上题的最终颜色是 blue。后渲染优先级更高的规则是相对于整个页面文档而言的，而不仅仅是在一个单独的 CSS 文件中。

增加 CSS 选择器优先级的小技巧：
**重复选择器自身**，既提高了优先级，又不会增加耦合。例如：`.foo.foo`（10+10）、`.foo[class] {}`（10+10）、`#foo[id] {}`（100+10）。

### CSS 选择器命名

大小写

| 选择器类型        | 示例            | 是否对大小写敏感 |
| ----------------- | --------------- | ---------------- |
| 标签选择器        | `div {}`        | 不敏感           |
| 属性选择器-纯属性 | `[attr]`        | 不敏感           |
| 属性选择器        | `[attr=val]`    | 属性值敏感       |
| 类选择器          | `.container {}` | 敏感             |
| ID 选择器         | `#container{}`  | 敏感             |

合法性

这里主要讲一下类选择器和 ID 选择器的命名合法性问题，旨在纠正大家长久以来的错误认识。什么错误认识呢？最常见的就是类名选择器和 ID 选择器不能以数字开头，如下：
`.1-foo { border: 10px dashed; padding: 10px; } /* 无效 */`  
对，上面这种写法确实无效，但这并不是因为不能以数字开头，而是不能直接写数字，需要将其转义一下，如下：
`.\31 -foo { border: 10px dashed; padding: 10px; } /* 有效 */`

其实`\31`外加空格是 CSS 中字符 1 的十六进制转码表示。其中 31 就是字符 1 的 Unicode 值，如下：

```js
console.log('1'.charCodeAt().toString(16)); // 结果是31
```

字符 0 的 Unicode 值是 30，字符 9 的 Unicode 值是 39，0 ～ 9 这 10 个数字对应的 Unicode 值正好是 30 ～ 39。我们也可以用以下这种方法进行表示：

```css
.\000031-foo {
  border: 10px dashed;
  padding: 10px;
}
```

31 前面用 4 个 0 进行补全，这样`\31`后面就不用加空格。

### 对 CSS 后代选择器的误区

看下面一个例子：

```html
<div class="blue">
  <div class="red">
    <p>color1</p>
  </div>
</div>
<div class="red">
  <div class="blue">
    <p>color2</p>
  </div>
</div>
```

```css
.blue {
  color: blue;
}
.red {
  color: red;
}
```

很明显，由于`color`的继承性，color1 和 color2 分别是 red 和 blue，如果将 css 改为：

```css
.blue p {
  color: blue;
}
.red p {
  color: red;
}
```

这儿很容易错误回答为 red 和 blue，但是后代选择器的优先级与祖先元素的 DOM 层级并没有任何关系。这儿 `.blue p` 和 `.red p` 的优先级都是 10+1，所以遵循后来居上的原则，两段文字均为 red。

同理下面这段样式：

```css
:not(.red) p {
  color: blue;
}
.red p {
  color: red;
}
```

`:not`的权重为 0，两个选择器的权重均为 11，同上均为 red。

对于 Javascript 中的后代选择器，有下面一个例子：

```html
<div id="box">
  <div>
    <div></div>
  </div>
  <div></div>
</div>
```

`document.querySelectorAll('#box div div').length` 和 `document.querySelector('#box').querySelectorAll('div div').length` 分别输出什么呢？前者输出 1 不用过多解释，而后者却输出 3。仔细想一想，`querySelectorAll('div div')`是满足`div div`选择器的元素，与之前的`document.querySelector('#box')`是相互独立的，也就是查询`#box`元素的子元素中满足`div div`选择器条件的 DOM 元素。

## 其他

定义 `input placeholder` 样式

```css
::-webkit-input-placeholder,
:-moz-placeholder,
::-moz-placeholder,
::-ms-input-placeholder {
}
```

```css
.box {
  /* inset|offset-x|offset-y|blur-radius|spread-radius|color */
  box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
```

`blur-radius`阴影模糊程度

`spread-radius` 阴影扩大+缩小-

```css
img {
  /* 灰度，彩色变黑白 */
  filter: grayscale(100%);
  /* 边框样式： 无/点线/虚线/实线/双线/槽线/脊线/凹边/凸边 */
  border-style: none/dotted/dashed/solid/double/groove/ridge/inset/outset;
  /* 鼠标指针样式： 默认手加号移动等待帮助输入 */
  cursor: default/pointer/crosshair/move/wait/help/text/progress;
}
```
