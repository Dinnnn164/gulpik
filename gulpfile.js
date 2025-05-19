const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function styles() {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('dist/js/**/*.js').on('change', browserSync.reload);
}

exports.default = gulp.series(styles, serve);