const gulp = require("gulp");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const jshint = require("gulp-jshint");
const notify = require("gulp-notify");
const gulpSass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const prefix = require("gulp-autoprefixer");

const dist = "./dist";

gulp.task("lint", () => {
	return gulp
		.src(["./src/js/functions.js"])
		.pipe(jshint())
		.pipe(jshint.reporter("default"))
		.pipe(notify({ message: "JSHint Complete" }));
});

gulp.task("scripts", () => {
	return gulp
		.src(["./src/js/functions.js"])
		.pipe(babel({ presets: ["@babel/preset-env"] }))
		.pipe(concat("functions.js"))
		.pipe(gulp.dest(dist + "/js/"))
		.pipe(rename({ suffix: ".min" }))
		.pipe(uglify())
		.pipe(gulp.dest(dist + "/js/"))
		.pipe(notify({ message: "Scripts Task Complete" }));
});

gulp.task("sass", () => {
	return gulp
		.src("./src/scss/screen.scss")
		.pipe(gulpSass().on("error", gulpSass.logError))
		.pipe(prefix({ overrideBrowserslist: ["last 2 versions", "ie >= 9"] }))
		.pipe(gulp.dest(dist + "/css/"))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest(dist + "/css/"))
		.pipe(notify({ message: "Sass Task Complete" }));
});

gulp.task("watch", function () {
	gulp.watch("src/js/**/*.js", gulp.series("lint", "scripts"));
	gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
});

gulp.task("default", gulp.series("sass", gulp.parallel("lint", "scripts"), "watch"));
