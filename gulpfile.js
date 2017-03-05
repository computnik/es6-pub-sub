/**
 * Created by nikhil.m on 3/5/2017.
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const babelOptions = JSON.parse(require('fs').readFileSync(__dirname + '/.babelrc', 'utf8'));

gulp.task('build', () => {
  return gulp.src('src/index.js')
    .pipe(babel(babelOptions))
    .pipe(gulp.dest('dist'));
});
