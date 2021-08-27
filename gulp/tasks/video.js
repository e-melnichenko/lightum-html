module.exports = function() {
    $.gulp.task('video', function() {
        return $.gulp.src($.path.src.video)
        .pipe($.gulp.dest($.path.build.video))
        .pipe($.browsersync.stream());
    })
}