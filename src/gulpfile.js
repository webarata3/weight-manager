var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
  gulp.src('js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function() {
  gulp.src('js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
