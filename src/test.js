const a = {
  isPro: true,
  getVal: function (){
      return 1;
  }
}

const F = function (){
    this.f = 'f'
}
F.prototype.isF = function (){
    return true
}

const SF = function (){
    this.sf = 'sf'
}
SF.prototype = Object.create(F.prototype, {
  p: {
    value: 42,
    writable: true,
    enumerable: true,
    configurable: true
  }
})
SF.prototype.constructor = SF

const sf = new SF()

const b = Object.create(a, {
  b: {
    value: 2,
    enumerable: true
  }
})

console.log(sf)
console.log(Object.keys(sf))
for (let key in b) {
  console.log(key)
}
