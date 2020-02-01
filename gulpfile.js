'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');

const jsFiles = [
  './src/js/jquery-3.4.1.min.js',
  './src/js/jquery.inputmask.min.js',
  './src/js/jquery.validate.min.js',
  './src/js/main.js',
]

function styles() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on("error", notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(gulp.dest('./build/css/'));
}

function scripts() {
  return gulp.src(jsFiles)
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('./build/js/'));
}

function image() {
  return gulp.src('./src/img/**/*.*')
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [
          {
              removeViewBox: true
          }
      ]
    }))
    .pipe(gulp.dest('./build/img/'));
}

function font() {
  return gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('./build/fonts/'));
}

function php() {
  return gulp.src('./src/php/**/*.php')
    .pipe(gulp.dest('./build/php/'))
}

function watch() {
  gulp.watch('./src/scss/**/*.scss', styles);
  gulp.watch('./src/img/**/*.*', image);
  gulp.watch('./src/js/**/*.js', scripts);
}

function clean() {
  return del(['build/*']);
}

gulp.task('scripts', scripts);
gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('image', image);

gulp.task('default', gulp.series(clean, gulp.parallel(styles, scripts, font, php), image, 'watch'));
