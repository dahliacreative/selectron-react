const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const babelify = require('babelify')
const browserify = require('browserify')
const clean = require('gulp-clean')
const gulp = require('gulp')
const livereload = require('gulp-livereload')
const minifycss = require('gulp-minify-css')
const sass = require('gulp-sass')
const sequence = require('gulp-sequence')
const uglify = require('gulp-uglify')
const vinylBuffer = require('vinyl-buffer')
const vinylSourceStream = require('vinyl-source-stream')

gulp.task('clean', () =>
  gulp.src('lib')
    .pipe(clean())
)

gulp.task('stylesheets', () =>
  gulp.src('src/stylesheets/selectron.sass')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(minifycss())
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('lib'))
    .pipe(livereload())
)

gulp.task('javascript', () =>
  gulp.src('src/javascript/*.js')
    .pipe(babel({
      presets: ['react', 'es2015']
    }))
    .pipe(gulp.dest('lib'))
)

gulp.task('examples', () =>
  browserify({ entries: ['docs/src.js'], debug: true })
    .transform(babelify, { presets: ['react', 'es2015'] })
    .bundle()
    .on('error', (err) => {
      console.log(err)
    })
    .pipe(vinylSourceStream('examples.js'))
    .pipe(vinylBuffer())
    .pipe(uglify())
    .pipe(gulp.dest('docs'))
    .pipe(livereload())
)

gulp.task('watch', () => {
  livereload.listen()
  gulp.watch('src/javascript/*.js', ['javascript'])
  gulp.watch('lib/*.js', ['examples'])
  gulp.watch('src/stylesheets/*.sass', ['stylesheets'])
})

gulp.task('default', sequence('clean', ['stylesheets', 'javascript'], 'examples', 'watch'))