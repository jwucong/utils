import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',  // 输入文件
  output: {
    file: 'dist/bundle.js',  // 输出文件
    format: 'iife', // 立即执行函数
    name: 'utils'  // 导出的变量名
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
};
