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
import { deleteAsync } from 'del';

const sass = gulpSass(dartSass);

const buildDir = './build';
const srcDir = './src';

// Process SCSS files and compile to CSS
gulp.task('styles', () => {
  return gulp
    .src(`${srcDir}/public/style/*.scss`) // Select all SCSS files
    .pipe(sass().on('error', sass.logError)) // Compile SCSS to CSS
    .pipe(postcss([autoprefixer])) // Apply autoprefixer
    .pipe(cleancss()) // Minify CSS
    .pipe(concat('main.css')) // Concatenate all CSS files into one file
    .pipe(gulp.dest(`${buildDir}/public/style`)) // Output the final CSS file
    .pipe(ignore('**/*.scss')); // Exclude the source SCSS files from copying
});

// Concatenate and minify JS files
gulp.task('scripts', () => {
  return gulp
    .src(`${srcDir}/public/js/*.js`) // Select all JS files
    .pipe(concat('bundle.js')) // Concatenate all JS files into one file
    .pipe(uglify()) // Minify JS
    .pipe(gulp.dest(`${buildDir}/public/js`)) // Output the final JS file
    .pipe(ignore('**/*.js')); // Exclude the source JS files from copying
});

gulp.task('copyEnv', () => {
  return gulp.src('.env').pipe(gulp.dest('build')); // Copy .env file to the build directory
});

gulp.task('express', (done) => {
  exec(
    'npx ncc build app.js -o build -m -C',
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

gulp.task('clean', async () => {
  await deleteAsync(['build/public/js/*', '!build/public/js/bundle.js']),
    await deleteAsync(['build/public/style/*', '!build/public/style/main.css']);
});

gulp.task('delDir', async () => {
  await deleteAsync(['build/']);
});

gulp.task('server', (done) => {
  const server = nodemon({
    script: 'build/index.js',
  });

  server.on('start', () => {
    // Execute other tasks once the server has started
    gulp.series('watch', 'clean')(done);
  });

  // Restart the server when other files change
  server.on('restart', () => {
    // Execute other tasks on server restart
    gulp.series('watch', 'clean')(done);
  });
});

// Watch for file changes
gulp.task('watch', () => {
  gulp.watch('src/public/js/*.js', gulp.series('scripts'));
  gulp.watch('src/public/js/*.js', gulp.series('clean'));
  gulp.watch('src/public/style/*.scss', gulp.series('styles'));
  gulp.watch('src/public/style/*.scss', gulp.series('clean'));
  gulp.watch('src/views/*.ejs', gulp.series('ejsViews'));
  gulp.watch('src/partials/*.ejs', gulp.series('ejsPartials'));
  gulp.watch('src/public/img/*', gulp.series('images'));
  gulp.watch('.env', gulp.series('copyEnv'));
  gulp.watch('./app.js', gulp.series('express'));
});

gulp.task(
  'dev',
  gulp.series(
    'delDir',
    'scripts',
    'styles',
    'ejsViews',
    'ejsPartials',
    'images',
    'express',
    'copyEnv',
    'server',
    'clean',
    'watch'
  )
);

gulp.task(
  'default',
  gulp.series(
    'delDir',
    'scripts',
    'styles',
    'ejsViews',
    'ejsPartials',
    'images',
    'express',
    'copyEnv',
    'clean',
    'server'
  )
);

gulp.task(
  'build',
  gulp.series(
    'delDir',
    'scripts',
    'styles',
    'ejsViews',
    'ejsPartials',
    'images',
    'express',
    'clean',
    'copyEnv'
  )
);
