const isIdCardNum = value => {
  // 地址码 出生日期码 顺序码 校验码
  const reg = /^\s*((\d{2})(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{3}))([\dx])\s*$/i
  const match = reg.exec(value)
  if(!match) {
    return false
  }
  const cardYear = match[5]
  const cardMonth = match[6]
  const cardDay = match[7]
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const isLeapYear = y => y % 4 === 0 && y % 100 !== 0 || y % 400 === 0
  const getMonthMaxDays = (y, m) => m === 1 && isLeapYear(y) ? 29 : months[m]
  if(
    cardYear > year
    || cardMonth == 0
    || cardMonth > 12
    || cardDay == 0
    || cardDay > getMonthMaxDays(cardYear - 1, cardMonth)
  ) {
    return false
  }
  if(cardYear === year) {
    if(cardMonth > month) {
      return false
    }
    if(cardMonth == month && cardDay > day) {
      return false
    }
  }
  const ratios = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const sum = match[1].split('').reduce((acc, item, i) => acc + item * ratios[i], 0)
  const ns = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
  const n = '' + ns[sum % 11]
  return n === match[9].toUpperCase()
}

function isLeapYear(y) {
  return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
}

const flag = isIdCardNum('452123199210153272')

console.log(flag)
