module.exports = function() {
	$.gulp.task('img', function () {
		return $.gulp.src($.path.src.img)
		.pipe($.imagemin([
			$.imagemin.gifsicle({interlaced: true}),
			$.imagemin.mozjpeg({progressive: true}),
			$.jpegRecompress({
				loops: 5,
				min: 75,
				quality: 'medium'
			}),
			$.imagemin.svgo({
				plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
				]
			}),
			$.imagemin.optipng({optimizationLevel: 3}),
			$.pngQuant({quality: [0.7, 0.90], speed: 5})
			], {
				verbose: true
			})
		)
		.pipe($.gulp.dest($.path.build.img))
		.pipe($.browsersync.stream());
	});

};