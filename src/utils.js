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


export {
  parseUrl,
  getUrlQuery
}
