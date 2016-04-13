'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');
const minifyCSS = require('gulp-minify-css');
const debug = require('gulp-debug');
const del = require('del');

/* build directories*/
const buildCSS = 'build/css/';
const buildJS = 'build/js/';

gulp.task('watch', function() {
  gulp.watch('./src/**/*.html', gulp.series('copyHtml'));

  gulp.watch('./styles/less/**/*.less', gulp.series('less'));

  gulp.watch('./src/**/*.js', gulp.series('babel'));
});

gulp.task('clean', function() {
  return del(buildJS);
});

gulp.task('copyHtml', function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest(buildJS));
});

gulp.task('babel', function() {
  return gulp.src('./src/**/*.js', { since: gulp.lastRun('babel') })
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(debug({ title: 'babel' }))
    .pipe(gulp.dest(buildJS));
});

gulp.task('less', function() {
  return gulp.src('./styles/less/main.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest(buildCSS));
});

gulp.task('build',
  gulp.series('clean',
    gulp.parallel('less', 'babel', 'copyHtml')));

gulp.task('default', gulp.series('build', 'watch'));


