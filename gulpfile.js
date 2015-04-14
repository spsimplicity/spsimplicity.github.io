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