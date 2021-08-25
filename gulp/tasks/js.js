module.exports = function() {
	$.gulp.task('js', function () {
		return $.gulp
			.src($.path.src.js)
			.pipe($.babel({
				presets: ['@babel/env']
			}))
			.pipe($.gulp.dest($.path.build.js))
			.pipe($.uglifyes())
			.pipe($.rename({ suffix: '.min' }))
			.pipe($.gulp.dest($.path.build.js))
			.pipe($.browsersync.stream());
	});
};