'use strict';
//const path = require('path');
global.$ = {
	gulp: require('gulp'),
	browserify: require('browserify'),
	browsersync: require('browser-sync').create(),
	sass: require('gulp-sass'),
	sourcemaps: require('gulp-sourcemaps'),
	autoprefixer: require('gulp-autoprefixer'),
	uglify: require('gulp-uglify'),
	source: require('vinyl-source-stream'),
	streamify: require('gulp-streamify'),
	del: require('del'),
	rename: require('gulp-rename'),
	plumber: require('gulp-plumber'),
	cheerio: require('gulp-cheerio'),
	cleanCSS: require('gulp-clean-css'),
	imagemin: require('gulp-imagemin'),
	jpegRecompress: require('imagemin-jpeg-recompress'),
	pngQuant: require('imagemin-pngquant'),
	replace: require('gulp-replace'),
	svgSprite: require('gulp-svg-sprite'),
	svgmin: require('gulp-svgmin'),
	fileinclude: require('gulp-file-include'),
	uglifyes: require('gulp-uglify-es').default,
	babel: require('gulp-babel'),
	twig: require('gulp-twig'),
	ghPages: require('gh-pages'),

	path: {
		tasks: require('./gulp/config/tasks.js'),
		src: {
			html: 'src/html/page/*.twig',
			sass: 'src/scss/*.scss',
			js: 'src/js/**/*.*',
			fonts: 'src/fonts/**/*.*',
			img: 'src/images/static/**/*.*',
			svg: 'src/images/sprite/*.svg',
			video: 'src/video/**/*.*'
		},
		build: {
			html: 'build/',
			css: 'build/css/',
			js: 'build/js/',
			fonts: 'build/fonts/',
			img: 'build/images/',
			video: 'build/video/'
		},
		watch: {
			html: 'src/html/**/*.twig',
			sass: 'src/scss/**/*.*',
			js: 'src/js/**/*.js',
			img: 'src/img/images/**/*.*',
			svg: 'src/img/sprite/*.svg',
			fonts: 'src/fonts/**/*.*',
			video: 'src/video/**/*.*'
		},
	}
}


$.sass.compiler = require('node-sass');
$.path.tasks.forEach((taskPath) => require(taskPath)());


$.path.tasks.forEach((taskPath) => require(taskPath)());

$.gulp.task('common', $.gulp.series('clean', $.gulp.parallel('html', 'fonts', 'svg')));
$.gulp.task('dev', $.gulp.parallel('sass', 'js', 'img', 'video'));


$.gulp.task('default', $.gulp.series('common', $.gulp.parallel('dev'), $.gulp.parallel('watch', 'localhost')));