module.exports = function() {
	$.gulp.task('localhost', function() {
		return $.browsersync.init({
            server: {
                baseDir: $.path.build.html,
            },
            port: 3000,
            notify: false,
        })
	});
};