function parseUrl(url = '') {
  const link = decodeURIComponent(url)
  const reg = /^(?:([\w.+-]+):\/\/)?(?:([^\s:]+):([^@]*)@)?([^\s:\/]+)(?::(\d+))?(\/[^\s?#]*)?(\?[^\s#]*)?(#\S*$)?/i
  const result = reg.exec(link) || []
  return {
    href: result[0] || '',
    protocol: result[1] || '',
    username: result[2] || '',
    password: result[3] || '',
    hostname: result[4] || '',
    port: +result[5] || 80,
    path: result[6] || '/',
    query: getUrlQuery(result[7] || ''),
    hash: result[8] || ''
  }
}

function getUrlQuery(url = '') {
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
 * 生成范围随机数 min <= x <= max
 * @param min
 * @param max
 * @return {number}
 */
function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
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
 * @param size
 * @return {number}
 */
function toByte(size) {
  const valueReg = /^(\d+(?:\.\d+)?)/;
  if(!valueReg.test(size)) {
    throw new Error(`无法识别的文件大小：${size}`)
  }
  const units = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D'];
  const value = RegExp.$1
  const unit = size.replace(valueReg, '').trim() || 'B'
  const index = units.findIndex((item, i) => {
    const str = '^' + item + (i === 0 ? '(?:yte)' : 'b') + '?$'
    const reg = new RegExp(str, 'i')
    return reg.test(unit)
  })
  if(index === -1) {
    throw new Error(`无法识别的字节单位：${unit}`)
  }
  const byte = Math.ceil(value * Math.pow(1024, index))
  return byte
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
  const h1 = h.length === 3 ? [...h].map(item => item + item).join('') : h;
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
 * 获取或者判断值类型
 * @param value
 * @param type
 * @return {type ? boolean : string}
 * @private
 */
function is(value, type) {
  var className = {}.toString.call(value).replace(/^\[object\s(\w+)\]$/, '$1')
  return type ? className.toLowerCase() === type.toLowerCase() : className
}

/**
 * 判断是否为 Number
 * @param value
 * @return {boolean}
 * @private
 */
function isNumber(value) {
  return is(value, 'Number')
}

/**
 * 判断是否为 String
 * @param value
 * @return {boolean}
 * @private
 */
function isString(value) {
  return is(value, 'String')
}

/**
 * 判断是否为 Array
 * @param value
 * @return {boolean}
 * @private
 */
function isArray(value) {
  return is(value, 'Array')
}

/**
 * 判断是否为 Object
 * @param value
 * @return {boolean}
 * @private
 */
function isObject(value) {
  return is(value, 'Object')
}

/**
 * 判断是否为 Boolean
 * @param value
 * @return {boolean}
 * @private
 */
function isBoolean(value) {
  return is(value, 'Boolean')
}

/**
 * 判断是否为 Function
 * @param value
 * @return {boolean}
 * @private
 */
function isFunction(value) {
  return is(value, 'Function')
}

/**
 * 判断是否为 RegExp
 * @param value
 * @return {boolean}
 * @private
 */
function isRegExp(value) {
  return is(value, 'RegExp')
}

/**
 * 判断是否为 Date
 * @param value
 * @return {boolean}
 * @private
 */
function isDate(value) {
  return is(value, 'Date')
}

/**
 * 判断是否为 Symbol
 * @param value
 * @return {boolean}
 * @private
 */
function isSymbol(value) {
  return is(value, 'Symbol')
}

/**
 * 判断是否为 null
 * @param value
 * @return {boolean}
 * @private
 */
function isNull(value) {
  return is(value, 'Null')
}

/**
 * 判断是否为 undefined
 * @param value
 * @return {boolean}
 * @private
 */
function isUndefined(value) {
  return is(value, 'Undefined')
}

/**
 * 判断是否为 NaN
 * @param value
 * @return {boolean}
 * @private
 */
function isNaN(value) {
  return isNumber(value) && value !== value
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
 * 带单位的文件大小转为不带单位的bytes字节数
 * @param size
 * @param base
 * @return {number}
 * @private
 */
function toBytes(size, base = 1024) {
  const valueReg = /^(\d+(?:\.\d+)?)/;
  if (!valueReg.test(size)) {
    throw new Error('Unresolved: ' + size)
  }
  const units = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D'];
  const value = RegExp.$1
  const unit = size.toString().replace(valueReg, '').trim() || 'B'
  const index = units.findIndex((item, i) => {
    const str = '^' + item + (i === 0 ? '(?:yte)' : 'b') + '?$'
    const reg = new RegExp(str, 'i')
    return reg.test(unit)
  })
  if (index === -1) {
    throw new Error('Unrecognized unit: ' + unit)
  }
  const bytes = Math.ceil(value * Math.pow(base, index))
  return bytes
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
    'MM': fix(d.getMonth() + 1),
    'dd': fix(d.getDate()),
    'hh': fix(d.getHours()),
    'mm': fix(d.getMinutes()),
    'ss': fix(d.getSeconds())
  }
  Object.keys(map).forEach(function (key) {
    formatter = formatter.replace(new RegExp(key, 'g'), map[key])
  })
  return formatter
}

/**
 * 字节格式化
 * @param bytes
 * @param digits
 * @param base
 * @return {string}
 * @private
 */
function formatBytes(bytes, digits = 2, base = 1024) {
  if (bytes <= 0) {
    return (0).toFixed(digits)
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB']
  const e = Math.floor(Math.log(bytes) / Math.log(base))
  const size = (bytes / Math.pow(base, e)).toFixed(digits)
  return e < units.length ? size + units[e] : 'bytes too large'
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
function replace(template, data, markers = ['{{', '}}']) {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const reg = new RegExp(markers[0] + '\\s*' + key + '\\s*' + markers[1], 'g');
      template = template.replace(reg, () => data[key]);
    }
  }
  return template;
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
