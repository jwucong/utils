import {parseUrl} from "./index.js";

const url = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=7&tn=98012088_9_dg&wd=es6%E8%BD%AC%E6%88%90%E8%83%BD%E5%9C%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E8%BF%90%E8%A1%8C%E7%9A%84es5&oq=gulp%25E6%2589%2593%25E5%258C%2585%25E6%25B5%258F%25E8%25A7%2588%25E5%2599%25A8%25E8%25BF%2590%25E8%25A1%258C&rsv_pq=8230025400073338&rsv_t=4f9fvCfHPhthvl1dXgEv4c8IOAmuDCYfb1LDuV3taOx8klGwn0Fj1y77SQyWNjVcQfc8kg&rqlang=cn&rsv_enter=1&inputT=27471&rsv_sug3=113&rsv_sug1=37&rsv_sug7=100&rsv_sug2=0&rsv_sug4=27472';

const result = parseUrl(url)

console.log(result)
