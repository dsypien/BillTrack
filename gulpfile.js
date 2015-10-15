var gulp = require('gulp'),
	watch = require('gulp-watch'),
	browser = require('browser-sync').create(),
	batch = require('gulp-batch'),
 	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
    stripDebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	minify = require('gulp-minify-css'),
	imageOp = require('gulp-image-optimization'),
	clean = require('gulp-clean'),
	jshint = require('gulp-jshint');

gulp.task('default', 
	['build']
);

gulp.task('build', 
	['lint', 'sass', 'compile', 'watch']
);

gulp.task('build-dist', 
	['lint', 'sass-dist', 'compile-dist']
);

gulp.task('clean', function(){
	return gulp.src("public/*")
        .pipe(clean());
});

gulp.task('lint', function(){
	gulp.src(['./public/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('watch', function () {    
    watch(['./app/components/*.js', './app/components/*.html', './app/shared/*.js', './app/**/*.scss'], batch(function (events, done) {
        gulp.start('build', done);
    }));
});

gulp.task('browser-sync', function() {
//    browser.init({
//        proxy: {
//            target: '127.0.0.1:3000'
//        }
//    });
});

gulp.task('compile', ['clean'], function(){
	gulp.src(['./app/app.js', './app/components/*.js', './app/shared/*.js'])
		.pipe(concat('bundled.js'))
		.pipe(gulp.dest('./public'));

	gulp.src(['./app/*.html', './app/shared/*.html', './app/components/*.html'])
		.pipe(gulp.dest('./public'));

	gulp.src(['./app/assets/*'])
		.pipe(gulp.dest('./public/'));
});

gulp.task('compile-dist', ['clean'], function(){
	gulp.src(['./app/app.js', './app/components/*.js', './app/shared/*.js'])
		.pipe(concat('bunled.js'))
		.pipe(uglify())
		.pipe(stripDebug())
		.pipe(gulp.dest('./public'));

	gulp.src(['./app/components/assets/*'])
		.pipe(gulp.dest('./public/assets/'));
});
 
gulp.task('sass', function () {
	gulp.src('./app/**/*.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(concat('bundled.css'))
	    .pipe(gulp.dest('./public'));
});

gulp.task('sass-dist', function () {
	gulp.src('./app/**/*.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(minify())
	    .pipe(concat('bundled.css'))
	    .pipe(gulp.dest('./public'));
});
 
gulp.task('sass:watch', function () {
  	gulp.watch('./sass/**/*.scss', ['sass']);
});