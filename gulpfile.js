import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import cleancss from 'gulp-clean-css';
import nodemon from 'gulp-nodemon';
import uglify from 'gulp-uglify';
import postcss from 'gulp-postcss';
import ignore from 'gulp-ignore';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import { exec } from 'child_process';

const sass = gulpSass(dartSass);

const buildDir = './build';
const srcDir = './src';

// Process SCSS files and compile to CSS
gulp.task('styles', () => {
  return gulp
    .src(`${srcDir}/public/style/*.scss`) // Выбираем все файлы SCSS
    .pipe(sass().on('error', sass.logError)) // Compile SCSS to CSS
    .pipe(postcss([autoprefixer])) // Apply autoprefixer
    .pipe(cleancss()) // Minify CSS
    .pipe(concat('main.css')) // Объединяем все CSS файлы в один файл
    .pipe(gulp.dest(`${buildDir}/public/style`)) // Output the final CSS file
    .pipe(ignore('**/*.scss')); // Исключаем исходные файлы SCSS из копирования
});

// Concatenate and minify JS files
gulp.task('scripts', () => {
  return gulp
    .src(`${srcDir}/public/js/*.js`) // Выбираем все файлы JS
    .pipe(concat('bundle.js')) // Объединяем все JS файлы в один файл
    .pipe(uglify()) // Minify JS
    .pipe(gulp.dest(`${buildDir}/public/js`)) // Output the final JS file
    .pipe(ignore('**/*.js')); // Исключаем исходные файлы JS из копирования
});

gulp.task('copyEnv', () => {
  return gulp.src('.env').pipe(gulp.dest('build')); // Copy .env file to the build directory
});

gulp.task('express', (done) => {
  exec(
    'npx ncc build app.js -o build -m',
    { encoding: 'utf8' },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      done(); // Task completion
    }
  );
});

// Process EJS files and minify HTML
gulp.task('ejsViews', () => {
  return gulp
    .src(`${srcDir}/views/*.ejs`)
    .pipe(htmlmin({ collapseWhitespace: true })) // Minify HTML
    .pipe(gulp.dest(`${buildDir}/views`)); // Output the minified HTML files
});

gulp.task('ejsPartials', () => {
  return gulp
    .src(`${srcDir}/partials/*.ejs`)
    .pipe(htmlmin({ collapseWhitespace: true })) // Minify HTML
    .pipe(gulp.dest(`${buildDir}/partials`)); // Output the minified HTML files
});

// Optimize images
gulp.task('images', () => {
  return gulp
    .src(`${srcDir}/public/img/**/*`)
    .pipe(imagemin()) // Optimize images
    .pipe(gulp.dest(`${buildDir}/public/img`)); // Output the optimized images
});

gulp.task('server', (done) => {
  nodemon({
    script: 'build/index.js',
  }).on('start', done); // Добавляем обратный вызов для выполнения задачи
});

// Watch for file changes
gulp.task('watch', () => {
  gulp.watch('src/public/js/*.js', gulp.series('scripts'));
  gulp.watch('src/public/style/*.scss', gulp.series('styles'));
  gulp.watch('src/views/*.ejs', gulp.series('ejsViews'));
  gulp.watch('src/partials/*.ejs', gulp.series('ejsPartials'));
  gulp.watch('src/public/img/*', gulp.series('images'));
  gulp.watch('.env', gulp.series('copyEnv'));
  gulp.watch('app.js', gulp.series('express'));
});

// Default task
gulp.task(
  'dev',
  gulp.series(
    'scripts',
    'styles',
    'ejsViews',
    'ejsPartials',
    'images',
    'express',
    'copyEnv',
    'server',
    'watch'
  )
);

gulp.task(
  'default',
  gulp.series(
    'scripts',
    'styles',
    'ejsViews',
    'ejsPartials',
    'images',
    'express',
    'copyEnv',
    'server'
  )
);

gulp.task(
  'build',
  gulp.series(
    'scripts',
    'styles',
    'ejsViews',
    'ejsPartials',
    'images',
    'express',
    'copyEnv'
  )
);
