"use strict";

const { src, dest } = require("gulp");
const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const notify = require("gulp-notify");
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const panini = require('panini');
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require("browser-sync").create();


/* Paths */
const srcPath = 'src/';
const distPath = 'dist/';

const path = {
	build: {
		html: distPath,
		css: distPath + "assets/css/",
		js: distPath + "assets/js/",
		images: distPath + "assets/images/",
		fonts: distPath + "assets/fonts/"
	},
	src: {
		html: srcPath + "*.html",
		css: srcPath + "assets/scss/*.scss",
		js: srcPath + "assets/js/*.js",
		images: srcPath + "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
		fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
	},
	watch: {
		html: srcPath + "**/*.html",
		css: srcPath + "assets/scss/**/*.scss",
		js: srcPath + "assets/js/**/*.js",
		images: srcPath + "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
		fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
	},
	clean: "./" + distPath
}

/* Tasks */
function server() {
	setTimeout(() => {
		browserSync.init({
			watch: true,
			server: {
				baseDir: "./" + distPath,
			}
		})
	}, 2000);
}

function html(cb) {
	panini.refresh();
	return src(path.src.html, { base: srcPath })
		.pipe(plumber())
		.pipe(panini({
			root: srcPath,
			layouts: srcPath + 'layouts/',
			partials: srcPath + 'partials/',
			helpers: srcPath + 'helpers/',
			data: srcPath + 'data/'
		}))
		.pipe(dest(path.build.html))
		.pipe(browserSync.reload({ stream: true }));

	cb();
}

function css(cb) {
	return src(path.src.css, { base: srcPath + "assets/scss/" })
		.pipe(plumber({
			errorHandler: function (err) {
				notify.onError({
					title: "SCSS Error",
					message: "Error: <%= error.message %>"
				})(err);
				this.emit('end');
			}
		}))
		.pipe(sass({
			includePaths: './node_modules/'
		}))
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest(path.build.css));

	cb();
}

function js(cb) {
	return src(path.src.js, { base: srcPath + 'assets/js/' })
		.pipe(plumber({
			errorHandler: function (err) {
				notify.onError({
					title: "JS Error",
					message: "Error: <%= error.message %>"
				})(err);
				this.emit('end');
			}
		}))
		.pipe(webpack({
			mode: "production",
			output: {
				filename: 'index.js',
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						},
					},
					{
						test: /\.css$/i,
						use: ["style-loader", "css-loader"],
					},
				]
			},
		}))
		.pipe(dest(path.build.js))
		.pipe(browserSync.reload({ stream: true }));

	cb();
}

function images(cb) {
	return src(path.src.images)
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 80, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest(path.build.images))
		.pipe(browserSync.reload({ stream: true }));

	cb();
}

function fonts(cb) {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
		.pipe(browserSync.reload({ stream: true }));

	cb();
}

/* Task watchs */
function cssWatch(cb) {
	return src(path.src.css, { base: srcPath + "assets/scss/" })
		.pipe(plumber({
			errorHandler: function (err) {
				notify.onError({
					title: "SCSS Error",
					message: "Error: <%= error.message %>"
				})(err);
				this.emit('end');
			}
		}))
		.pipe(sass({
			includePaths: './node_modules/'
		}))
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest(path.build.css))
		.pipe(browserSync.reload({ stream: true }));

	cb();
}

function jsWatch(cb) {
	return src(path.src.js, { base: srcPath + 'assets/js/' })
		.pipe(plumber({
			errorHandler: function (err) {
				notify.onError({
					title: "JS Error",
					message: "Error: <%= error.message %>"
				})(err);
				this.emit('end');
			}
		}))
		.pipe(webpack({
			watch: true,
			mode: "development",
			output: {
				filename: 'index.js',
			}
		}))
		.pipe(dest(path.build.js))
		.pipe(browserSync.reload({ stream: true }));

	cb();
}

function clean(cb) {
	return del(path.clean);

	cb();
}


function watchFiles(cb) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], cssWatch);
	gulp.watch([path.watch.js], jsWatch);
	gulp.watch([path.watch.images], images);
	gulp.watch([path.watch.fonts], fonts);

	cb();
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles, server);

/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;