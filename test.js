// const ARR1 = ['apple', 'pen', 'apple-pen'];
// for (let i = 0; i < arr.length; i++) {
//   const c = arr[i];
//   arr[i] = c.substring(0, 1) + c.substring(1);
// }
const $log = console.log

let numbers = new Array(1, 2, 3, 4, 5)
$log(numbers)
// array -> string
$log(numbers.toString(), numbers.join(','))
$log(numbers)
// 连接数组
$log(numbers.concat([2, 3]), [...numbers, 2, 3])
// 剪切数组
$log(numbers.splice(1, 2), numbers)
// 数组尾头添加元素
$log(numbers.push(7), numbers)
$log(numbers.unshift(8, 9), numbers)
// 删除数组尾/头元素，并返回该元素
$log(numbers.pop(), numbers, numbers.shift(), numbers)
// 数组指定序列处添加元素
$log(numbers.splice(1, 0, 11, 7), numbers)
// 排序
$log(numbers.sort((a, b) => a - b))
$log(numbers.reverse())
// 迭代
numbers.forEach((e, i) => {
  $log(i, e ** 2)
})
// 迭代， every/some -> 所有/存在一个元素返回true则该方法返回true，否则返回false
$log(numbers.every(e => e % 2), numbers.some(e => e % 2))
// reduce/reduceRight
$log(numbers.reduce((a, b) => a + b))
$log(numbers.map(e => e ** 2), numbers.filter(e => e % 2))

var num = 0

outermost: for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if (i === 5 && j === 5)
      continue outermost
      // break outermost
    num++
  }
}
$log(num)