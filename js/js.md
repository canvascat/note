1. 同步和异步之间的区别。
   同步：后一个任务需要等待前一个任务结束后才执行。
   异步：任务结束后执行一个回调，且后一个任务毋需等前一个任务结束就可执行。
2. 闭包，闭包的特征。
   能够读取其他函数内部变量的函数。
   存在内外两层函数且内层函数对外层函数的局部变量进行了调用。
   使得函数内部的变量在函数调用完毕后不被销毁，存在内存泄漏的风险。
3. js 原型、原型链，它们的特点。
   函数的`prototype`属性指向的对象正是调用该构造函数而创建的实例的原型
   每一个 JavaScript 对象(null 除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。
   相互关联的原型组成的链状结构为原型链
4. 函数节流和函数防抖之间的区别。
   函数防抖会在函再次数触发时重置计时器，事件依然会触发。
   函数节流则在函数响应的时间内不会再次触发。
5. 函数式编程的好处。
   - 语义清晰
   - 复用性高
   - 可维护性好
   - 作用域局限减少副作用

异步编程方法：

- 回调函数(callback)，高度耦合，建议最多使用两个。
- 事件监听，事件驱动型
  `on`、`build`、`listen`、`addEventListener`、`observe`
  ```js
  f1.on('done', f2);
  function f1() {
    /* do something... */
    /* 表示执行完毕后触发done事件 */
    f1.trigger('done');
  }
  ```
- 发布/订阅
- Promise

js 事件机制
DOM 事件流有三个阶段：事件捕获 → 处于目标 → 事件冒泡
事件捕获(event capturing)：触发 DOM 事件时浏览器会从根节点开始由外到内进行事件传播。
事件冒泡(dubbed bubbling)：和事件捕获相反，由内到外传播直到根节点。

`target.addEventListener(type, listener, options)`
options false 表示事件冒泡，true 事件捕获

发布&订阅

```js
// 订阅事件
people.subscribe('publisher1').subscribe('publisher2');
// 事件派发data，所有订阅者都会收到
publisher1.deliver(data);
```

Promise
每个异步任务都返回一个 Promise 对象，该对象拥有一个`then`方法，允许指定回调函数调用
async 异步函数关键字，返回一个 Promise。
如果返回一个 value，则会等同于`return Promise.resovle(value)`；
`await`用于一个异步操作前，表示要等待这个异步操作的返回值。
`catch`用于捕获异常。

## 函数式编程

优点

- 语义清晰
- 复用性高
- 可维护性好
- 作用域限制，副作用少

## 正则表达式

- tool：[正则可视化](http://wangweilin.net/static/projects/visualRegex/)

### URL 匹配

- `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]`
- `(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?`
- `^((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$`

```js
'^((https|http|ftp|rtsp|mms)?://)' +
  "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
  '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
  '|' + // 允许IP和DOMAIN（域名）
  "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
  '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
  '[a-z]{2,6})' + // first level domain- .com or .museum
  '(:[0-9]{1,4})?' + // 端口- :80
  '((/?)|' + // a slash isn't required if there is no file name
  "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
```

```js
// 文本url转a标签url
function linkfilter(msg) {
  var oldMsg = msg;
  var urlRegExp = new RegExp(
    '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'
  );
  var newMsg = '';
  while (urlRegExp.exec(oldMsg) != null) {
    var strUrl = urlRegExp.exec(oldMsg)[0];
    var tagUrl = '<a href="' + strUrl + '" target="_blank">' + strUrl + '</a>';
    var urlLength = strUrl.length;
    var urlStartIndex = oldMsg.indexOf(strUrl);
    newMsg += oldMsg.substring(0, urlStartIndex) + tagUrl;
    oldMsg = oldMsg.substring(urlStartIndex + urlLength);
  }
  return (msg = newMsg + oldMsg);
}
```
