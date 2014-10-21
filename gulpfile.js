var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	config = {
		srcPath: './src',
		destPath: './public/assets'
	};

gulp.task('images', function() {
	gulp.src(config.srcPath + '/images/**/*')
		.pipe(gulp.dest(config.destPath + '/images'));
});

gulp.task('scripts', function() {
	gulp.src(config.srcPath + '/scripts/**/*')
		.pipe(gulp.dest(config.destPath + '/js'));
});

gulp.task('jshint', function() {
	gulp.src([config.srcPath + '/scripts/*', config.srcPath + '/scripts/app/**/*', config.srcPath + '/scripts/lib/**/*'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('styles', function () {
    gulp.src(config.srcPath + '/styles/**/*')
        .pipe(sass())
        .pipe(gulp.dest(config.destPath + '/css'));
});

gulp.task('watch', function() {
	gulp.watch([config.srcPath + '/scripts/**/*'], ['jshint', 'scripts']);
	gulp.watch([config.srcPath + '/styles/**/*'], ['styles']);
	gulp.watch([config.srcPath + '/images/**/*'], ['images']);
});

gulp.task('default', ['jshint', 'scripts', 'styles', 'images']);