const gulp = require('gulp');
const rollup = require('gulp-rollup');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const prettier = require('gulp-prettier');
const uncomment = require('gulp-uncomment');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const cleanDir = require('gulp-clean-dir');

// gulp.series    // 顺序执行任务
// gulp.parallel  // 并行实行任务

// 去除注释配置
const uncommentOptions = {
  removeEmptyLines: true
}

// 代码格式化配置
const prettierOptions = {
  tabWidth: 2,
  singleQuote: true,
  semicolons: true
}

// 清除dist目录
const clean = (cb) => {
  cleanDir('dist')
  cb()
}

// 从src复制文件到dist文件夹
const copy = () => {
  return gulp.src(['src/index.js', 'src/utils.js'])
    .pipe(uncomment(uncommentOptions))
    .pipe(prettier(prettierOptions))
    .pipe(gulp.dest('dist/'))
}

// ES6转ES5并压缩代码输出到dist文件夹
const transformAndCompress = () => {
  const rollupOptions = {
    input: "src/index.js",
    output: {
      format: "umd",
      name: "utils",
    },
    allowRealFiles: true,
    plugins: [resolve(), babel()]
  }
  const uglifyOptions = {
    mangle: {
      properties: false
    }
  }
  return gulp.src('src/utils.js')
    .pipe(rollup(rollupOptions))
    .pipe(uncomment(uncommentOptions))
    .pipe(prettier(prettierOptions))
    .pipe(rename('utils.es5.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify(uglifyOptions))
    .pipe(rename('utils.es5.min.js'))
    .pipe(gulp.dest('dist/'))
}

const test = () => {
  const rollupOptions = {
    input: "src/test.js",
    output: {
      format: "iife",
      name: "test",
    },
    allowRealFiles: true,
    plugins: [resolve(), babel()]
  }
  return gulp.src('src/test.js')
    .pipe(rollup(rollupOptions))
    .pipe(prettier(prettierOptions))
    .pipe(gulp.dest('dist/'))
}

// 创建任务列表
const tasks = gulp.series(
  clean,
  gulp.parallel(
    copy,
    transformAndCompress,
    test
  )
)

// 注册默认任务，执行所有任务
gulp.task('default', tasks);

