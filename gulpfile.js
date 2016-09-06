var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
  gulp.src(['src/app/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lintdev', function() {
  gulp.src(['src/app/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
