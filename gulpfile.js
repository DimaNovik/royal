var gulp = require('gulp'), // Gulp
	browserSync = require('browser-sync'), // Browser Sync
	sass = require('gulp-sass'), // Sass,
	concat = require('gulp-concat'), // для конкатенации файлов
	uglify = require('gulp-uglifyjs'), // для сжатия JS
	cssnano = require('gulp-cssnano'), // для минификации CSS
	rename = require('gulp-rename'), // для переименования файлов
	del = require('del'), // для удаления файлов и папок
	imagemin = require('gulp-imagemin'), // для работы с изображениями
	pngquant = require('imagemin-pngquant'), // для работы с png
	cache = require('gulp-cache'), // для кеширования
	htmlPartial = require('gulp-html-partial'),
	autoprefixer = require('gulp-autoprefixer'), // для css префиксов
	sourcemaps = require('gulp-sourcemaps'),
	wait = require('gulp-wait');

gulp.task('browser-sync', function () {
	browserSync({
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('html', function () {
	gulp.src('app/components/*.html')
		.pipe(htmlPartial({
			basePath: 'app/components/template/'
		}))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss')
		.pipe(wait(500))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], {
			cascade: true
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});

gulp.task('css-libs', ['sass'], function () {
	return gulp.src([
			'app/libs/**/*.css'
		])
		.pipe(concat('libs.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});

gulp.task('del-css', ['css-libs'], function () {
	return gulp.src('app/css/style.css')
		.pipe(cssnano())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('app/css'))
});

gulp.task('myscripts', function () {
	return gulp.src([
			'app/js/partials/functions.js',
			'app/js/partials/top_anim.js',
			'app/js/partials/events.js',
		])
		.pipe(concat('script.js'))
		.pipe(gulp.dest('app/js'));
});

gulp.task('scripts', ['myscripts'], function () {
	return gulp.src([
			'app/libs/jquery/jquery.min.js',
			'app/libs/**/*.js',
			'app/js/script.js'
		])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('del-js', ['scripts'], function () {
	return del.sync('app/js/script.js');
});

gulp.task('watch', ['browser-sync', 'del-css', 'html', 'del-js'], function () {
	gulp.watch('app/scss/**/*.scss', ['del-css']);
	gulp.watch('app/components/**/*.html', ['html']);
	gulp.watch('app/js/partials/**/*.js', ['del-js']);
});

gulp.task('clear', function () {
	return cache.clearAll();
});

gulp.task('clean', function () {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('default', ['watch']);