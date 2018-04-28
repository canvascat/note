# vue

## 练习

1. 定义一个指令只需要在绑定和更新的时候调用
    ```js
    Vue.directive('dome', function (el, binding) {
        /* ... */
    })
    ```
2. 实现图片点击预览指令`v-img`
3. 自定义插件函数 Vue实例增加一个bar方法, 是否可以不通过自定义插件完成
4. Render函数和Jsx解决了那些问题
    动态生成DOM, 通过Render函数穿件虚拟DOM可以很灵活
5. 参照elementui的计数器组件使用JSX完成同样功能

## ES6

### Math对象扩展

```js
Math.trunc() // 返回一个数的整数部分
Math.sign() // 判断一个数是整数还是负数还是0
Math.cbrt() // 立方根
Math.hypot() //计算勾股数
```

### Array对象

数组转换
`Array.from()` 类数组/可遍历对象转化为数组
`Array.of()` 将一组数转化为数组
元素复制
`Array.copyWith()` 复制数组元素
元素查找
`Array.find()` 找出第一个符合条件的元素
`Array.findIndex()` 找出第一个符合条件的元素的序列
元素遍历
`Array.entries()` 返回键值对
`Array.keys()` 返回键名
`Array.values()` 返回值

### 函数扩展

rest参数

```js
function f(a, ...rest) {
    console.log(a);
    console.log(rest);
}
f(1, 2, 3, 4); // 1 [1, 2, 3]
```

扩展运算符spread
将一个数据转化为用逗号分隔的参数列表, 用于数组合并, apply方法, 类数组/字符串转化为数组

```js
var arr1 = [1, 2, 3];
var arr2 = [1, 2, 3];
const result = [...arr1, ...arr2, 5];
// [1, 2, 3, 1, 2, 3, 5]
```

this指向直接调用者, 没有则指向Window, 严格模式下指向undefined, 使用call/apply/bind绑定的this指向绑定的对象
箭头函数中的this是继承而来默认指向定义它时所处的宿主对象, 而不是执行时的对象
箭头函数中不可以使用arguments参数, 不能作为构造函数

### 对象的扩展

属性名支持表达式

```js
const name = 'duoyi';
const company = {
    [name]: 'ojbk'
}
company.duoyi // ojbk
```

对象的合并 `Object.assign(target, source)`

```js
Object keys(obj).foreach(function(key) {
    key, obj[key]
})
delete obj.property
delete obj['property']
```

```js
// localStorage方法
getItem(key) // 获取key对应的value
key(index) // 获取对应索引的key
length() // 长度
removeItem(key)
setItem(key, value)
claer() //清除所有key-value

```

浅拷贝: 双向改变, 指向同一片内存空间

深拷贝: 开辟一块新的内存地址, 将原对象的各个属相逐个复制进去, 对拷贝对象和源对象各自操作互不影响.

```js
// 浅拷贝
// 引用复制
Object.assign({}, obj) // 将obj的属性拷贝给{},并返回{}
// 深拷贝
JSON.parse(JSON.stringify(obj)) //obj->json->obj
arr.slice(0)
arr.concat()
```



### 类

class只是原型链的语法糖表现形式
函数中使用`static`关键词定义构造函数的方法和属性
使用`extends`继承父类
子类的`constructor`函数中需要执行`super()`函数
子类中通过`super.parentMethod()`调用父类方法

```js
class Parent {
    constructor () {
        console.log('parent init');
    }
    say () {
        console.log('saying...');
    }
}
class Child extends Parent {
    constructor () {
        super();
        console.log('child init');
    }
    run () {
        super.say();
        console.log('running...');
    }
}
```

### 模块

#### 导出

```js
export var name = 'duoyi';
export function f () {}
export class Car {}
// 也可以先定义后再导出

// 从其他模块引入并再次导出
export {sub} from './otherModule.js';
// 导出默认值,只能存在一个
export default function defaultFn () {}
```

#### 导入

```js
// 从模块中导入单个引用
import {outter} from './example.js';
// 从模块中导入所有引用
import * as example from './example.js';
// 重命名
import {outter as otherName} from './example.js';
import defaultFn from './example.js';
```

### Promise

一种异步编程解决方案
对象的状态不受外界影响
状态一旦改变就不会在改变(resolved)
pending(进行中), 创立Promise实例后默认状态为pending
fulfilled(已成功), 实例调用resolve方法后状态就变为fulfilled
rejected(已失败), 实例调用reject方法后状态就变为rejected

`then`方法返回一个Promise对象
`catch`方法用于指定Promise中发生的错误的回调函数

当一个任务依赖于多个异步任务时, 使用`Promise.all()' 并行

```js
const p = Promise.all([p1, p2, p3]);
```

当数组内的所有Promise状态均变为fulfilled时, 才会将p1,p2,p3的返回值传递给p的回调函数

当一个任务依赖多个异步任务中的任意一个时使用`Promise.race()`
数组中谁的状态先改变就将其返回值传递给p

## Vuejs

MVVM(Model-View-ViewModel), 核心是数据的双向绑定

ui组件 element-ui
http库 axios

### 自定义指令

```js
// 注册一个全局自定义指令'v-focus'
Vue.directive('focus', {
    // 当被绑定元素插入到DOM中时
    inserted (el) {
        // 聚焦元素
        el.focus()
    }
})

```

`bind` 绑定到元素时调用, 用于初始化
`inserted` 被绑定元素插入父节点时调用
`update` 所在组件的VNode更新时调用
`componentUpdate` 所在组件的VNode及其子VNode全部更新后调用
`unbind` 指令与元素解绑时调用

```js
Vue.directive('focus', function(el, binding) {})
```

`el` 指令绑定的元素
`binding` 一个对象
VNode vue编译生成的虚拟节点
oldVNode 上一个虚拟节点, 仅在`update`和`componentUpdate`钩子中可用

### 响应式

通过`Object.defineProperty`来实现数据响应式

> 每个组件

### vue安装

```bash
npm install --global vue-cli
vue init webpack <projectName>
cd <projectName>
npm run dev
npm install node-sass --save-dev
npm install sass-loader --save-dev
npm i element-ui -S
npm install axios
```

### git

```bash
# 创建本地ssh key
ssh-keygen -t rsa -C "youremail@xx.com"
# 之后会生成.ssh文件夹, 复制id_rsa.pub文件中的key粘贴到gitHub/Account Setting/SSH Keys中
# 连接github
ssh -T git@github.com
git config --global user.name "you name"
git config --global user.email "you email"
git remote add origin git@github.com:yourName/yourRepo.git
git clone userName@host:/path/to/repository
# 提出更改添加到暂存处
git add <fileName>
git add *
# 以实际提交更改到本地仓库
git commit -m "code submission information"
# 推送到远程仓库
git push origin master # master可以更改为其他分支
# 创建feature_xfenz
git checkout -b feature_x
# 切回主分支
git checkout master
# 删除分支
git branch -d feature_x
# 更新本地仓库到最新
git pull
# 合并其他分支到当前分支
git merge <branch>
# 比较差异
git diff <source_branch> <target_btanch>
```

### jekyll

```bash
sudo apt-get install ruby-full
sudo apt-get install rubygems
sudo gem install jekyll bundle
jekyll new <programName>
cd <programName>
jekyll serve
```

### jsx in Vue

```bash
npm install\
  babel-plugin-syntax-jsx\
  babel-plugin-transform-vue-jsx\
  babel-helper-vue-jsx-merge-props\
  babel-preset-env\
  --save-dev
```

在vue项目中使用jsx文件要在在`webpack.base.config.js`文件中添加jsx的babel

### Sass

使用node-sass监听

```bash
node-sass -w common.scss common.css --output-style expanded
```

- nested：嵌套缩进的css代码，它是默认值。
- expanded：没有缩进的、扩展的css代码。
- compact：简洁格式的css代码。
- compressed：压缩后的css代码。

```css
<!-- 文本溢出省略号代替 -->
.cut {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```



## 生命周期钩子

```js
export default {
    data() {
        return {
            a: 1
        }
    },
    computed: {
        b() {
            return a * 2
        }
    },
    beforeCreate() {
        this.a // undefined
       	this.b // undefined
    },
    created() {
        this.a // 1
        this.b // 2
    },
    beforeMount() {
        this.a // 1
        this.b // 2
    },
    mounted() {
        this.a // 1
        this.b // 2
    }
}
```



对于`Internet Explorer`、`Chrome`、`Firefox`、`Opera`、`Safari`：

- `window.innerHeight` ：浏览器窗口的内部高度
- `window.innerWidth`：浏览器窗口的内部宽度



* [Marked简明手册](http://www.cnblogs.com/djtao/p/6224399.html) *
* [chrome插件下载](http://alyzq.com/?p=627)


