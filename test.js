// const ARR1 = ['apple', 'pen', 'apple-pen'];
// for (let i = 0; i < arr.length; i++) {
//   const c = arr[i];
//   arr[i] = c.substring(0, 1) + c.substring(1);
// }

let numbers = new Array(1, 2, 3, 4, 5)
console.log(numbers)
// array -> string
console.log(numbers.toString(), numbers.join(','))
console.log(numbers)
// 连接数组
console.log(numbers.concat([2, 3]), [...numbers, 2, 3])
// 剪切数组
console.log(numbers.splice(1, 2), numbers)
// 数组尾头添加元素
console.log(numbers.push(7), numbers)
console.log(numbers.unshift(8, 9), numbers)
// 删除数组尾/头元素，并返回该元素
console.log(numbers.pop(), numbers, numbers.shift(), numbers)
// 数组指定序列处添加元素
console.log(numbers.splice(1, 0, 11, 7), numbers)
// 排序
console.log(numbers.sort((a, b) => a - b))
console.log(numbers.reverse())
// 迭代
numbers.forEach((e, i) => {
  console.log(i, e ** 2)
})
// 迭代， every/some -> 所有/存在一个元素返回true则该方法返回true，否则返回false
console.log(numbers.every(e => e % 2), numbers.some(e => e % 2))
// reduce/reduceRight
console.log(numbers.reduce((a, b) => a + b))
console.log(numbers.map(e => e ** 2), numbers.filter(e => e % 2))