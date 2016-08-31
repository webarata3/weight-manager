var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('eslint', function() {
  gulp.src('js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', process.exit.bind(process, 1));
});
