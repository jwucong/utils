/**
 * 获取或者判断值类型
 * @param value {any}
 * @param type {string}
 * @return {type ? boolean : string}
 */
const is = (value, type) => {
  var c = {}.toString.call(value).replace(/^\[object\s(\w+)\]$/, '$1')
  return type ? c.toLowerCase() === type.toLowerCase() : c
}

/**
 * 判断是否为 Number
 * @param value
 * @return {boolean}
 */
const isNumber = value => is(value, 'Number')


/**
 * 判断是否为 String
 * @param value
 * @return {boolean}
 */
const isString = value => is(value, 'String')


/**
 * 判断是否为 Array
 * @param value
 * @return {boolean}
 */
const isArray = value => is(value, 'Array')


/**
 * 判断是否为 Object
 * @param value
 * @return {boolean}
 */
const isObject = value => is(value, 'Object')


/**
 * 判断是否为 Boolean
 * @param value
 * @return {boolean}
 */
const isBoolean = value => is(value, 'Boolean')


/**
 * 判断是否为 Function
 * @param value
 * @return {boolean}
 */
const isFunction = value => is(value, 'Function')


/**
 * 判断是否为 RegExp
 * @param value
 * @return {boolean}
 */
const isRegExp = value => is(value, 'RegExp')


/**
 * 判断是否为 Date
 * @param value
 * @return {boolean}
 */
const isDate = value => is(value, 'Date')


/**
 * 判断是否为 Symbol
 * @param value
 * @return {boolean}
 */
const isSymbol = value => is(value, 'Symbol')


/**
 * 判断是否为 null
 * @param value
 * @return {boolean}
 */
const isNull = value => is(value, 'Null')


/**
 * 判断是否为 undefined
 * @param value
 * @return {boolean}
 */
const isUndefined = value => is(value, 'Undefined')


/**
 * 判断是否为 NaN
 * @param value
 * @return {boolean}
 */
const isNaN = value => isNumber(value) && value !== value


/**
 * 判断是否为闰年
 * @param value
 * @return {boolean}
 */
const isLeapYear = value => value % 4 === 0 && value % 100 !== 0 || value % 400 === 0


/**
 * 固定电话校验
 * @param value
 * @returns {boolean}
 */
const isTelephoneNum = value => {
  const reg = /^/
  return reg.test(value)
}


/**
 * 手机号码校验
 * @param value
 * @returns {boolean}
 */
const isCellphoneNum = value => {
  const reg = /^(\+86)?\s*1[3456789]\d{9}\s*$/
  return reg.test(value)
}

/**
 * 邮箱校验
 * @param value
 */
const isEmail = value => {

}


/**
 * 身份证号码校验
 * @param value
 */
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
    || cardDay > getMonthMaxDays(cardYear, cardMonth - 1)
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


/**
 * 生成范围随机数 min <= x <= max
 * @param min
 * @param max
 * @return {number}
 */
const random = (min, max) => Math.round(Math.random() * (max - min) + min);


/**
 * 获取URL查询参数
 * @param url
 */
const getUrlQuery = (url = '') => {
  const reg = /[?&]([^=&#]+)=([^&#]*)/ig
  const result = {}
  let p = null
  while (p = reg.exec(url)) {
    var key = decodeURIComponent(p[1])
    var val = decodeURIComponent(p[2])
    result[key] = /^\d+$/.test(val) ? +val : val
  }
  return result;
}


/**
 * 解析URL
 * @param url
 * @returns object
 */
const parseUrl = (url = '') => {
  const link = decodeURIComponent(url)
  const reg = /^(?:([\w.+-]+):\/\/)?(?:([^\s:]+):([^@]*)@)?([^\s:\/]+)(?::(\d+))?(\/[^\s?#]*)?(\?[^\s#]*)?(#\S*$)?/i
  const result = reg.exec(link) || []
  return {
    href: result[0] || "",
    protocol: result[1] || '',
    username: result[2] || '',
    password: result[3] || '',
    hostname: result[4] || '',
    port: link ? +result[5] || 80 : '',
    path: link ? result[6] || '/' : '',
    query: getUrlQuery(result[7] || ''),
    hash: result[8] || ''
  }
}



/**
 * 一维数组转二维数组（前端分页）
 * @param data
 * @param size
 * @return {Array}
 * @example:
 *   data = [1, 2, 3, 4, 5, 6, 7, 8]
 *   size = 3
 *   paging(data, size) => [[1, 2, 3], [4, 5, 6], [7, 8]]
 */
function paging(data, size) {
  let i = 0, n = data.length, result = [];
  for (; i < n; i += size) {
    result.push(data.slice(i, i + size));
  }
  return result;
}


/**
 * 文件大小转为字节
 * @param size {string}
 * @return {number}
 */
function toBytes(size, base = 1024) {
  const valReg = /^\s*\+?((?:\.\d+)|(?:\d+(?:\.\d+)?))(?!\.|\d)\s*([a-zA-Z]*)/i;
  const match = valReg.exec(size);
  if (!match) {
    throw new Error(`Unresolvable value: ${size}`)
  }
  const value = +match[1];
  const unit = match[2] || 'B';
  const units = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D'];
  const index = units.findIndex((item, i) => {
    const str = '^' + item + (i === 0 ? '(?:yte)' : 'b') + '?$'
    const reg = new RegExp(str, 'i')
    return reg.test(unit)
  })
  if (index < 0) {
    throw new Error(`Unresolvable unit: ${unit}`)
  }
  return Math.ceil(value * Math.pow(base, index))
}


/**
 * 字节格式化
 * @param bytes
 * @param digits
 * @param base
 * @return {string}
 */
function formatBytes(bytes, base = 1024, digits = 2) {
  const MAX_SIZE = Math.pow(base, 11)
  if (bytes < 0 || bytes > MAX_SIZE) {
    throw new Error(bytes < 0 ? 'Bytes can not be negative' : 'The number of bytes is too large')
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB']
  const n = Math.floor(Math.log(bytes) / Math.log(base))
  const size = (bytes / Math.pow(base, n)).toFixed(digits)
  return size + units[n]
}


/**
 * 日期格式化
 * @param date
 * @param formatter
 * @return {string}
 */
function formatDate(date = Date.now(), formatter = 'yyyy-MM-dd hh:mm:ss') {
  const fix = n => n < 10 ? '0' + n : n + ''
  const d = new Date(date)
  const map = {
    'yyyy': d.getFullYear(),
    'MM': d.getMonth() + 1,
    'dd': d.getDate(),
    'hh': d.getHours(),
    'mm': d.getMinutes(),
    'ss': d.getSeconds()
  }
  return Object.keys(map).reduce((acc, key) => {
    return acc.replace(new RegExp(key, 'g'), fix(map[key]))
  }, formatter)
}


/**
 * 十六进制转RGB(A)
 * @param hex  十六进制值
 * @param toFixed  透明度保留小数点位数 default: 1
 * @return {string}
 * @example:
 *   hexToRGB('#abcdef') => rgb(171, 205, 239)
 *   hexToRGB('#abcdef80') => rgba(171, 205, 239, 0.5)
 *   hexToRGB('#abcdef80', 2) => rgba(171, 205, 239, 0.50)
 */
function hexToRGB(hex, toFixed = 1) {
  const h = hex.replace(/^\#/, '');
  const h1 = h.length === 3 ? h.slice().map(item => item + item).join('') : h;
  const alpha = h1.length === 8;
  const h2 = parseInt(h1, 16);
  const r = (h2 >>> (alpha ? 24 : 16));
  const g = (h2 & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8);
  const b = (h2 & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0);
  const a = alpha ? ((h2 & 0x000000ff) / 255).toFixed(toFixed) : '';
  const rgba = [r, g, b].concat(alpha ? a : []).join(', ');
  const str = `rgb${alpha ? 'a' : ''}(${rgba})`;
  return str;
}


/**
 * RGB转16进制值
 * @param r
 * @param g
 * @param b
 * @return {string}
 * @example:
 *   RGBToHex(0, 0, 0) => 000000
 *   RGBToHex(255, 255, 255) => ffffff
 */
function RGBToHex(r, g, b) {
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
}


/**
 * 判断是否ios系统
 * @return {boolean}
 * @private
 */
function isIOS() {

}

/**
 * 判断是否Android系统
 * @return {boolean}
 * @private
 */
function isAndroid() {

}

/**
 * 合并对象
 * @return {object}
 * @private
 */
function extend() {
  const items = toArray(arguments).filter(item => isObject(item))
  const size = items.length
  if (size <= 0) {
    return {}
  }
  let target = items[0]
  for (let i = 1; i < size; i++) {
    const obj = items[i]
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (target[key] !== obj[key]) {
          target[key] = obj[key]
        }
      }
    }
  }
  return target
}

/**
 * 类数组对象转为数组
 * @param arrayLike
 * @return {array}
 * @private
 */
function toArray(arrayLike) {
  return [].slice.call(arrayLike)
}

/**
 * 秒转换为dd天hh时mm分ss秒
 * @param s 秒数
 * @return {string}
 */
function S2DHMS(s) {
  if (s <= 0) {
    return '00天00时00分00秒';
  }
  const fix = n => n < 10 ? '0' + n : n + ''
  const dd = fix(Math.floor(s / 3600 / 24));
  const hh = fix(Math.floor(s / 3600) % 24);
  const mm = fix(Math.floor(s / 60) % 60);
  const ss = fix(Math.floor(s % 60));
  const str = [dd, '天', hh, '时', mm, '分', ss, '秒'].join('');
  return str
}


/**
 * 倒计时
 * @param options
 * @return {void 0}
 */
function countdown(options) {
  const setting = extend({
    duration: 60,
    interval: 1,
    beforeCountdown: null,
    onCountdown: null,
    afterCountdown: null
  }, options)
  let duration = setting.duration
  const beforeFn = setting.beforeCountdown
  const onFn = setting.onCountdown
  const afterFn = setting.afterCountdown
  const interval = setting.interval * 1000
  isFunction(beforeFn) && beforeFn(duration)
  var timerId = setInterval(function () {
    if (--duration <= 0) {
      clearInterval(timerId)
      isFunction(afterFn) && afterFn(duration, timerId)
    } else {
      isFunction(onFn) && onFn(duration, timerId)
    }
  }, interval)
  return timerId;
}

/**
 * 字符串模板替换
 * @param template {string}
 * @param data {object}
 * @param [markers] {array}
 * @return {string}
 * @private
 */
function replace(template, data = {}, markers = ['{{', '}}']) {
  return Object.keys(data).reduce((acc, key) => {
    const reg = new RegExp(markers[0] + '\\s*' + key + '\\s*' + markers[1], 'g')
    return acc.replace(reg, () => data[key]);
  }, template)
}


export {
  parseUrl,
  getUrlQuery,
  random,
  paging,
  hexToRGB,
  RGBToHex,
  is,
  isNumber,
  isString,
  isArray,
  isObject,
  isBoolean,
  isFunction,
  isRegExp,
  isDate,
  isSymbol,
  isNull,
  isUndefined,
  isNaN,
  isLeapYear,
  isTelephoneNum,
  isCellphoneNum,
  isEmail,
  isIdCardNum,
  isIOS,
  isAndroid,
  extend,
  toArray,
  toBytes,
  S2DHMS,
  formatDate,
  formatBytes,
  countdown,
  replace
}
