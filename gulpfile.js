var gulp = require("gulp"),
	ngHtml2Js = require("gulp-ng-html2js"),
	minifyHtml = require("gulp-minify-html"),
	concat = require("gulp-concat"),
	rename = require('gulp-rename'),
	uglify = require("gulp-uglify"),
	gutil = require('gulp-util'),
	cssmin = require('gulp-cssmin'),
	md5 = require('gulp-md5-plus'),
	clean = require('gulp-clean'),
	//spriter = require('gulp-css-spriter'),
	//base64 = require('gulp-css-base64'),
	webpack = require('webpack'),
	webpackConfig = require('./webpack.config.js');

//将图片拷贝到目标目录
gulp.task('copy:images', function (done) {
	gulp.src(['static/img/**/*']).pipe(gulp.dest('dist/img'));
	gulp.src(['static/fonts/*']).pipe(gulp.dest('dist/fonts')).on('end', done);
});

gulp.task('copy:dep', function (done) {
	gulp.src(['static/dep/ie8supports/*.js'])
		.pipe(concat('ie8supports.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/dep'))
		.on('end', done);
});

gulp.task('copy:html', function (done) {
	gulp.src(['static/entry/*.html']).pipe(gulp.dest('./'));
	gulp.src(['static/tpl/**/*.html']).pipe(gulp.dest('dist/tpl')).on('end', done);
});

gulp.task('dep:js' , function (done) {
	// 注意文件合并顺序
	gulp.src([
		'static/dep/jquery/jquery.js',
		'static/dep/angular/angular.js',
		'static/dep/angular/angular-ui-router.js',
		'static/dep/angular/*.js'
		])
		.pipe(concat('lib.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/dep'))
		.on('end', done);
});

gulp.task('concatJs' , function (done) {
	gulp.src('static/js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/js'))
		.on('end', done);
});

gulp.task('concatCss' , function (done) {
	gulp.src('static/css/*.css')
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('dist/css'))
		.on('end', done);
});
//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js'], function (done) {
	gulp.src('dist/js/*.js')
		.pipe(md5(10, 'index.html'))
		//.pipe(uglify())
		.pipe(gulp.dest('dist/js'));

	gulp.src('dist/dep/*.js')
		.pipe(md5(10, 'index.html'))
		//.pipe(uglify())
		.pipe(gulp.dest('dist/dep'))
		.on('end', done);
});

//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', ['sprite'], function (done) {
	gulp.src('dist/css/*.css')
		.pipe(md5(10, 'index.html'))
		.pipe(gulp.dest('dist/css'))
		.on('end', done);
});

//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task('sprite', ['copy:html', 'copy:images', 'copy:dep', 'concatCss'], function (done) {
	var timestamp = +new Date();
	gulp.src('dist/css/*.css')
		//.pipe(spriter({
		//	spriteSheet: 'dist/img/spritesheet' + timestamp + '.png',
		//	pathToSpriteSheetFromCSS: '../img/spritesheet' + timestamp + '.png',
		//	spritesmithOptions: {
		//		padding: 10
		//	}
		//}))
		//.pipe(base64())
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'))
		.on('end', done);
});

gulp.task('clean', function (done) {
	gulp.src(['dist'])
		.pipe(clean())
		.on('end', done);
});

//gulp.task('watch', function (done) {
//	gulp.watch('static/**/*', ['build-js'])
//		.on('end', done);
//});

var myDevConfig = Object.create(webpackConfig);

var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task("build-js", ['html2js', 'concatJs', 'dep:js'], function(callback) {
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-js", err);
		gutil.log("[webpack:build-js]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('html2js', function (done) {
	gulp.src("static/tpl/**/*.html")
		.pipe(minifyHtml({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe(ngHtml2Js({
			moduleName: "mslApp",
			prefix: "/dist/tpl/",
			template: "window.angular.module('mslApp').run(['$templateCache', function($templateCache){\n"
				+"	$templateCache.put('<%= template.url %>', '<%= template.escapedContent %>');\n"
				+"}]);\n",
			export: 'commonjs'
		}))
		.pipe(concat("tpl.js"))
		.pipe(gulp.dest("./static/js/common"))
		.on('end', done);
		//.pipe(uglify())
		//.pipe(rename({suffix: '.min'}))
		//.pipe(gulp.dest("./dist/tpl"));
});

//发布
gulp.task('default', ['md5:css', 'md5:js']);

//开发
//gulp.task('dev', ['html2js', 'copy:images', 'copy:dep', 'build-js', 'watch']);