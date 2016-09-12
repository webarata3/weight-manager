// 参考
// https://github.com/Quramy/electron-jsx-babel-boilerplate/blob/master/gulpfile.js
// http://akabeko.me/blog/2015/01/gulp-copy-keep-dir-structure/

var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
  gulp.src(['app/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lintdev', function() {
  gulp.src(['app/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
