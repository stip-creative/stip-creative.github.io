const syntax        = 'scss'; // Syntax: sass or scss;
const gulpversion   = '4'; // Gulp version: 3 or 4

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const pump = require('pump');
const babel = require('gulp-babel');
const fileinclude = require('gulp-file-include');

// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'build'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat('main.min.css'))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.stream())
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/slick/slick/slick.min.js',
        'app/js/common.js', // Always at the end
		'app/js/lazyLoad.js',
    ])
    .pipe(babel({presets: ["@babel/preset-env"]}))
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) 
	.pipe(gulp.dest('build/js/'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function() {
	return gulp.src([
        'app/index.html',
        'app/contacts.html',
        'app/privacy-policy.html',
        '!privacy-policy-text.html',
        'app/terms-of-use.html',
        '!terms-of-use-text.html',
        '!header.html', // ignore
        '!footer.html' // ignore
    ])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
	.pipe(gulp.dest('build/'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('image', function () {
    gulp.src('app/img/**/*.*') //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('build/img/')) //И бросим в build
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('fonts', function() {
    gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts/'))
});

gulp.task('libs', function() {
    gulp.src('app/libs/**/*.*')
        .pipe(gulp.dest('build/libs/'))
});

gulp.task('uglify-error-debugging', function (cb) {
  pump([
    gulp.src('app/**/*.js'),
    uglify(),
    gulp.dest('./dist/')
  ], cb);
});

if (gulpversion == 4) {
	gulp.task('watch', function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
		gulp.watch('app/js/*.js', gulp.parallel('scripts'));
		gulp.watch('app/*.html', gulp.parallel('html'))
		gulp.watch('src/img/**/*.*', gulp.parallel('image'))
		gulp.watch('src/fonts/**/*.*', gulp.parallel('fonts'))
		gulp.watch('libs/**/*.js', gulp.parallel('libs'))

	});
	gulp.task('default', gulp.parallel('styles', 'scripts', 'html', 'image', 'fonts', 'libs', 'browser-sync', 'watch'));
}