module.exports = function() {
	$.gulp.task('sass', function () {
		return $.gulp
			.src($.path.src.sass)
			.pipe($.plumber())
//			.pipe($.sourcemaps.init())
			.pipe($.sass({outputStyle: 'expanded'}).on('error', $.sass.logError))
			.pipe($.autoprefixer(['last 4 versions']))
			.pipe($.gulp.dest($.path.build.css))
			.pipe($.cleanCSS())
//			.pipe($.sourcemaps.write('./'))
			.pipe($.rename({ suffix: '.min' }))
			.pipe($.gulp.dest($.path.build.css))
			.pipe($.browsersync.stream())
	});
	
};
