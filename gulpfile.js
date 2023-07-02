const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const nodemon = require('gulp-nodemon');
const uglify = require('gulp-uglify');

const buildDir = './build';
const srcDir = './src';

// Компиляция SCSS в CSS
gulp.task('sass', function () {
  return gulp
    .src('src/public/css/**/*.css')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${buildDir}/public/css`));
});

// Объединение и сжатие JS файлов
gulp.task('scripts', function () {
  return gulp
    .src('src/public/js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(`${buildDir}/public/js`));
});

// Task to watch SCSS files for changes
gulp.task('watch', () => {
  gulp.watch('src/public/js/**/*.js', gulp.series('scripts'));
  gulp.watch('src/public/css/**/*.css', gulp.series('sass'));
});

// Задача по умолчанию
gulp.task('default', gulp.series('sass', 'scripts', 'watch'));
