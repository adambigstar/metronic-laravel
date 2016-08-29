'use strict';

// sass compile
var gulp = require('gulp');
var sass = require('gulp-sass');
var prettify = require('gulp-prettify');
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var rtlcss = require("gulp-rtlcss");
var connect = require('gulp-connect');

//*** Localhost server tast
gulp.task('localhost', function() {
  connect.server();
});

gulp.task('localhost-live', function() {
  connect.server({
    livereload: true
  });
});

//*** SASS compiler task
gulp.task('sass', function () {
  // bootstrap compilation
  gulp.src('./public/metronic/sass/bootstrap.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/global/plugins/bootstrap/css/'));

  // select2 compilation using bootstrap variables
  gulp.src('./public/metronic/assets/global/plugins/select2/sass/select2-bootstrap.min.scss').pipe(sass({outputStyle: 'compressed'})).pipe(gulp.dest('./public/metronic/assets/global/plugins/select2/css/'));

  // global theme stylesheet compilation
  gulp.src('./public/metronic/sass/global/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/global/css'));
  gulp.src('./public/metronic/sass/apps/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/apps/css'));
  gulp.src('./public/metronic/sass/pages/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/pages/css'));

  // theme layouts compilation
  gulp.src('./public/metronic/sass/layouts/layout/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/layouts/layout/css'));
  gulp.src('./public/metronic/sass/layouts/layout/themes/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/layouts/layout/css/themes'));

  gulp.src('./public/metronic/sass/layouts/layout2/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/layouts/layout2/css'));
  gulp.src('./public/metronic/sass/layouts/layout2/themes/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/layouts/layout2/css/themes'));

  gulp.src('./public/metronic/sass/layouts/layout3/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/layouts/layout3/css'));
  gulp.src('./public/metronic/sass/layouts/layout3/themes/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/layouts/layout3/css/themes'));

  gulp.src('./public/metronic/sass/layouts/layout4/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/layouts/layout4/css'));
  gulp.src('./public/metronic/sass/layouts/layout4/themes/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/layouts/layout4/css/themes'));

  gulp.src('./public/metronic/sass/layouts/layout5/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/layouts/layout5/css'));

  gulp.src('./public/metronic/sass/layouts/layout6/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/layouts/layout6/css'));

  gulp.src('./public/metronic/sass/layouts/layout7/*.scss').pipe(sass()).pipe(gulp.dest('./public/metronic/assets/layouts/layout7/css'));
});

//*** SASS watch(realtime) compiler task
gulp.task('sass:watch', function () {
  gulp.watch('./public/metronic/sass/**/*.scss', ['sass']);
});

//build task
gulp.task('build', function () {

  gulp.src(['./resources/assets/css/**', '!./public/css']).pipe(gulp.dest('./public/css/'));
  gulp.src(['./resources/assets/js/**', '!./public/js']).pipe(gulp.dest('./public/js/'));
  gulp.src(['./resources/views/layouts/partials/**', '!./public/html']).pipe(gulp.dest('./public/html/'));

  // css minify 
  gulp.src(['./public/metronic/assets/apps/css/*.css', '!./public/metronic/assets/apps/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/metronic/assets/apps/css/'));

  gulp.src(['./public/metronic/assets/global/css/*.css','!./public/metronic/assets/global/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/metronic/assets/global/css/'));
  gulp.src(['./public/metronic/assets/pages/css/*.css','!./public/metronic/assets/pages/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/metronic/assets/pages/css/'));

  gulp.src(['./public/metronic/assets/layouts/**/css/*.css','!./public/metronic/assets/layouts/**/css/*.min.css']).pipe(rename({suffix: '.min'})).pipe(minifyCss()).pipe(gulp.dest('./public/metronic/assets/layouts/'));
  gulp.src(['./public/metronic/assets/layouts/**/css/**/*.css','!./public/metronic/assets/layouts/**/css/**/*.min.css']).pipe(rename({suffix: '.min'})).pipe(minifyCss()).pipe(gulp.dest('./public/metronic/assets/layouts/'));

  gulp.src(['./public/metronic/assets/global/plugins/bootstrap/css/*.css','!./public/metronic/assets/global/plugins/bootstrap/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/metronic/assets/global/plugins/bootstrap/css/'));

  //js minify
  gulp.src(['./public/metronic/assets/apps/scripts/*.js','!./public/metronic/assets/apps/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/metronic/assets/apps/scripts/'));
  gulp.src(['./public/metronic/assets/global/scripts/*.js','!./public/metronic/assets/global/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/metronic/assets/global/scripts'));
  gulp.src(['./public/metronic/assets/pages/scripts/*.js','!./public/metronic/assets/pages/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/metronic/assets/pages/scripts'));
  gulp.src(['./public/metronic/assets/layouts/**/scripts/*.js','!./public/metronic/assets/layouts/**/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/metronic/assets/layouts/'));
});

//*** RTL convertor task
gulp.task('rtlcss', function () {

  gulp
    .src(['./public/metronic/assets/apps/css/*.css', '!./public/metronic/assets/apps/css/*-rtl.min.css', '!./public/metronic/assets/apps/css/*-rtl.css', '!./public/metronic/assets/apps/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./public/metronic/assets/apps/css'));

  gulp
    .src(['./public/metronic/assets/pages/css/*.css', '!./public/metronic/assets/pages/css/*-rtl.min.css', '!./public/metronic/assets/pages/css/*-rtl.css', '!./public/metronic/assets/pages/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./public/metronic/assets/pages/css'));

  gulp
    .src(['./public/metronic/assets/global/css/*.css', '!./public/metronic/assets/global/css/*-rtl.min.css', '!./public/metronic/assets/global/css/*-rtl.css', '!./public/metronic/assets/global/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./public/metronic/assets/global/css'));

  gulp
    .src(['./public/metronic/assets/layouts/**/css/*.css', '!./public/metronic/assets/layouts/**/css/*-rtl.css', '!./public/metronic/assets/layouts/**/css/*-rtl.min.css', '!./public/metronic/assets/layouts/**/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./public/metronic/assets/layouts'));

  gulp
    .src(['./public/metronic/assets/layouts/**/css/**/*.css', '!./public/metronic/assets/layouts/**/css/**/*-rtl.css', '!./public/metronic/assets/layouts/**/css/**/*-rtl.min.css', '!./public/metronic/assets/layouts/**/css/**/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./public/metronic/assets/layouts'));

  gulp
    .src(['./public/metronic/assets/global/plugins/bootstrap/css/*.css', '!./public/metronic/assets/global/plugins/bootstrap/css/*-rtl.css', '!./public/metronic/assets/global/plugins/bootstrap/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./public/metronic/assets/global/plugins/bootstrap/css'));
});

//*** HTML formatter task
gulp.task('prettify', function() {

  gulp.src('./public/**/*.html').
  pipe(prettify({
    indent_size: 4,
    indent_inner_html: true,
    unformatted: ['pre', 'code']
  })).
  pipe(gulp.dest('./public/'));
});