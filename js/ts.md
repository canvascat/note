> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.

TypeScript 是 JavaScript 的类型的**超集**，本质上是在 `JavaScript` 上增加一套**静态类型系统**（编译时进行类型分析）。

- 更强的代码提示
- 更好的可读性
- 编译时类型检查

## 使用总结

### 变量申明

#### 基本类型

```js
const is: boolean = false;
const num: number = 1;
const str: string = 'How are you.';
const arr: number[] = [1, 2, 3];
const arr2: Array<number> = [1, 2, 3];
const obj: Object = {};
const u: undefined = undefined;
const n: null = null;
```

#### 类型补充

- 枚举 `Enum`

使用枚举类型可以为一组数值赋予友好的名字

```ts
export enum Sources {
  API = 'api',
  SILENT = 'silent',
  USER = 'user',
}
```

- 元组 `Tuple`

允许数组各元素的类型不必相同。 比如，你可以定义一对值分别为 string 和 number 类型的元组

```js
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```

- 任意值 `Any`

表示任意类型，通常用于**不确定内容**的类型，比如来自用户输入或第三方代码库

```ts
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false; // okay, definitely a boolean
```

- 空值 `Void`

与 `any` 相反，通常用于函数，表示没有返回值

- 接口 `interface`

类型契约，跟我们平常调服务端接口要先定义字段一个理

如下例子 point 跟 Point 类型必须一致，多一个少一个也是不被允许的
下面两个是等效的声明, 示例 A 使用内联注解，示例 B 使用接口形式：

```ts
// 示例 A
declare const myPoint: { x: number; y: number };

// 示例 B 如果有人创建了一个基于 myPoint 的库来添加新成员, 那么他可以轻松将此成员添加到 myPoint 的现有声明中
interface Point {
  x: number;
  y: number;
}
declare const myPoint: Point;
```

```ts
interface Point {
  x: number;
  y: number;
}
declare const myPoint: Point;

interface Point {
  z?: number;
  readonly l: number;
}

myPoint.z; // Allowed!

// 可选与只读 ? 表示可选参， readonly 表示只读
const point: Point = { x: 10, y: 20, z: 30, l: 40 };
const point2: Point = { x: '10', y: 20, z: 30, l: 40 }; // Error
const point3: Point = { x: 10, y: 20, z: 30 }; // Error
const point4: Point = { x: 10, y: 20, z: 30, l: 40, m: 50 }; // Error
point.l = 50; // error

// 类可以实现接口, 确保结构一致
class MyPoint implements Point {
  x: number;
  y: number;
  z?: number;
  readonly l: number;
}
```

### 函数

```ts
// 参数类型与返回值类型
function sum(a: number, b: number): number {
  return a + b;
}

// 配合 `interface` 使用
interface Point {
  x: number;
  y: number;
}

function distance({ x, y }: Point): number {
  return (x ** 2 + y ** 2) ** 0.5;
}

distance({ x: 3, y: 4 }); // 5
```

### 函数重载

函数重载（Function Overloading）, 允许创建数项名称相同但输入输出类型或个数不同的子程序。

```ts
enum Sources {
  API = 'api',
  SILENT = 'silent',
  USER = 'user',
}

interface StringMap {
  [key: string]: any;
}
interface RangeStatic {
  index: number;
  length: number;
}

type Overload = [number, number, StringMap, Sources];

function overload(index: number, length: number, source?: Sources): Overload;
function overload(
  index: number,
  length: number,
  format: string,
  value: any,
  source?: Sources
): Overload;
function overload(
  index: number,
  length: number,
  formats: StringMap,
  source?: Sources
): Overload;
function overload(
  range: RangeStatic,
  format: string,
  value: any,
  source?: Sources
): Overload;
function overload(
  range: RangeStatic,
  formats: StringMap,
  source?: Sources
): Overload;
function overload(
  index: number | RangeStatic,
  length: number | string | StringMap,
  name?: any,
  value?: any,
  source?: Sources
): Overload {
  let formats: StringMap = {};
  if (typeof index !== 'number') {
    if (typeof length !== 'number') {
      source = value;
      value = name;
      name = length;
    }
    length = index.length;
    index = index.index;
  } else if (typeof length !== 'number') {
    source = value;
    value = name;
    name = length;
    length = 0;
  }

  if (typeof name === 'object') {
    formats = name;
    source = value;
  } else if (typeof name === 'string') {
    if (value != null) {
      formats[name] = value;
    } else {
      source = name as Sources;
    }
  }

  source = source || Sources.API;
  return [index, length, formats, source];
}
```

> TypeScript 中的函数重载没有任何运行时开销。它只允许你记录希望调用函数的方式，并且编译器会检查其余代码。

### 泛型

泛型的意义在于函数的重用性，设计原则希望组件不仅能够支持当前的数据类型，同时也**能支持未来的数据类型**。
设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：

- 类的实例成员
- 类的方法
- 函数参数
- 函数返回值

- 比如

根据业务最初的设计函数 `identity` 入参为`String`

```ts
function identity(arg: String) {
  return arg;
}
console.log(identity('100'));
```

业务迭代过程参数需要支持 `Number`

```js
function identity(arg: String) {
  return arg;
}
console.log(identity(100)); // Argument of type '100' is not assignable to parameter of type 'String'.
```

泛型可以保证入参跟返回值是相同类型的，它是一种特殊的变量，只用于表示类型而不是值

语法 `<T>(arg:T):T` 其中`T`为自定义变量

```js
const hello: string = 'Hello vue!';
function say<T>(arg: T): T {
  return arg;
}
console.log(say(hello)); // Hello vue!
```

```ts
import Axios from 'axios';

// 请求接口数据
// 通常情况下，我们会把后端返回数据格式单独放入一个 interface 里：
interface ResponseData<T = any> {
  /** 状态码 */
  code: number;
  /** 数据 */
  result: T;
  /** 消息 */
  message: string;
}

const getUser = <T>() =>
  Axios.get<ResponseData<T>>('/somepath')
    .then((res) => res.data)
    .catch((err) => console.error(err));

// 接着我们写入返回的数据类型 User
// 这可以让 TypeScript 顺利推断出我们想要的类型：
interface User {
  name: string;
  age: number;
}

(async () => {
  // user 被推断出为
  // {
  //  code: number,
  //  result: { name: string, age: number },
  //  message: string
  // }
  const user = await getUser<User>();
})();
```

### 交叉类型

交叉类型(Intersection Types)，将多个类型合并为一个类型

```ts
interface foo {
  x: number;
}
interface bar {
  b: number;
}
type intersection = foo & bar;
const result: intersection = {
  x: 10,
  b: 20,
};
const result1: intersection = {
  x: 10,
}; // error
```

### 联合类型

联合类型(Union Types)，表示一个值可以是几种类型之一。

### @types

DefinitelyTyped https://github.com/borisyankov/DefinitelyTyped

```bash
npm i -D @types/quill
yarn add -D @types/lodash
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["quill", "lodash"]
  }
}
```

---

vue-next 就使用了 Typescript，后续会继续学习它以加深对 Typescript 的了解。
