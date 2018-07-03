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