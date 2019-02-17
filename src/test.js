const isIdCardNum = value => {
  const reg = /^\s*(\d{17})([\dx])\s*$/i
  const match = reg.exec(value)
  console.log(match)
  if(!match) {
    return false
  }
  const xs = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const endNums = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
  const i = match[1].split('').reduce((acc, item, index) => acc + item * xs[index], 0) % 11
  const endNumIsRight = match[2].toString().toLowerCase() === endNums[i].toString().toLowerCase()
  console.log(endNumIsRight)
  return
}

const flag = isIdCardNum('452123199210153272')

console.log(flag)
