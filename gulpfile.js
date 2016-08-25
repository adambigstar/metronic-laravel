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
  gulp.src('./public/sass/bootstrap.scss').pipe(sass()).pipe(gulp.dest('./public/assets/global/plugins/bootstrap/css/'));

  // select2 compilation using bootstrap variables
  gulp.src('./public/assets/global/plugins/select2/sass/select2-bootstrap.min.scss').pipe(sass({outputStyle: 'compressed'})).pipe(gulp.dest('./public/assets/global/plugins/select2/css/'));

  // global theme stylesheet compilation
  gulp.src('./public/sass/global/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/global/css'));
  gulp.src('./public/sass/apps/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/apps/css'));
  gulp.src('./public/sass/pages/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/pages/css'));

  // theme layouts compilation
  gulp.src('./public/sass/layouts/layout/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/layouts/layout/css'));
  gulp.src('./public/sass/layouts/layout/themes/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/layouts/layout/css/themes'));

  gulp.src('./public/sass/layouts/layout2/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/layouts/layout2/css'));
  gulp.src('./public/sass/layouts/layout2/themes/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/layouts/layout2/css/themes'));

  gulp.src('./public/sass/layouts/layout3/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/layouts/layout3/css'));
  gulp.src('./public/sass/layouts/layout3/themes/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/layouts/layout3/css/themes'));

  gulp.src('./public/sass/layouts/layout4/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/layouts/layout4/css'));
  gulp.src('./public/sass/layouts/layout4/themes/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/layouts/layout4/css/themes'));

  gulp.src('./public/sass/layouts/layout5/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/layouts/layout5/css'));

  gulp.src('./public/sass/layouts/layout6/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/layouts/layout6/css'));

  gulp.src('./public/sass/layouts/layout7/*.scss').pipe(sass()).pipe(gulp.dest('./public/assets/layouts/layout7/css'));
});

//*** SASS watch(realtime) compiler task
gulp.task('sass:watch', function () {
  gulp.watch('./public/sass/**/*.scss', ['sass']);
});

//*** CSS & JS minify task
gulp.task('minify', function () {

  gulp.src(['./resources/assets/css/**', '!./public/css']).pipe(gulp.dest('./public/css/'));
  gulp.src(['./resources/assets/js/**', '!./public/js']).pipe(gulp.dest('./public/js/'));
  gulp.src(['./resources/views/layouts/partials/**', '!./public/tpl']).pipe(gulp.dest('./public/tpl/'));

  // css minify 
  gulp.src(['./public/assets/apps/css/*.css', '!./public/assets/apps/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/assets/apps/css/'));

  gulp.src(['./public/assets/global/css/*.css','!./public/assets/global/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/assets/global/css/'));
  gulp.src(['./public/assets/pages/css/*.css','!./public/assets/pages/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/assets/pages/css/'));

  gulp.src(['./public/assets/layouts/**/css/*.css','!./public/assets/layouts/**/css/*.min.css']).pipe(rename({suffix: '.min'})).pipe(minifyCss()).pipe(gulp.dest('./public/assets/layouts/'));
  gulp.src(['./public/assets/layouts/**/css/**/*.css','!./public/assets/layouts/**/css/**/*.min.css']).pipe(rename({suffix: '.min'})).pipe(minifyCss()).pipe(gulp.dest('./public/assets/layouts/'));

  gulp.src(['./public/assets/global/plugins/bootstrap/css/*.css','!./public/assets/global/plugins/bootstrap/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/assets/global/plugins/bootstrap/css/'));

  //js minify
  gulp.src(['./public/assets/apps/scripts/*.js','!./public/assets/apps/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/assets/apps/scripts/'));
  gulp.src(['./public/assets/global/scripts/*.js','!./public/assets/global/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/assets/global/scripts'));
  gulp.src(['./public/assets/pages/scripts/*.js','!./public/assets/pages/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/assets/pages/scripts'));
  gulp.src(['./public/assets/layouts/**/scripts/*.js','!./public/assets/layouts/**/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./public/assets/layouts/'));
});

//*** RTL convertor task
gulp.task('rtlcss', function () {

  gulp
    .src(['./public/assets/apps/css/*.css', '!./public/assets/apps/css/*-rtl.min.css', '!./public/assets/apps/css/*-rtl.css', '!./public/assets/apps/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./public/assets/apps/css'));

  gulp
    .src(['./public/assets/pages/css/*.css', '!./public/assets/pages/css/*-rtl.min.css', '!./public/assets/pages/css/*-rtl.css', '!./public/assets/pages/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./public/assets/pages/css'));

  gulp
    .src(['./public/assets/global/css/*.css', '!./public/assets/global/css/*-rtl.min.css', '!./public/assets/global/css/*-rtl.css', '!./public/assets/global/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./public/assets/global/css'));

  gulp
    .src(['./public/assets/layouts/**/css/*.css', '!./public/assets/layouts/**/css/*-rtl.css', '!./public/assets/layouts/**/css/*-rtl.min.css', '!./public/assets/layouts/**/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./public/assets/layouts'));

  gulp
    .src(['./public/assets/layouts/**/css/**/*.css', '!./public/assets/layouts/**/css/**/*-rtl.css', '!./public/assets/layouts/**/css/**/*-rtl.min.css', '!./public/assets/layouts/**/css/**/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./public/assets/layouts'));

  gulp
    .src(['./public/assets/global/plugins/bootstrap/css/*.css', '!./public/assets/global/plugins/bootstrap/css/*-rtl.css', '!./public/assets/global/plugins/bootstrap/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./public/assets/global/plugins/bootstrap/css'));
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