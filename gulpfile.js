// 参考
// https://github.com/Quramy/electron-jsx-babel-boilerplate/blob/master/gulpfile.js
// http://akabeko.me/blog/2015/01/gulp-copy-keep-dir-structure/

var gulp = require('gulp');
var packager = require('electron-packager');
var _ = require('lodash');
var fs = require('fs');
var del = require('del');
var eslint = require('gulp-eslint');
var webpack = require('gulp-webpack');

var srcDir = 'app';
var distDir = 'dist';
var releaseDir = 'release';

gulp.task('lint', function() {
  gulp.src(['app/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lintdev', function() {
  gulp.src([srcDir + '/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('clean', function(done) {
  del([distDir, releaseDir], function() {
    done();
  });
});

gulp.task('webpack', function() {
  return gulp.src(srcDir + '/js/*.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(''));
});

gulp.task('copy', function() {
  return gulp.src(
    [srcDir + '/html/**', srcDir + '/css/**', srcDir + '/fonts/**'],
    {base: srcDir}
  ).pipe(gulp.dest(distDir));
});

// package.jsonの複写とmainの変更
gulp.task('packageJson', ['webpack'], function(done) {
  var json = _.cloneDeep(require('./package.json'));
  json.main = 'main.js';
  fs.writeFile(distDir + '/package.json', JSON.stringify(json), function(err) {
    if (err) throw err;
    done();
  });
});

gulp.task('build', ['copy', 'packageJson']);

gulp.task('package', ['win32', 'darwin', 'linux'].map(function(platform) {
  var taskName = 'package:' + platform;
  gulp.task(taskName, ['build'], function(done) {
    packager({
      dir: distDir,
      name: 'weight-manager',
      arch: 'x64',
      platform: platform,
      out: releaseDir + '/' + platform,
      version: '1.3.5'
    }, function(err) {
      done();
    });
  });
  return taskName;
}));
