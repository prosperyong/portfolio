'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


function buildCss() {
    return gulp.src('./src/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/css/'))
        .pipe(autoprefixer([
            "last 1 major version",
            ">= 1%",
            "Chrome >= 45",
            "Firefox >= 38",
            "Edge >= 12",
            "Explorer >= 10",
            "iOS >= 9",
            "Safari >= 9",
            "Android >= 4.4",
            "Opera >= 30"
        ], { cascade: true }))
        .pipe(browserSync.stream());
};

function buildJs() {
    return gulp.src('./src/assets/js/**/*.js')
        .pipe(sourcemaps.write())

    .pipe(gulp.dest('./dist/assets/js/'))
};

function copyVendors() {
    return gulp
        .src([
            './node_modules/*aos/**/*',
            './node_modules/*typed.js/**/*',
        ])
        .pipe(gulp.dest('./dist/assets/vendor/'))
};

function copyBootstrapIcon() {
    return gulp
        .src([
            './node_modules/bootstrap-icons/**/*',
        ])
        .pipe(gulp.dest('./dist/assets/vendor/bootstrap-icons'))
};
exports.buildCss = buildCss;
exports.buildJs = buildJs;
exports.copyBootstrapIcon = copyBootstrapIcon;
exports.copyVendors = copyVendors;
exports.watch = function() {
    browserSync.init({
        files: "./*.html",
        startPath: "/html/",
        server: {
            baseDir: './dist'
        }
    })
    gulp.watch('./src/assets/sass/**/*.scss', buildCss);
    gulp.watch('./src/assets/js/**/*.js', buildJs);
    gulp.watch('./dist/html/*.html').on('change', browserSync.reload);

};