var gulp = require('gulp');
var eslint = require('gulp-eslint');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');


gulp.task('eslint', function() {
  gulp.src('js/**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest('app/product/js/'));
});
