'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function buildCss() {
    return gulp.src('./src/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./assets/css/'))
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

function copyVendors() {
    return gulp
        .src([
            './node_modules/*aos/**/*',
            './node_modules/*bootstrap/**/*',
            './node_modules/*bootstrap-select/**/*',
            './node_modules/*chart.js/**/*',
            './node_modules/*clipboard/**/*',
            './node_modules/*datatables/**/*',
            './node_modules/*dropzone/**/*',
            './node_modules/*flag-icon-css/**/*',
            './node_modules/*flatpickr/**/*',
            './node_modules/*ion-rangeslider/**/*',
            './node_modules/*jquery/**/*',
            './node_modules/*jquery-countdown/**/*',
            './node_modules/*jquery-migrate/**/*',
            './node_modules/*jquery-validation/**/*',
            './node_modules/*leaflet/**/*',
            './node_modules/*popper.js/**/*',
            './node_modules/*pwstrength-bootstrap/**/*',
            './node_modules/*slick-carousel/**/*',
            './node_modules/*summernote/**/*',
            './node_modules/*tagify/**/*',
            './node_modules/*typed.js/**/*',
        ])
        .pipe(gulp.dest('./docs/assets/vendor/'))
};

function copyFontAwesome() {
    return gulp
        .src([
            './node_modules/@fortawesome/fontawesome-free/**/*',
        ])
        .pipe(gulp.dest('./docs/assets/vendor/font-awesome'))
};
exports.buildCss = buildCss;
exports.copyFontAwesome = copyFontAwesome;
exports.copyVendors = copyVendors;
exports.watch = function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
    gulp.watch('./src/assets/sass/**/*.scss', buildCss);
    gulp.watch('./dist/html/*.html').on('change', browserSync.reload);

};