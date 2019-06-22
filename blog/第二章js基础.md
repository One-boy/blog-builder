# 第二章 在html中使用javascript

## 在html中使用javascript的方法：

![aaa](https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_redBlue_32fe2c69.png)

- 有两种方法，都使用的是<script></script>标签：
- 1.第一种是嵌入式，如下：

```javascript
<script>
    alert("hello");
</script>
```

- 2.第二种是使用src属性：
```html
<script src="example.js"></script>
//src属性可以引用外部域文件。不一定以.js后缀结尾。
```
## <script>标签有多种属性：
- 1.async：

可选，表示应该立即下载脚本，但不应该妨碍页面中的其它操作，比如下载其他资源或加载其他资源脚本。只对外部脚本文件有效
- 2.charset：

可选，表示通过src属性指定的代码的字符集。由于多数浏览器会忽略这个值，所以很少人使用

- 3.defer：

可选，表示脚本可以延迟到文档完全被解析和显示后再执行。只对外部脚本有效。

- 4.type:

可选，默认是text/javascript,用来说明编写代码使用的脚本语言的内容类型（也叫MIME类型）

## 解析顺序
- 解析嵌入式javascript时，从上至下一次解释，在元素内部的所有代码求值完毕之前，页面的其余内容都不会被浏览器加载或显示
- 解析外部javascript文件时，与嵌入式解析规则一样，下载以及解析javascript时，页面的处理会暂停；只要不存在defer和async属性，浏览器会按照<script>元素在页面中的先后顺序对它们进行依次解析。

## <script>放置位置
- 一般放在文档内容后，即body后，这样避免js文件太多加载时间长，页面空白体验差。

## <noscript>标签
- 该标签中的内容只有在下列情况下才会显示出来
    - 浏览器不支持脚本
    - 支持脚本，但被禁用了
```js
<noscript>
您的浏览器不支持JavaScript，或您已禁用JavaScript功能。
</noscript>
```












