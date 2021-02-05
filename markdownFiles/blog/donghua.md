---
title: "(11)SVG动画"
date: "2020-08-12 13:50"
tag: "svg,svg动画"
category: "SVG"
---

这一篇文章我们会分析两种让图像动起来的方法。
第一种是基于 SMIL 的动画，用于描述构成图形基本组成部分的动画。
第二种是 css 动画，用于一些简单的反馈效果，如鼠标悬停高亮。
另外 js 动画应用于更复杂的交互，将在下一篇文章介绍。

## 动画基础

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <rect x="10" y="10" width="200" height="40" style="stroke:black;fill:none;">
    <animate
      attributeName="width"
      attributeType="xml"
      from="200" to="20"
      begin="0s" dur="3s"
      fill="freeze"
    />
  </rect>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <rect x="10" y="10" width="200" height="40" style="stroke:black;fill:none;">
    <animate 
      attributeName="width" attributeType="xml" from="200" to="20" begin="0s" dur="3s" fill="freeze"
    />
  </rect>
</svg>

上面的例子，rect 元素里不再是空元素，而是包含了`<animate>`元素，用来定义 rect 的动画。下面看看 animate 元素的属性：

- **attributeName**：表示动画作用于哪个属性，这里是 width。
- **attributeType**：表示属性的类型，因为 width 是 XML 属性，所以这里值是 xml。另一个值是`CSS`，如果定义在`style`属性中，用此值。默认是`auto`，先搜索 css 属性，再搜索 xml 属性。
- **from,to**：定义属性的起始和结束值。另外还有一个`by`属性可以代替 to 属性，表示从 from 开始的一个偏移值。
- **begin,dur**：动画的开始实际和持续时间。
- **fill**：动画结束时应该做什么，默认是`remove`，结束后会返回它的原始值。这里是`freeze`表示冻结，会保持 to 属性的值。

同时`<animate>`可以添加多次，如下，宽度变化的同时描边颜色也改变：

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
<rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
<rect x="10" y="10" width="200" height="40" style="stroke:black;fill:none;">
    <animate
      attributeName="width" attributeType="xml" from="200" to="20" begin="0s" dur="3s" fill="freeze"
    />
    <animate
      attributeName="stroke" attributeType="css" from="black" to="red" begin="0s" dur="3s" fill="freeze"
    />
</rect>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
<rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
<rect x="10" y="10" width="200" height="40" style="stroke:black;fill:none;">
    <animate 
      attributeName="width" attributeType="xml" from="200" to="20" begin="0s" dur="3s" fill="freeze"
    />
    <animate 
      attributeName="stroke" attributeType="css" from="black" to="red" begin="0s" dur="3s" fill="freeze"
    />
</rect>
</svg>

## 动画的时间

svg 动画在 svg 加载完成时开始计时。动画时间单位可以指定为 h(时)、min(分)、s(秒)、ms(毫秒)。不带单位默认是秒。

如`begin="1min"`，`dur="5s"`

## 同步动画

我们可以绑定动画的**开始时间为另一个动画的开始或结束**。如下，第二个图形的动画会在第一个动画结束时开始：

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <rect x="10" y="10" width="200" height="40" style="stroke:black;fill:none;">
    <animate
      id="rectAnimate1" attributeName="width" attributeType="xml" from="200" to="20" begin="0s" dur="3s" fill="freeze"
    />
  </rect>
  <circle cx="250" cy="50" r="20" style="stroke:black;fill:none;">
    <animate
      attributeName="r" attributeType="xml" from="20" to="40" begin="rectAnimate1.end" dur="3s" fill="freeze"
    />
  </circle>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <rect x="10" y="10" width="200" height="40" style="stroke:black;fill:none;">
    <animate 
      id="rectAnimate1" attributeName="width" attributeType="xml" from="200" to="20" begin="0s" dur="3s" fill="freeze"
    />
  </rect>
  <circle cx="250" cy="50" r="20" style="stroke:black;fill:none;">
    <animate 
      attributeName="r" attributeType="xml" from="20" to="40" begin="rectAnimate1.end" dur="3s" fill="freeze"
    />
  </circle>
</svg>

如上面示例，圆环的动画开始属性`begin`值为`rectAnimate1.end`，表示以 rectAnimate1 动画的结束为开始。

同时也可以指定为`rectAnimate1.end + 2s`，表示结束后 2s 再开始动画。

如果要在一个动画开始后再开始，和结束是类似的，如：`rectAnimate1.begin + 2s`，表示动画开始 2s 后再开始本动画。

### end 属性

`<animate>`元素其实还有个 end 属性，用于指定动画的结束时间。

它的值可以为如下：

- **end="otherAnim.end"**：表示在 otherAnim 动画结束时结束，和`dur`属性并不冲突，谁先结束采用谁。
- **end="9s"**：表示开始计时 9s 后结束动画，如果在 `dur` 前，则相当于中途拦截动画。

## 重复动作

到目前为止，动画都只运行一次就结束了。有两个属性允许我们重复动画。分别是`repeatCount`和`repeatDur`属性。

`repeatCount`，一个整型值，告诉执行引擎动画应该执行多少次。

`repeatDur`，时间，告诉引擎重复应该持续多长时间。

通常我们只使用其中一个，如果同时指定两个，则哪个先达到就使用哪个。如果需要无限循环，指定它们的值为`indefinite`即可。

如下，红色圆从左到右，运行两次；蓝色圆从右到左，运行 4s，停在了中途:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <circle cx="50" cy="50" r="20" style="stroke:red;fill:none;">
    <animate
      attributeName="cx" attributeType="xml"
      from="50" to="50%" begin="0s" dur="3s" fill="freeze" repeatCount="2"
    />
  </circle>
  <circle cx="50%" cy="50" r="20" style="stroke:blue;fill:none;">
    <animate
      attributeName="cx" attributeType="xml"
      from="50%" to="50" begin="0s" dur="3s" fill="freeze" repeatDur="4s"
    />
  </circle>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <circle cx="50" cy="50" r="20" style="stroke:red;fill:none;">
    <animate 
      attributeName="cx" attributeType="xml" from="50" to="50%" begin="0s" dur="3s" fill="freeze" repeatCount="2"
    />
  </circle>
  <circle cx="50%" cy="50" r="20" style="stroke:blue;fill:none;">
    <animate 
      attributeName="cx" attributeType="xml" from="50%" to="50" begin="0s" dur="3s" fill="freeze" repeatDur="4s"
    />
  </circle>
</svg>

另外，我们可以将一个动画的开始时间绑定为另一个动画的第指定次数为开始时间，如下，蓝色圆在红色运行了一次后开始执行动画：

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <circle cx="50" cy="50" r="20" style="stroke:red;fill:none;">
    <animate
      id="redCircle1" attributeName="cx" attributeType="xml"
      from="50" to="50%" begin="0s" dur="3s" fill="freeze" repeatCount="2"
    />
  </circle>
  <circle cx="50%" cy="50" r="20" style="stroke:blue;fill:none;">
    <animate
      attributeName="cx" attributeType="xml" from="50%" to="50"
      begin="redCircle1.repeat(1)" dur="3s" fill="freeze" repeatDur="4s"
    />
  </circle>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <circle cx="50" cy="50" r="20" style="stroke:red;fill:none;">
    <animate 
      id="redCircle1" attributeName="cx" attributeType="xml" 
      from="50" to="50%" begin="0s" dur="3s" fill="freeze" repeatCount="2"
    />
  </circle>
  <circle cx="50%" cy="50" r="20" style="stroke:blue;fill:none;">
    <animate 
      attributeName="cx" attributeType="xml" from="50%" to="50" 
      begin="redCircle1.repeat(1)" dur="3s" fill="freeze" repeatDur="4s"
    />
  </circle>
</svg>

begin 的值为`redCircle1.repeat(1)`，当然也可以为`redCircle1.repeat(1)+2s`表示第一次动画运行后的 2s 作为开始时间。

## 对复杂的属性应用动画

动画不仅限于数值和长度。我们可以为**几乎任何属性和样式**应用动画。让某个属性在两个值之间平滑过渡。

如下颜色动画、路径动画、多边形动画示例。

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <circle cx="50" cy="50" r="20" style="stroke:red;fill:none;">
    <animate
       attributeName="stroke" attributeType="css"
      from="red" to="blue" begin="0s" dur="3s" fill="freeze" repeatCount="indefinite"
    />
  </circle>
  <g transform="translate(50)">
  <path d="M10,10 L20,20 L30,10 Q40,5 60,40" style="stroke:black;fill:none;">
    <animate
      attributeName="d" attributeType="xml"  to="M10,10 L20,20 L30,10 Q40,5 80,10"
      begin="0s" dur="3s" fill="freeze" repeatCount="indefinite"
    />
  </path>
   </g>
  <g transform="translate(150)">
  <polygon points="50,50 60,20 80,30 70,60 55,80" style="stroke:black;fill:none;">
    <animate
      attributeName="points" attributeType="xml"  to="50,50 60,20 80,30 70,60 30,70"
      begin="0s" dur="3s" fill="freeze" repeatCount="indefinite"
    />
  </polygon>
  </g>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <circle cx="50" cy="50" r="20" style="stroke:red;fill:none;">
    <animate 
       attributeName="stroke" attributeType="css" 
      from="red" to="blue" begin="0s" dur="3s" fill="freeze" repeatCount="indefinite"
    />
  </circle>
  <g transform="translate(50)">
  <path d="M10,10 L20,20 L30,10 Q40,5 60,40" style="stroke:black;fill:none;">
    <animate 
      attributeName="d" attributeType="xml"  to="M10,10 L20,20 L30,10 Q40,5 80,10" 
      begin="0s" dur="3s" fill="freeze" repeatCount="indefinite"
    />
  </path>
   </g>
  <g transform="translate(150)">
  <polygon points="50,50 60,20 80,30 70,60 55,80" style="stroke:black;fill:none;">
    <animate 
      attributeName="points" attributeType="xml"  to="50,50 60,20 80,30 70,60 30,70" 
      begin="0s" dur="3s" fill="freeze" repeatCount="indefinite"
    />
  </polygon>
  </g>
</svg>

路径和多边形动画，只要**路径的点的数量和路径片段类型没变化**就可以应用动画。如果点的数量或片段类型**有变化**，则**没有过渡效果**，达到结束点时直接渲染结束时的形状。

## 指定多个值

到目前所有的动画都指定了一个开始 from 和结束 to 值。除了这个，我们还可以给动画指定一系列值，让动画沿着我们指定的系列之过渡。使用`values`属性来指定它，用分号来分隔。

如下颜色的填充动画，从蓝->绿->黑->黄。

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <circle cx="50" cy="50" r="20" >
    <animate
       attributeName="fill" attributeType="css"
      values="blue;green;black;yellow;" begin="0s" dur="4s" fill="freeze" repeatCount="indefinite"
    />
  </circle>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <circle cx="50" cy="50" r="20" >
    <animate 
       attributeName="fill" attributeType="css" 
      values="blue;green;black;yellow;" begin="0s" dur="4s" fill="freeze" repeatCount="indefinite"
    />
  </circle>
</svg>

values 属性也可以用来指定来回交替的重复动画，即从开始值到结束值，再回到开始值，然后不断重复，使用如下形式即可：

`values="start;end;start"`

如下实例：

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <rect x="10" y="10" width="200" height="40" style="stroke:black;fill:none;">
    <animate
      attributeName="width" attributeType="xml"
      values="200;20;200" begin="0s" dur="3s" fill="freeze" repeatCount="indefinite"
    />
  </rect>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <rect x="10" y="10" width="200" height="40" style="stroke:black;fill:none;">
    <animate 
      attributeName="width" attributeType="xml" values="200;20;200" begin="0s" dur="3s" fill="freeze" repeatCount="indefinite"
    />
  </rect>
</svg>

## 多级动画时间

上面的动画使用`values`属性指定多个值时，动画的持续时间（dur 属性）被划分为过渡周期等长的片段。

`keyTimes`属性为我们自定义每一段的过渡时长提供了可能，它的值也是一个分号分隔的数字列表，第一个始终为 0，最后一个始终为，中间的为 0-1 来表示，它的数字数目必须和 values 的数字数目保持相等。

如下示例，200 到 20 的过渡时长只占 0.2，那么 20 到 200 就是 0.2-1 也就是 0.8 了，从效果可以看出 200->20 明显快多了：

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
<rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
<rect x="10" y="10" width="200" height="40" style="stroke:black;fill:none;">
  <animate
    attributeName="width" attributeType="xml"
    values="200;20;200" keyTimes="0;0.2;1" begin="0s" dur="3s"
    fill="freeze" repeatCount="indefinite"
  />
</rect>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
<rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
<rect x="10" y="10" width="200" height="40" style="stroke:black;fill:none;">
  <animate 
    attributeName="width" attributeType="xml" values="200;20;200" keyTimes="0;0.2;1" begin="0s" dur="3s" fill="freeze" repeatCount="indefinite"
  />
</rect>
</svg>

## \<set>元素

上面的所有动画都是修改值。对于非数字属性或不能过渡的属性，我们也可能想要在动画的某个节点时改变它的值。

此时可以使用`<set>`元素来控制。它除了指定`attributeName、attributeType、begin、dur、fill`属性外，只需指定一个`to`属性，表示最终改变后的值。

如，当矩形缩小为 20 宽度时，让本来隐藏的文字显示，用 set 元素改变了它的 visibility 属性。

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
<rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
<rect x="10" y="10" width="200" height="40" style="stroke:black;fill:none;">
  <animate
    id="rectWidthAnim" attributeName="width" attributeType="xml"
    values="200;20" keyTimes="0;1" begin="0s" dur="1s" fill="freeze" repeatCount="1"
  />
</rect>
<text style="fill:black;visibility:hidden;" x="40" y="50">
  <set attributeName="visibility" attributeType="css" to="visible"
  begin="rectWidthAnim.end" dur="1s" fill="freeze"/>
  缩小完毕！
</text>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
<rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
<rect x="10" y="10" width="200" height="40" style="stroke:black;fill:none;">
  <animate 
    id="rectWidthAnim" attributeName="width" attributeType="xml" 
    values="200;20" keyTimes="0;1" begin="0s" dur="1s" fill="freeze" repeatCount="1"
  />
</rect>
<text style="fill:black;visibility:hidden;" x="40" y="50">
  <set attributeName="visibility" attributeType="css" to="visible" 
  begin="rectWidthAnim.end" dur="1s" fill="freeze"/>
  缩小完毕！
</text>
</svg>

## \<animateTransform>元素

`<animate>`元素并不适用于旋转、平移、缩放或倾斜等变换。因为它们都在`transform`属性内。

`<animateTransform>`元素就是用来解决此问题的。

和 animate 元素类似，只是需要将`attributeName`属性指定为`transform`,然后使用`type`属性指定要执行动画的属性，如 translate、scale、rotate、skewX 或 skewY 其中之一。

如下缩放动画示例：

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
<rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
<rect x="100" y="10" width="50" height="40" style="stroke:black;fill:none;">
  <animateTransform
    attributeName="transform" attributeType="xml" type="scale"
    from="1" to="2"  begin="0s" dur="2s" fill="freeze" repeatCount="indefinite"
  />
</rect>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
<rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
<rect x="100" y="10" width="50" height="40" style="stroke:black;fill:none;">
  <animateTransform 
    attributeName="transform" attributeType="xml" type="scale"
    from="1" to="2"  begin="0s" dur="2s" fill="freeze" repeatCount="indefinite"
  />
</rect>
</svg>

如果有多个 animateTransform，需要使用`additive`属性，它的值默认是`replace`。此时后面的动画会覆盖前面的，如果想要叠加，设置值为`sum`即可。

如下先缩放再旋转：

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
<rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
<rect x="100" y="10" width="50" height="40" style="stroke:black;fill:none;">
  <animateTransform
    id="scale1"
    additive="sum"
    attributeName="transform" attributeType="xml" type="scale"
    from="1" to="1.5"  begin="0s" dur="2s" fill="freeze" repeatCount="1"
  />
  <animateTransform
    additive="sum"
    attributeName="transform" attributeType="xml" type="rotate"
    from="0,125,30" to="45,125,30"  begin="scale1.end" dur="2s" fill="freeze" repeatCount="1"
  />
</rect>
<circle cx="187.5" cy="45" r="2" style="fill:red;"/>
<circle cx="125" cy="30" r="2" style="fill:blue;"/>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
<rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
<rect x="100" y="10" width="50" height="40" style="stroke:black;fill:none;">
  <animateTransform 
    id="scale1"
    additive="sum"
    attributeName="transform" attributeType="xml" type="scale"
    from="1" to="1.5"  begin="0s" dur="2s" fill="freeze" repeatCount="1"
  />
  <animateTransform 
    additive="sum"
    attributeName="transform" attributeType="xml" type="rotate"
    from="0,125,30" to="45,125,30"  begin="scale1.end" dur="2s" fill="freeze" repeatCount="1"
  />
</rect>
<circle cx="187.5" cy="45" r="2" style="fill:red;"/>
<circle cx="125" cy="30" r="2" style="fill:blue;"/>
</svg>

上面的例子，from 和 to 属性中的原点还是 125,30，即缩放前的矩形原点。svg 会自动计算缩放后的原点，而不是你自己填写缩放后的原点 187.5,45。

下面是不加`additive="sum"`的效果，缩放未叠加，旋转会回到初始位置旋转：

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
<rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
<rect x="100" y="10" width="50" height="40" style="stroke:black;fill:none;">
  <animateTransform 
    id="scale1"
    attributeName="transform" attributeType="xml" type="scale"
    from="1" to="1.5"  begin="0s" dur="2s" fill="freeze" repeatCount="1"
  />
  <animateTransform 
    attributeName="transform" attributeType="xml" type="rotate"
    from="0,125,30" to="45,125,30"  begin="scale1.end" dur="2s" fill="freeze" repeatCount="1"
  />
</rect>
<circle cx="187.5" cy="45" r="2" style="fill:red;"/>
<circle cx="125" cy="30" r="2" style="fill:blue;"/>
</svg>

## \<animateMotion>元素

在之前，你可以使用`<animateTransform>`元素变换`translate`来沿着一条线运动。但是如果需要沿着一段复杂的路径运动，就很麻烦了。

`<animateMotion>`元素让它变得更容易。无论是直线还是一系列重复循环的路径。

### 线性路径运动

如下最简单的一种方式，通过`from和to`属性，指定起点坐标和终点坐标。

```svg{4}
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <rect x="0" y="0" width="50" height="40" style="stroke:black;fill:none;">
    <animateMotion from="0,50" to="200,50" begin="2s" dur="5s" fill="freeze" repeatCount="indefinite"/>
  </rect>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <rect x="0" y="0" width="50" height="40" style="stroke:black;fill:none;">
    <animateMotion from="0,50" to="200,50" begin="2s" dur="5s" fill="freeze" repeatCount="indefinite"/>
  </rect>
</svg>

### 复杂路径运动

可以使用`path`属性，规则类似于`<path>`元素的`d`属性。

如下按照直线和贝塞尔二次曲线运动的点。

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <path d="M10,50 L50,50 L100,50" style="stroke:black;fill:none;"/>
  <polygon points="0,-20 20,0 -20,0" style="stroke:black;fill:none;">
    <animateMotion path="M10,50 L50,50 L100,50" begin="0s" dur="5s" fill="freeze" repeatCount="indefinite"/>
  </polygon>
  <g transform="translate(120)">
    <path d="M10,50 Q50,5 100,60" style="stroke:black;fill:none;"/>
    <polygon points="0,-20 20,0 -20,0" style="stroke:black;fill:none;">
      <animateMotion path="M10,50 Q50,5 100,60" begin="0s" dur="5s" fill="freeze" repeatCount="indefinite"/>
    </polygon>
  </g>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <path d="M10,50 L50,50 L100,50" style="stroke:black;fill:none;"/>
  <polygon points="0,-20 20,0 -20,0" style="stroke:black;fill:none;">
    <animateMotion path="M10,50 L50,50 L100,50" begin="0s" dur="5s" fill="freeze" repeatCount="indefinite"/>
  </polygon>
  <g transform="translate(120)">
    <path d="M10,50 Q50,5 100,60" style="stroke:black;fill:none;"/>
    <polygon points="0,-20 20,0 -20,0" style="stroke:black;fill:none;">
      <animateMotion path="M10,50 Q50,5 100,60" begin="0s" dur="5s" fill="freeze" repeatCount="indefinite"/>
    </polygon>
  </g>
</svg>

以上示例，执行动画时，图形的原点会沿着路径开始运动。所以上面我们把三角形的底边中点，画到坐标系统左上角(0,0)上。这样三角形移动时，三角形**底边中点就沿着路径运动**。

另外可以看出，三角形运动时，始终朝一个方向，我们希望的是三角形能跟着路径方向自动旋转，此时可以使用`rotate="auto"`来设置。

变化的代码如下：

```svg{6}
<animateMotion
path="M10,50 Q50,5 100,60"
begin="0s"
dur="5s"
fill="freeze"
rotate="auto"
repeatCount="indefinite"
/>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <path d="M10,50 L50,50 L100,50" style="stroke:black;fill:none;"/>
  <polygon points="0,-20 20,0 -20,0" style="stroke:black;fill:none;">
    <animateMotion path="M10,50 L50,50 L100,50" begin="0s" dur="5s" fill="freeze"  rotate="auto" repeatCount="indefinite"/>
  </polygon>
  <g transform="translate(120)">
    <path d="M10,50 Q50,5 100,60" style="stroke:black;fill:none;"/>
    <polygon points="0,-20 20,0 -20,0" style="stroke:black;fill:none;">
      <animateMotion path="M10,50 Q50,5 100,60" begin="0s" dur="5s" fill="freeze" rotate="auto" repeatCount="indefinite"/>
    </polygon>
  </g>
</svg>

另外，因为我们用`<path>`元素已经定义了一条线来作为对比，然后在动画里重复使用 path 属性复制了`<path>`元素的`d`属性的代码，这没有必要，可以在`<animateMotion>`元素中加入`<mpath xlink:href="#xxx"/>`来直接引用该路径，而不用再写 path。

如下引用 id 为`pathbase`的路径的示例：

```svg{4,7}
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <g transform="translate(0)">
    <path id="pathbase" d="M10,50 Q50,5 100,60" style="stroke:black;fill:none;"/>
    <polygon points="0,-20 20,0 -20,0" style="stroke:black;fill:none;">
      <animateMotion begin="0s" dur="5s" fill="freeze" rotate="auto" repeatCount="indefinite">
        <mpath xlink:href="#pathbase"/>
      </animateMotion>
    </polygon>
  </g>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <g transform="translate(0)">
    <path id="pathbase" d="M10,50 Q50,5 100,60" style="stroke:black;fill:none;"/>
    <polygon points="0,-20 20,0 -20,0" style="stroke:black;fill:none;">
      <animateMotion begin="0s" dur="5s" fill="freeze" rotate="auto" repeatCount="indefinite">
        <mpath xlink:href="#pathbase"/>
      </animateMotion>
    </polygon>
  </g>
</svg>

## 为运动指定关键点和时间

通过`keyPoints`和`keyTimes`属性，可以指定关键点在关键时间的运动特性。

`keyPoints`和`keyTimes`都是从 0 开始，以 1 结束。

keyPoints 每个点表示对象应该按照 keyTimes 列表中**相应的时间点沿着路径移动多远**。

keyPoints 和 keyTimes 必须拥有相同数量的条目。并且必须设置`calcMode="linear"`属性和值。

如下，使用 keyPoints 和 keyTimes 让图形沿着路径做变速运动：

```svg{8-10}
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <g transform="translate(0)">
    <path id="pathbase" d="M10,50 Q50,5 100,60" style="stroke:black;fill:none;"/>
    <polygon points="0,-20 20,0 -20,0" style="stroke:black;fill:none;">
      <animateMotion
      begin="0s" dur="5s" fill="freeze" rotate="auto" repeatCount="indefinite"
      keyPoints="0;0.5;0.8;1"
      keyTimes="0;0.2;0.8;1"
      calcMode="linear"
      >
        <mpath xlink:href="#pathbase"/>
      </animateMotion>
    </polygon>
  </g>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <g transform="translate(0)">
    <path id="pathbase" d="M10,50 Q50,5 100,60" style="stroke:black;fill:none;"/>
    <polygon points="0,-20 20,0 -20,0" style="stroke:black;fill:none;">
      <animateMotion 
      begin="0s" dur="5s" fill="freeze" rotate="auto" repeatCount="indefinite"
      keyPoints="0;0.5;0.8;1"
      keyTimes="0;0.2;0.8;1"
      calcMode="linear"
      >
        <mpath xlink:href="#pathbase"/>
      </animateMotion>
    </polygon>
  </g>
</svg>

上面的例子，开始用 20%的总时间跑完了全程一半的路程，看起来明显比其它路程快多了。

## 使用 css 处理动画

使用 css3 可以方便的处理 HTML 和 SVG 的动画，使用`animation-xxx`属性和`@keyframes`关键帧，可以使用 svg 属性建立动画。

如下示例，css 动画处理 fill-opacity 和 stroke-width 属性：

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <g transform="translate(0)">
    <polygon id="polygonAnimation" points="50,20 70,40 30,40" style="stroke:red;fill:black;"/>
  </g>
  <style>
    #polygonAnimation{
      animation-name:polygonAnimationrun;
      animation-duration:3s;
      animation-fill-mode:forwards;
      animation-iteration-count:infinite;
    }
    @keyframes polygonAnimationrun{
      0%{
        fill-opacity:1;
        stroke-width:0;
      }
      100%{
        fill-opacity:0;
        stroke-width:6;
      }
    }
  </style>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100">
  <rect x="0" y="0" width="100%" height="100%" style="stroke:black;stroke-dasharray:5,5;fill:none;"/>
  <g transform="translate(0)">
    <polygon id="polygonAnimation" points="50,20 70,40 30,40" style="stroke:red;fill:black;"/>
  </g>
  <style>
    #polygonAnimation{
      animation-name:polygonAnimationrun;
      animation-duration:3s;
      animation-fill-mode:forwards;
      animation-iteration-count:infinite;
    }
    @keyframes polygonAnimationrun{
      0%{
        fill-opacity:1;
        stroke-width:0;
      }
      100%{
        fill-opacity:0;
        stroke-width:6;
      }
    }
  </style>
</svg>
