var gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    autoprefixer    = require('gulp-autoprefixer'),
    cleanCSS        = require('gulp-clean-css'),
    uglify          = require('gulp-uglify'),
    del             = require('del'),
    browserSync     = require('browser-sync').create(),
    sass            = require('gulp-sass'),
    rename          = require("gulp-rename"),
    notify          = require("gulp-notify"),
    htmlPartial     = require('gulp-html-partial');

sass.compiler = require('node-sass');

const jsFiles = [
    'app/js/libs/jquery-3.4.1.min.js',
    'app/js/libs/bootstrap.bundle.min.js',
    'app/js/libs/slick.min.js',
    'app/js/libs/fotorama.js',
    'app/js/libs/jquery.zoom.min.js',
    'app/js/libs/jquery.rateyo.min.js',
    'app/js/libs/jquery.formstyler.min.js',
    'app/js/libs/jquery.magnific-popup.min.js',
    'app/js/common.js'
]

//Task includeHTML
function includeHTML() {
    return gulp.src('app/*.html', 'app/partials/*.html')
        .pipe(htmlPartial({
            basePath: 'app/'
        }))
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
}

//Task to CSS
function styles() {
    return gulp.src('app/css/all.scss')
        .pipe(sass())
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error SCSS"
        }))
        .pipe(autoprefixer({ cascade: true }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
}

//Task to JS
function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream())
}

//Task to Image

function image() {
    return gulp.src('app/images/**/*')
        .pipe(gulp.dest('./dist/images'))
}


function clean() {
    return del([
        'dist/*',
        'prod/*'
    ])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
    });
    gulp.watch('app/css/**/*.scss', styles)
    gulp.watch(['app//js/libs/**/*.js', 'app/js/common.js'], scripts)
    gulp.watch('app/partials/*.html', includeHTML)
    gulp.watch('app/images/**/*', image)
    gulp.watch("app/index.html", includeHTML).on('change', browserSync.reload)
}

//build project
function buildCSS() {
    return gulp.src('./app/css/all.scss')
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(autoprefixer({ cascade: true }))
        .pipe(cleanCSS({level: 2}))
        .pipe(gulp.dest('./prod/css'))
}

function buildJS() {
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./prod/js'))
}

function buildHTML() {
    return gulp.src('app/*.html', 'app/partials/*.html')
        .pipe(htmlPartial({
            basePath: 'app/'
        }))
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./prod'))
}
function buildFonts() {
    return gulp.src('./app/fonts/*')
        .pipe(gulp.dest('./prod/fonts'))
}

function buildImage() {
    return gulp.src('app/images/**/*')
        .pipe(gulp.dest('./prod/images'))
}

gulp.task('default', gulp.series(clean, gulp.parallel(includeHTML, styles, scripts, watch, image)));
gulp.task('build', gulp.series(clean, gulp.parallel(buildHTML, buildCSS, buildJS, buildFonts, buildImage)));



