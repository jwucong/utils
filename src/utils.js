/* eslint-disable */
/**
 * 获取数据类型
 * @param value {any}
 * @return {string}
 */
export function getType(value) {
  if(value === null) {
    return 'Null'
  }
  if(value === undefined) {
    return 'Undefined'
  }
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * 判断对象是否拥有制定的属性
 * @param object  {object}
 * @param key     {string}
 * @return {boolean}
 */
export function hasKey(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key)
}

/**
 * 生成[min, max]的随机数，包含边界
 * @param min  {number}
 * @param max  {number}
 * @return {number}
 */
export function random(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

/**
 * 获取/判断数据类型
 * @param value  {any}
 * @param type   {string}
 * @return {string|boolean}
 */
export function is(value, type) {
  const tag = getType(value)
  const test = typeof type === 'string' && type.trim().length > 0
  return test ? tag.toLowerCase() === type.toLowerCase() : tag
}

/**
 * 判断变量是否为数字
 * @param value  {any}
 * @return {boolean}
 */
export function isNumber(value) {
  return getType(value) === 'Number'
}

/**
 * 判断变量是否为字符串
 * @param value  {any}
 * @return {boolean}
 */
export function isString(value) {
  return getType(value) === 'String'
}

/**
 * 判断变量是否为布尔值
 * @param value  {any}
 * @return {boolean}
 */
export function isBoolean(value) {
  return getType(value) === 'Boolean'
}

/**
 * 判断变量是否为函数
 * @param value  {any}
 * @return {boolean}
 */
export function isFunction(value) {
  return getType(value) === 'Function'
}

/**
 * 判断变量是否为对象
 * @param value  {any}
 * @return {boolean}
 */
export function isObject(value) {
  return getType(value) === 'Object'
}

/**
 * 判断变量是否为数组
 * @param value  {any}
 * @return {boolean}
 */
export function isArray(value) {
  return getType(value) === 'Array'
}

/**
 * 判断变量是否为日期
 * @param value  {any}
 * @return {boolean}
 */
export function isDate(value) {
  return getType(value) === 'Date'
}

/**
 * 判断变量是否为正则
 * @param value  {any}
 * @return {boolean}
 */
export function isRegExp(value) {
  return getType(value) === 'RegExp'
}

/**
 * 判断变量是否为undefined
 * @param value  {any}
 * @return {boolean}
 */
export function isUndefined(value) {
  return getType(value) === 'Undefined'
}

/**
 * 判断变量是否为null
 * @param value  {any}
 * @return {boolean}
 */
export function isNull(value) {
  return getType(value) === 'Null'
}

/**
 * 判断变量是否为NaN
 * @param value  {any}
 * @return {boolean}
 */
export function isNaN(value) {
  return getType(value) === 'Number' && value !== value
}

/**
 * 判断变量是否为原始数据类型
 * @param value  {any}
 * @return {boolean}
 */
export function isPrimitive(value) {
  const primitives = [
    'Number',
    'String',
    'Boolean',
    'Null',
    'Undefined',
    'Symbol',
    'BigInt'
  ]
  return primitives.indexOf(getType(value)) !== -1
}

/**
 * 判断变量是否为空值(undefined, null, NaN, "", "   ")
 * @param value  {any}
 * @return {boolean}
 */
export function isEmptyValue(value) {
  const type = getType(value)
  if (type === 'String') {
    return value.trim() === ''
  }
  if (type === 'Number') {
    return value !== value
  }
  return type === 'Null' || type === 'Undefined'
}

/**
 * 判断两个数字是否在数学上相等(浮点运算产生的误差导致)
 * @param a  {number}
 * @param b  {number}
 * @return {boolean}
 */
export function isMathEqual(a, b) {
  const EPSILON = Number.EPSILON || Math.pow(2, -52)
  return Math.abs(a - b) < EPSILON
}

/**
 * 判断两个变量是否相等
 * 0. 原始类型直接使用===判断(数字则使用isMathEqual判断)
 * 1. NaN：true
 * 2. 日期：时间戳相等则认为日期相等
 * 3. 正则：字面表达式相等且标志位相等且lastIndex相等则认为相等
 * 4. 数组：深度递归遍历按上述规则判断
 * 5. 对象：同数组
 * 6. 其他：false
 * @param a  {any}
 * @param b  {any}
 * @return {boolean}
 */
export function isEqual(a, b) {
  if (a === b || (isNaN(a) && isNaN(b))) {
    return true
  }
  const type = getType(a)
  if (type !== getType(b)) {
    return false
  }
  if(type === 'Number') {
    return isMathEqual(a, b)
  }
  if (type === 'Date') {
    return a.getTime() === b.getTime()
  }
  if (type === 'RegExp') {
    const reg = /\w*$/
    const fa = reg.exec(a)[0]
    const fb = reg.exec(b)[0]
    return a.source === b.source && fa === fb && a.lastIndex === b.lastIndex
  }
  if (type === 'Object' || type === 'Array') {
    const keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) {
      return false
    }
    return keys.every(key => isEqual(a[key], b[key]))
  }
  return false
}

/**
 * 判断年份是否为闰年
 * @param value  {number}
 * @return {boolean}
 */
export function isLeapYear(value) {
  return value % 4 === 0 && value % 100 !== 0 || value % 400 === 0
}

/**
 * 深/浅拷贝(引用类型仅适用于：日期、正则、数组、对象)
 * @param value  {any}
 * @param deep   {boolean}
 * @return {Number|String|Boolean|null|undefined|Symbol|BigInt|Date|RegExp|Array|Object}
 */
export function clone(value, deep = false) {
  if (isPrimitive(value)) {
    return value
  }
  const type = getType(value)
  if (type === 'Date') {
    return new Date(value);
  }
  if (type === 'RegExp') {
    const flags = /\w*$/.exec(value)[0];
    const clone = new RegExp(value.source, flags);
    clone.lastIndex = value.lastIndex;
    return clone;
  }
  if (type === 'Object' || type === 'Array') {
    const result = type === 'Object' ? {} : [];
    for (const key in value) {
      if (hasKey(value, key)) {
        result[key] = deep ? clone(value[key], deep) : value[key];
      }
    }
    return result;
  }
  return null;
}

/**
 * 日期格式化
 * YYYY: 完整年份; YY两位数年份
 * MM: 月 DD: 日; hh: 时; mm: 分; ss: 秒; ms: 毫秒; da: 星期几; ts: 时间戳
 * @param date  {Date|String|Number}
 * @param format  {String}
 * @return {String}
 */
export function dateFormatter(date, format = 'YYYY-MM-DD hh:mm:ss') {
  if(typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  const dt = new Date(date)
  if(!dt.getTime()) {
    return NaN
  }
  const fill = (str, num = 2) => str.toString().padStart(num, '0')
  const days = ['日', '一', '二', '三', '四', '五', '六']
  const map = {
    'YY\(YY\)\?': dt.getFullYear(),
    'MM': fill(dt.getMonth() + 1),
    'DD': fill(dt.getDate()),
    'hh': fill(dt.getHours()),
    'mm': fill(dt.getMinutes()),
    'ss': fill(dt.getSeconds()),
    'ms': fill(dt.getMilliseconds(), 3),
    'da': dt.getDay(),
    'ts': dt.getTime()
  }
  for (const key in map) {
    if(hasKey(map, key)) {
      const reg = new RegExp(key, 'g')
      format = format.replace(reg, match => {
        var val = match === 'YY' ? map[key].toString().slice(-2) : map[key]
        return key === 'da' ? days[val] : val
      })
    }
  }
  return format
}

/**
 * 粗略计算时间差
 * @param oldDate  {Date|String}
 * @param nowDate  {Date|String}
 * @return {String}
 */
function timeAgo(oldDate, nowDate) {
  const toDate = date => {
    if(typeof date === 'string') {
      date = new Date(date.trim().replace(/-/g, '/'))
    }
    date = date ? new Date(date) : new Date()
    return date.getTime() ? date : new Date()
  }
  const old = toDate(oldDate).getTime()
  const now = toDate(nowDate).getTime()
  const isAgo = now >= old
  const delta = Math.abs(Math.ceil((now - old) / 1000))
  const units = ['刚刚', '分钟', '小时', '天', '周', '个月', '年']
  const min = 60
  const hour = 60 * min
  const day = 24 * hour
  const values = [
    Math.floor(delta / (365 * day)),
    Math.floor(delta / (30 * day) % 12),
    Math.floor(delta / (7 * day) % 7),
    Math.floor(delta / day),
    Math.floor(delta / hour % 24),
    Math.floor(delta / min % min),
    ' '
  ]
  const format = (val = '', i = 0) => {
    const suffix = i > 0 ? isAgo ? '前' : '后' : ''
    return (val + '').trim() + units[i] + suffix
  }
  const index = values.findIndex(Boolean)
  return format(values[index], units.length - 1 - index)
}

/**
 * 字节数格式化为带单位的文件大小
 * @param bytes  {number}  字节数
 * @param base   {number}  计算基数(1024), 默认值: 1000
 * @return {String|NaN}
 */
export function bytesToSize(bytes, base = 1000) {
  if (bytes < 0) {
    return NaN
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB']
  const index = Math.floor(Math.log(bytes) / Math.log(base))
  const size = Math.ceil(bytes / Math.pow(base, index))
  return index < units.length ? size + units[index] : NaN
}

/**
 * 带单位的文件大小格式化为不带单位的字节数
 * @param size  {string}  文件大小，如: 214kb
 * @param base  {number}  计算基数(1024), 默认值: 1000
 * @return {number|NaN}
 */
export function sizeToBytes(size, base = 1000) {
  const pattern = /^\s*\+?((?:\.\d+)|(?:\d+(?:\.\d+)?))\s*([a-z]*)\s*$/i;
  const p = pattern.exec(size)
  if (!p) {
    return NaN
  }
  const units = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D']
  const value = parseFloat(p[1])
  let index = -1
  for (let i = 0; i < units.length; i++) {
    const str = '^' + units[i] + (i === 0 ? '(?:yte)' : 'b') + '?$'
    const reg = new RegExp(str, 'i')
    if (reg.test(unit)) {
      index = i
      break
    }
  }
  if (isNaN(value) || value < 0 || index < 0) {
    return NaN
  }
  return Math.ceil(value * Math.pow(base, index))
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
export function hexToRgb(hex, toFixed = 1) {
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
export function rgbToHex(r, g, b) {
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
}

/**
 * 一维数组转二维数组(前端分页)
 * @param data  {Array}   需要分页的一维数组
 * @param size  {Number}  页面容量
 * @return {Array}
 */
export function paging(data, size) {
  let i = 0, n = data.length, result = [];
  for (; i < n; i += size) {
    result.push(data.slice(i, i + size));
  }
  return result;
}

/**
 * 从url中解析查询字符串
 * @param url  {String}
 * @return {Object}
 */
export function getUrlQuery(url) {
  const reg = /[?&]([^=&#]+)(?:=([^&#]*))?/ig
  const result = {}
  let p = reg.exec(url)
  while (p) {
    const key = decodeURIComponent(p[1])
    result[key] = p[2] ? decodeURIComponent(p[2]) : ''
    p = reg.exec(url)
  }
  return result;
}

/**
 * 解析url
 * @param url {String}
 * @return {Object}
 */
export function parseUrl(url) {
  const pattern = /^(?:(?:([^\s:\/]+):)?\/\/)?(?:([^:]+):([^@]*)@)?([^\s:\/]+)(?::(\d+))?(\/[^?#]*)?(\?[^#]*)?(#.*$)?/i
  const keys = [
    'href',
    'scheme',
    'username',
    'password',
    'host',
    'port',
    'path',
    'search',
    'hash'
  ]
  const match = pattern.exec(url) || []
  const defaultPorts = {
    http: 80,
    https: 443
  }
  const result = keys.reduce((acc, key, index) => {
    let val = match[index]
    switch (index) {
      case 5:
        val = parseInt(val, 10) || defaultPorts[acc.scheme] || ''
        break
      case 6:
        val = val ? decodeURIComponent(val) : '/'
        break
      default:
        val = match[index] || ''
    }
    acc[key] = match.length ? val : ''
    return acc
  }, {})
  result.query = getUrlQuery(result.search)
  return result
}
