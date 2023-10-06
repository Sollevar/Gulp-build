const { src, dest, series, watch, parallel } = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const typograf = require('gulp-typograf');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();
const webpackStream = require('webpack-stream');
const svgSprite = require('gulp-svg-sprite');

const path = {  //пути к файлам

    html:{
        src:'src/**/*.html',
        dest:'dist'
    },

    styles:{
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },

    scripts:{
        srcFull:'src/js/**/*.js',
        srcMain: 'src/js/main.js',
        dest: 'dist/js/'
    },

    images:{
        src: 'src/images/*.{jpg,jpeg,png,svg}',
        dest: 'dist/images'
    },

    fonts:{
        src: 'src/fonts/**/*',
        dest: 'dist/fonts'
    },

    svg:{
        src: 'src/images/svg/**.svg',
        dest: 'dist/images/svg'
    }
}

const clean = () => { // отчистка папки чтобы не сжимать изображение повторно
    return del(['dist/*', '!dist/images'])
}

const cleanALL = () => { // отчистка папки полностью
    return del('dist/*')
}

const html = () =>{ // перенос html файлов
    return src(path.html.src)
        .pipe(typograf({
            locale: ['ru', 'en-US']
          }))
        .pipe(dest(path.html.dest))
        .pipe(browserSync.stream())
}

const styles = () => { // обработка стилей
    return src(path.styles.src)
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS({
                level:2
            }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(path.styles.dest))
        .pipe(browserSync.stream())
}

const scripts = () => { //обработка js файлов
    return src(path.scripts.srcMain)
    .pipe(webpackStream(
        {
          mode: 'development',
          output: {
            filename: 'main.js',
          },
          module: {
            rules: [{
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }]
          },
        }
      ))
      .on('error', function (err) {
        console.error('WEBPACK ERROR', err);
        this.emit('end'); // Don't stop the rest of the task
      })
      .pipe(sourcemaps.init())
      .pipe(uglify().on("error", notify.onError()))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(path.scripts.dest))
      .pipe(browserSync.stream())
}

const img = () => {
    return src(path.images.src)
        .pipe(newer(path.images.dest))
        .pipe(imagemin())
        .pipe(dest(path.images.dest))
}

const svgSprites = () =>{
    return src(path.svg.src)
    .pipe(svgSprite({
        mode:{
            stack:{
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest(path.svg.dest))
}

const fonts = () => {
    return src(path.fonts.src)
      .pipe(dest(path.fonts.dest))
      .pipe(browserSync.stream())
  }

const wathFiles = () => { // настройка браузера
    browserSync.init({
        server: {
            baseDir: './dist',
        },
        browser: "chrome"
    })
}

watch(path.html.dest).on('change',browserSync.reload)
watch(path.html.src,html)
watch(path.styles.src, styles)
watch(path.scripts.srcFull, scripts)
watch(path.fonts.src, fonts)
watch(path.svg.src, svgSprites)



exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.img = img
exports.html = html
exports.fonts = fonts
exports.cleanALL = cleanALL
exports.svgSprites = svgSprites

exports.default = series(clean, html, fonts, parallel(styles,scripts), img, svgSprites, wathFiles)
