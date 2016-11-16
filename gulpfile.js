var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('browserify', function() {
    return browserify('./public/Scripts/index.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/Scripts/bundles/'));
});

gulp.task('watch', function() {
    gulp.watch(['./public/Scripts/**/*.js', '!./public/Scripts/.idea/*', '!./public/Scripts/bundles/*'], ['browserify'])
});

gulp.task('default', ['watch']);