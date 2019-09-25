# utils
 
### [list](list)

- [getType](#getType)
- [hasKey](#hasKey)
- [random](#random)
- [is](#is)
- [isNumber](#isNumber)
- [isString](#isString)
- [isBoolean](#isBoolean)
- [isFunction](#isFunction)
- [isObject](#isObject)
- [isArray](#isArray)
- [isDate](#isDate)
- [isRegExp](#isRegExp)
- [isUndefined](#isUndefined)
- [isNull](#isNull)
- [isNaN](#isNaN)
- [isPrimitive](#isPrimitive)
- [isEmptyValue](#isEmptyValue)
- [isMathEqual](#isMathEqual)
- [isEqual](#isEqual)
- [isLeapYear](#isLeapYear)
- [clone](#clone)
- [dateFormatter](#dateFormatter)
- [timeAgo](#timeAgo)
- [bytesToSize](#bytesToSize)
- [sizeToBytes](#sizeToBytes)
- [hexToRgb](#hexToRgb)
- [rgbToHex](#rgbToHex)
- [paging](#paging)
- [getUrlQuery](#getUrlQuery)
- [parseUrl](#parseUrl)




### doc

### getType
**grammar:** getType([value])  
**param:**

1. value\<any\>

**return:** String

[↑ BackToList](#list)


### hasKey
returns a boolean indicating whether the object has the specified property as its own property 

**grammar:** hasKey(object, key)  
**param:**

1. object\<Object\>
2. key\<String\>

**return:** Boolean

[↑ BackToList](#list)


### random
returns a number in the range [min - max]
 
 **grammar:** random(min, max)  
 **param:**
 
 1. min\<Number(int)\>
 2. max\<Number(int)\>
 
 **return:** Number(int)

[↑ BackToList](#list)


### is
get or compare a data type, 
If the parameter type is passed, the data type is compared, 
otherwise the data type of the parameter value is returned.

 **grammar:** is(value[, type])  
 **param:**
 
 1. value\<any\>
 2. type\<String\>
 
 **return:** String or Boolean

[↑ BackToList](#list)


### isNumber
 **grammar:** isNumber(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isString
 **grammar:** isString(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isBoolean
 **grammar:** isBoolean(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isFunction
 **grammar:** isFunction(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isObject
 **grammar:** isObject(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isArray
 **grammar:** isArray(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isDate
 **grammar:** isDate(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isRegExp
 **grammar:** isRegExp(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isUndefined
 **grammar:** isUndefined(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isNull
 **grammar:** isNull(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isNaN
 **grammar:** isNaN(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isPrimitive
 **grammar:** isPrimitive(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isEmptyValue
The following values will return true:
undefined, null, NaN, "", "   "

 **grammar:** isEmptyValue(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isMathEqual

 **grammar:** isMathEqual(a, b)  
 **param:**
 
 1. a\<Number\>
 2. b\<Number\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isEqual

 **grammar:** isEqual(a, b)  
 **param:**
 
 1. a\<Number\>
 2. b\<Number\>
 
 **return:** Boolean

[↑ BackToList](#list)


### isLeapYear

 **grammar:** isLeapYear(value)  
 **param:**
 
 1. value\<Number\>
 
 **return:** Boolean

[↑ BackToList](#list)


### clone

 **grammar:** clone(value)  
 **param:**
 
 1. value\<any\>
 
 **return:** 
 Number,String,Boolean,null,undefined,Symbol,BigInt,
 Date,RegExp,Array,Object

[↑ BackToList](#list)


### dateFormatter

 **grammar:** clone(date[, format])  
 **param:**
 
 1. date\<Date,String\>
 2. format\<String\>: default: YYYY-MM-DD hh:mm:ss
 
 **return:** String, NaN
 
 replacement in the format
 
 | replacement | remarks              |
 | :---        | :---                 |
 | YY          | Two-digit year       |
 | YYYY        | full year            |
 | MM          | month                |
 | DD          | the day of the month |
 | hh          | hours                |
 | mm          | minutes              |
 | ss          | seconds              |
 | ms          | milliseconds         |
 | da          | the day of the week  |
 | ts          | timestamp            |

[↑ BackToList](#list)


### timeAgo
rough calculation of date difference

 **grammar:** timeAgo(oldDate[, nowDate])  
 **param:**
 
 1. oldDate\<Date, String\>
 2. nowDate\<Date, String\>: default: Date.now()
 
 **return:** String

[↑ BackToList](#list)



### bytesToSize
format the number of bytes into a file size with units

 **grammar:** bytesToSize(bytes[, base])  
 **param:**
 
 1. bytes\<Number\>
 2. base\<Number\>: default: 1000
 
 **return:** String, NaN

[↑ BackToList](#list)


### sizeToBytes
the file size with units is formatted as bytes

 **grammar:** sizeToBytes(size[, base])  
 **param:**
 
 1. size\<String\>
 2. base\<Number\>: default: 1000
 
 **return:** Number, NaN

[↑ BackToList](#list)


### hexToRgb
convert hex to RGB

 **grammar:** hexToRgb(hex[, digit])  
 **param:**
 
 1. hex\<String\>
 2. digit\<Number\>: default: 1
 
 **return:** String

[↑ BackToList](#list)


### rgbToHex
convert RGB to hex

 **grammar:** rgbToHex(r, g, b)  
 **param:**
 
 1. r\<Number\>
 2. g\<Number\>
 3. b\<Number\>
 
 **return:** String

[↑ BackToList](#list)


### paging
convert a one-dimensional array to a two-dimensional array

 **grammar:** paging(data, size)  
 **param:**
 
 1. data\<Array\>
 2. size\<Number\>
 
 **return:** Array(two-dimensional)

[↑ BackToList](#list)


### getUrlQuery
parse the query string from the url into an object

 **grammar:** getUrlQuery(url)  
 **param:**
 
 1. url\<String\>
 
 **return:** Object

[↑ BackToList](#list)


### parseUrl
parse the url into an object

 **grammar:** parseUrl(url)  
 **param:**
 
 1. url\<String\>
 
 **return:** Object
 
 **ObjectItem**
 
 | key      | type   | remarks            |
 | :---     | :---   | :---               |
 | href     | String | url                |
 | scheme   | String | url scheme         |
 | username | String | url username       |
 | password | String | url password       |
 | host     | String | url hostname       |
 | port     | String | url port           |
 | path     | String | url path           |
 | search   | String | url search         |
 | hash     | String | url hash           |
 | query    | Object |                    |

[↑ BackToList](#list)
