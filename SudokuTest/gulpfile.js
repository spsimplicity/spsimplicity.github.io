var gulp       = require('gulp'),
    jade       = require('gulp-jade'),
    less       = require('gulp-less'),
    rename     = require('gulp-rename'),
    browserify = require('gulp-browserify');

gulp.task('build-index', function() {
    return gulp
        .src('index.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('build-js', function() {
    return gulp
        .src('javascript/main.js')
        .pipe(browserify({}))
        .pipe(rename('sudoku.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('build-less', function() {
    return gulp
        .src('less/sudoku.less')
        .pipe(less())
        .pipe(gulp.dest('./'));
});

gulp.task('build-all', ['build-index', 'build-js', 'build-less']);