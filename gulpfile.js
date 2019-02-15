const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')

gulp.task('default', () =>
  gulp
    .src('src/**.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist'))
);


gulp.task('transform', () => {
  const inputOptions = {
    input: "src/utils.js",
    plugins: [ babel() ]
  }
  const outputOptions = {
    file: "dist/utils.es5.js",
    format: "iife",
    name: 'utils'
  }
  return new Promise((resolve, reject) => {
    rollup.rollup(inputOptions).then((bundle) => {
      bundle.write(outputOptions);
      resolve(bundle)
    }).catch((err) => {
      reject(err)
    })
  });
});

gulp.task('compress', ['transform'], () => {

});
