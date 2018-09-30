# SVG

## 矩形 `<rect>`

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="border: 1px solid #000">
  <rect x="10" y="10" rx="5" ry="20" width="100" height="100" fill="#f00" stroke-width="1px" stroke="#000" fill-opacity="0.5" stroke-opacity="0.9"></rect>
</svg>

- fill 填充颜色
- stroke-width 矩形边框的宽度
- stroke 边框的颜色
- fill-opacity 填充颜色透明度
- stroke-opacity 轮廓颜色的透明度
- opacity 元素的透明值
- rx/ry 圆角

## 圆形 `<circle>`

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="border: 1px solid #000">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="red"/>
</svg>

- cx/cy 圆点, 默认(0, 0)
- r 圆的半径

## 椭圆 `<ellipse>`

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="border: 1px solid #000">
  <ellipse cx="150" cy="70" rx="100" ry="50" fill="yellow" stroke="purple" stroke-width="2px"/>
</svg>

- cx/cy 椭圆中心
- rx/ry 水平半径/垂直半径

## 线 `<line>`

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="border: 1px solid #000">
  <line x1="0" y1="0" x2="200" y2="200" stroke="#f00" stroke-width="2px"/>
</svg>

- x1/y1 线条起始坐标
- x2/y2 线条结束坐标


## 折线 <`polyline>`
> `<polygon>`标签用来创建含有不少于三个边的图形。
> `Remarkpolygon`来自希腊。 "Poly"意味"many" ，"gon"意味"angle".

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="border: 1px solid #000">
  <polygon points="200,10 250,140 160,110" fill="lime" stroke="purple" stroke-width="1px"/>
</svg>

- points 多边形每个角的x/y坐标

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="border: 1px solid #000" height="200px">
  <polygon points="100,10 40,180 190,60 10,60 160,180" fill="lime" stroke="purple" stroke-width="5" fill-rule="nonzero"/>
</svg>

- fill-rule 判断某一点是否在图形内部的方法
    + nonzero 非零 要判断一个点是否在图形内，从该点作任意方向的一条射线，然后检测射线与图形路径的交点情况。从0开始计数，路径从左向右穿过射线则计数加1，从右向左穿过射线则计数减1。得出计数结果后，如果结果是0，则认为点在图形外部，否则认为在内部
    + evenodd 奇偶 要判断一个点是否在图形内，从该点作任意方向的一条射线，然后检测射线与图形路径的交点的数量。如果结果是奇数则认为点在内部，是偶数则认为点在外部

## 曲线 `<polyline>`

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="border: 1px solid #000">
  <polyline points="20,20 40,25 60,40 80,120 120,140 200,180" fill="none" stroke="#f00" stroke-width="1px" />
</svg>

## 路径 `<path>`

`<path>` 元素用于定义一个路径。

下面的命令可用于路径数据：

- M = moveto
- L = lineto
- H = horizontal lineto 水平线
- V = vertical lineto 垂线
- C = curveto 曲线
- S = smooth curveto 平滑曲线
- Q = quadratic Bézier curve 二次贝塞尔曲线
- T = smooth quadratic Bézier curveto 平滑二次贝塞尔曲线
- A = elliptical Arc 椭圆弧线
- Z = closepath 闭合路径

> 注意：以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height=400 width=500 style="border: 1px solid #000">
  <path id="lineAB" d="M 100 350 l 150 -300" stroke="red"
  stroke-width="3" fill="none" />
  <path id="lineBC" d="M 250 50 l 150 300" stroke="red"
  stroke-width="3" fill="none" />
  <path d="M 175 200 l 150 0" stroke="green" stroke-width="3"
  fill="none" />
  <path d="M 100 350 q 150 -300 300 0" stroke="blue"
  stroke-width="5" fill="none" />
  <!-- Mark relevant points -->
  <g stroke="black" stroke-width="3" fill="black">
    <circle id="pointA" cx="100" cy="350" r="3" />
    <circle id="pointB" cx="250" cy="50" r="3" />
    <circle id="pointC" cx="400" cy="350" r="3" />
  </g>
  <!-- Label the points -->
  <g font-size="30" font="sans-serif" fill="black" stroke="none"
  text-anchor="middle">
    <text x="100" y="350" dx="-30">A</text>
    <text x="250" y="50" dy="-10">B</text>
    <text x="400" y="350" dx="30">C</text>
  </g>
</svg>

## 文字 `<text>`

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <text x="0" y="15" fill="red" transform="rotate(30 20,40)">
    I love SVG
  </text>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <defs>
    <path id="path1" d="M75,20 a1,1 0 0,0 100,0" />
  </defs>
  <text x="10" y="100" style="fill:red;">
    <textPath xlink:href="#path1">
      I love SVG I love SVG
    </textPath>
  </text>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <text x="10" y="20" style="fill:red;">Several lines:
    <tspan x="10" y="45">First line</tspan>
    <tspan x="10" y="70">Second line</tspan>
  </text>
</svg>

## stroke 属性
- stroke 定义一条线，文本或元素轮廓颜色
- stroke-width 定义了一条线，文本或元素轮廓厚度
- stroke-linecap 定义不同类型的开放路径的终结

  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height=80>
    <g fill="none" stroke="black" stroke-width="6">
      <path stroke-linecap="butt" d="M5 20 l215 0" />
      <path stroke-linecap="round" d="M5 40 l215 0" />
      <path stroke-linecap="square" d="M5 60 l215 0" />
    </g>
  </svg>
- stroke-dasharray 用于创建虚线

  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height=80>
    <g fill="none" stroke="black" stroke-width="4">
      <path stroke-dasharray="5,5" d="M5 20 l215 0" />
      <path stroke-dasharray="10,10" d="M5 40 l215 0" />
      <path stroke-dasharray="20,10,5,5,5,10" d="M5 60 l215 0" />
    </g>
  </svg>