module.exports = function() {
	$.gulp.task('html', function () {
		return $.gulp
			.src($.path.src.html)
			.pipe($.fileinclude())
			.pipe($.browsersync.stream())
			.pipe($.gulp.dest($.path.build.html))
			.pipe($.browsersync.stream());
	});
};