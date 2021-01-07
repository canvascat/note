function foo(s) {
  console.log(this.a, s)
  return this.a + s
}
var obj = {
  a: 2
}
var bar = foo.bind(obj)
var b = bar(3)
console.log(b)

// var myObj = {
//   key: value
// }
var myObj = new Object()
myObj.a = 1
console.log(myObj)
var b = 'dsa'
console.log(Object.prototype.toString.call(b))
var newObj = JSON.parse(JSON.stringify(myObj))
var aObj = Object.assign(myObj, {})
console.log(newObj, myObj, aObj)
myObj.a = 5
console.log(newObj, myObj, aObj)
console.log(Object.getOwnPropertyDescriptor(myObj, 'a'))
/* Object {value: 5, writable: true, enumerable: true, configurable: true}
 * writable 是否可以修改属性的值
 * enumerable 是否可以枚举for...in obj.propertyIsEnumerable(p)判断对象obj的属性p是否具有可枚举性
 * configurable 是否可以使用defineProperty()来修改属性配置以及删除这个属性
 */
Object.defineProperty(myObj, 'a', {
  value: 9
})
console.log(myObj.a)
// 禁止扩展，使用preventExtensions()禁止一个对象添加新的属性
Object.preventExtensions(aObj)
aObj.b = 1
console.log(aObj.b, aObj)
aObj.a = 3
console.log(aObj.a, aObj)
delete aObj.a
console.log(aObj.a, aObj)
// Object.seal(o)相当于Object.preventExtensions(o)并将o的所有属性标记configuration: false
// Object.freeze(o) = Object.seal(o) + all prototype writable: false
Object.defineProperty(newObj, 'b', {
  get () {
    return this.a * 2
  },
  enumerable: true
})
console.log(newObj, newObj.b)
// in操作符会检测对象及其原型链中是否存在属性，hasOwnProperty()则只会检测属性是否在对象上。
console.log('a' in newObj, 'b' in newObj, 'c' in newObj, newObj.hasOwnProperty('b'))
// 4 in [1, 4, 3] -> false [1, 4, 3]的属性为0, 1, 2
// Object.keys(o) 返回一个包含所有可枚举属性的数组
// Object.getOwnPropertyNames(o) 返回一个包含所有属性的数组
let xfoo = x => x % 2
// [1, 3 , 5].some(e => {
//   console.log(e)
// })

// in -> key  of -> value
for (let v in [2, 4, 3]) {
  console.log(v)
}
// 131
// Symbol
var it = [1, 2, 3][Symbol.iterator]()
// done是一个布尔值，表示是否还有可遍历的值 
it.next() // Object {value: 1, done: false}
it.next() // Object {value: 2, done: false}
it.next() // Object {value: 3, done: false}
it.next() // Object {value: undefined, done: true}
var randoms = {
  [Symbol.iterator]() {
    return {
      next() {
        return {
          value: Math.random()
        }
      }
    }
  }
}
let randomsArr = []
for (let n of randoms) {
  randomsArr.push(n)
  if (randomsArr.length === 100) break
}
console.log(randomsArr)

class CoolGuy {
  constructor(trick) {
    this.specialTrick = trick
  }
  showOff() {
    console.log('here\'s my trick: ', this.specialTrick)
  }
}
Jop = new CoolGuy('jumping rope')
Jop.showOff()

class Vehicle {
  constructor() {
    this.engines = 1
  }
  ignition() {
    console.log('turning on my engine')
  }
  drive() {
    this.ignition()
    console.log('steering and moving forward')
  }
}
class Car extends Vehicle {
  constructor() {
    super()
    this.wheels = 4
  }
  drive() {
    super.drive()
    console.log('Rolling on all ', this.wheels, 'wheels')
  }
}
let v = new Vehicle()
let c = new Car()
v.drive()
c.drive()

// Object.create(obj) 创建一个关联到obj的对象
var cObj = Object.create(newObj)
cObj // {}
cObj.a // 1

function NothingSpecial(name) {
  // console.log('don\'t mind me')
  this.name = name
}
// 构造函数：带new的函数调用
var aa = new NothingSpecial() // don't ...
aa // {}
NothingSpecial.prototype.myName = function() {
  return this.name
}
console.log(new NothingSpecial('0a').myName())
function Bar(name, label) {
  NothingSpecial.call(this, name)
  this.label = label
}
// 创立一个新的Bar.portotype对象并关联到NothingSpecial.portotype
Bar.prototype = Object.create(NothingSpecial.prototype)
Bar.prototype.myLabel = function() {
  return this.label
}
var aBar = new Bar('a', 'obj a')
console.log(aBar.myName())
console.log(aBar.myLabel())

