const	gulp         = require('gulp'), // Подключаем Gulp
		sass         = require('gulp-sass'), //Подключаем Sass пакет,
		browserSync  = require('browser-sync'), // Подключаем Browser Sync
		concat       = require('gulp-concat'), // Подключаем gulp-concat (соединение файлов)
		uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
		sourcemaps   = require('gulp-sourcemaps'), // Подключаем sourcemaps
		cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
		rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
		del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
		imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
		cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
		autoprefixer = require('gulp-autoprefixer'),// Подключаем autoprefixer
		gcmq         = require('gulp-group-css-media-queries');// Подключаем gulp-group-css-media-queries

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('./app/scss/main.scss') // Берем источник
		.pipe(sourcemaps.init()) // Инициируем sourcemaps
		.pipe(sass().on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(gcmq()) // Группируем медиа-запросы
		.pipe(autoprefixer({
			browsers: ['last 15 versions', '> 1%', 'ie 8'],
			cascade: true
		})) // Создаем префиксы
		.pipe(sourcemaps.write('.')) // Создаем файл .map
		.pipe(gulp.dest('./app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.stream()); // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync.init({ // Выполняем browserSync
		server: './app', // Указываем директорию с файлами проекта - app
        // proxy: "my-site.dev", // Или указываем домен, если сайт на PHP(openserver, xampp и т.д.)
		notify: false // Отключаем уведомления
	});
});

gulp.task('js-libs', function() {
	return gulp.src('./app/libs/**/*.js') // Берем все js библиотеки
		.pipe(sourcemaps.init()) // Инициируем sourcemaps
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(sourcemaps.write('.')) // Создаем файл .map
		.pipe(gulp.dest('./app/js')); // Выгружаем в папку app/js
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('./app/css/libs.css') // Выбираем файл для минификации
		.pipe(sourcemaps.init()) // Инициируем sourcemaps
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(sourcemaps.write('.')) // Создаем файл .map
		.pipe(gulp.dest('./app/css')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 'css-libs', 'js-libs'], function() { //
	gulp.watch('./app/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('./app/**/*.php', browserSync.reload); // Наблюдение за PHP файлами
	gulp.watch('./app/**/*.html', browserSync.reload); // Наблюдение за HTML файлами
	gulp.watch('./app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('./owlcarousel'); // Удаляем папку owlcarousel перед сборкой
});

gulp.task('img', function() {
	return gulp.src('./app/img/**/*') // Берем все изображения из app
		.pipe(imagemin([   //Сжимаем их с наилучшими настройками с учетом кеширования
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.on('error', console.log)
		.pipe(gulp.dest('./owlcarousel/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'js-libs', 'sass'], function() {
	gulp.src('./app/css/**/*.css')
	.pipe(cssnano())
	.pipe(gulp.dest('./owlcarousel/css')); // Переносим css в продакшн
	
	gulp.src('./app/fonts/**/*')
	.pipe(gulp.dest('./owlcarousel/fonts')); // Переносим шрифты в продакшн
	
	gulp.src('./app/js/**/*')
	.pipe(uglify())
	.pipe(gulp.dest('./owlcarousel/js')); // Переносим скрипты в продакшн
	
	gulp.src('./app/**/*.php')
	.pipe(gulp.dest('./owlcarousel')); // Переносим php в продакшн
	
	gulp.src('./app/**/*.html')
	.pipe(gulp.dest('./owlcarousel')); // Переносим html в продакшн
	
	gulp.src('./app/.htaccess')
	.pipe(gulp.dest('./owlcarousel')); // Переносим .htaccess в продакшн
	
});

gulp.task('clear', function () {
	return cache.clearAll();
});

gulp.task('default', ['watch']);

// gulp - отслеживание изменений всех файлов (watch) и browserSync
// gulp watch - в данной сборке тоже что и gulp
// gulp build - сборка нужных файлов готового проекта в ./owlcarousel
// gulp clear - очистить кэш
// gulp img - сжатие и перенос всех изображений в ./owlcarousel
// gulp clean - удаление папки ./owlcarousel
// gulp sass - преобразование scss в css с префиксами и файлом .map
// gulp browser-sync - запуск browser-sync
// gulp css-libs - минифицируем выбранный файл в папку ./app/css
// gulp js-libs - соединение всех js-библиотек в новый файл в папку ./app/js
