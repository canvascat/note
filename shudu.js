const fs = require('fs')

const mat = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9']
]
// const nums = [...new Array(9)].map((e, i) => i + 1)

let candidateNums = (mat, x, y) => {
  let res = mat[x].filter(e => e !== '.')
  for (let i = 0; i < 9; i++) {
    let ele = mat[i][y]
    if (i !== x && res.indexOf(ele) === -1 && ele !== '.')
      res.push(ele)
  }
  const [x0, y0] = [~~(x / 3), ~~(y / 3)]
  for (let i = x0 * 3; i < x0 * 3 + 3; i++) {
    for (let j = y0 * 3; j < y0 * 3 + 3; j++) {
      if (i !== x && j !== y) {
        let ele = mat[i][j]
        // console.log(ele)
        if (res.indexOf(ele) === -1 && ele !== '.')
          res.push(ele)
      }
    }
  }
  return res
}

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const e = board[i][j]
      if (i === board.length - 1 && j === board.length -1)
        return board
      if (e === '.') {
        const a = candidateNums(board, i, j)
        if (a.length >= 8) {
          const con = a.sort().find((e, i) => parseInt(e) !== i + 1) - 1
          board[i][j] = `${con || 9}`
          return solveSudoku(board)
        }
      }
    }
  }
};

const data = solveSudoku(mat)

// fs.writeFile(filename,data,[options],callback);

/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
fs.writeFile('output.text', JSON.stringify(data), err => {
  if (err)
    console.log(err)
  else
    console.log('ok')
})