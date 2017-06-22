
// Load plugins
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    sequence = require('gulp-sequence'),
    prefix = require('gulp-autoprefixer');


const dist = './dist';


// JS [Lint JS]
gulp.task('lint', () => {
	return gulp.src(['./src/js/functions.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(notify({ message: 'JSHint Complete' }));
});


// JS [Concat JS to functions.min.js]
gulp.task('scripts', () => {

	return gulp.src([
		'./src/js/functions.js'
	])
	.pipe(babel({presets: ['es2015']}))
	.pipe(concat('functions.js'))
	.pipe(gulp.dest( dist +'/js/'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(uglify())
	.pipe(gulp.dest( dist +'/js/'))
	.pipe(notify({ message: 'Scripts Task Complete' }));
});


// Sass [Compile]
gulp.task('sass', () => {
    gulp.src('./src/scss/screen.scss')
      .pipe(sass())
      .pipe(prefix({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']}))
      .pipe(gulp.dest( dist +'/css/'))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest( dist +'/css/'))
      .pipe(notify({ message: 'Sass Task Complete' }));
});


gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['lint', 'scripts']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
});



// RUN TASKS

// Default task [Watches all scss and .js changes]
gulp.task('default', ['sass', 'lint', 'scripts', 'watch']);
