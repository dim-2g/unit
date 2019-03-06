'use strict';

// Подключение плагинов
var gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    copy = require('gulp-contrib-copy'),
    preprocess = require('gulp-preprocess'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    merge = require('merge-stream'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    rigger = require('gulp-rigger'),
    useref = require('gulp-useref'),
    plumber = require('gulp-plumber'),
    cssmin = require('gulp-cssmin'),
    fontgen = require('gulp-fontgen');

// Пути для сборки
var path = {
    build: {
        root: 'public/',
        js: 'public/assets/template/js/',
        fonts: 'public/assets/template/fonts/',
        rjs: 'build.js',
        css: 'public/assets/template/css/',
        img: 'public/assets/template/images/',
        sprites: 'public/assets/template/img/sprites/',
        vendor_css: 'public/assets/template/vendor/',
        vendor_js: 'public/assets/template/vendor/',
    },
    src: {
        root: 'src/',
        html: 'src/assets/template/html/*.html',
        js: 'src/assets/template/js/**/*.js',
        fonts: 'src/assets/template/fonts/**/*.*',
        rjs: 'src/assets/template/js/',
        scripts: 'src/assets/template/scripts/**/*.js',
        sass: 'src/assets/template/css/main.scss',
        css: 'src/assets/template/css/',
        img: 'src/assets/template/images/**/*.*',
        lib: '../lib/',
        tpl: '../tpl/',
        sprites: 'src/assets/template/sprites/*.*',
        vendor_css: [
            'src/assets/template/vendor/slick/slick.css',
            'src/assets/template/vendor/slick/slick-theme.css',
            'src/assets/template/vendor/magnific-popup/magnific-popup.css',
            'src/assets/template/vendor/fancybox/jquery.fancybox.min.css'
        ],
        vendor_js: [
            'src/assets/template/vendor/jquery-3.2.1.min.js',
            'src/assets/template/vendor/slick/slick.js',
            'src/assets/template/vendor/magnific-popup/magnific-popup.js',
            'src/assets/template/vendor/fancybox/jquery.fancybox.min.js',
            'src/assets/template/vendor/jquery.inputmask.bundle.js',
            'src/assets/template/vendor/circles.min.js',
        ]
    },
    dev: {
        sprites: 'src/assets/template/css/sprites/'
    },
    watch: {
        html: 'src/assets/template/html/**/*.html',
        sass: 'src/assets/template/css/**/*.scss',
        js: 'src/assets/template/js/**/*.js',
        tpl: 'src/assets/template/tpl/**/*.html',
        sprites: 'src/assets/template/sprites/*.*'
    },
    clean: ['public', 'src/assets/template/css/main.css', 'src/assets/template/css/sprites/', 'src/assets/template/*.html']
};

// Конфиги для локального вебсервера
var webserver = {
    dev: {
        server: {
            baseDir: './src'
        },
        tunnel: false,
        host: 'localhost',
        port: 9001,
        logPrefix: 'app_dev'
    },
    prod: {
        server: {
            baseDir: './public'
        },
        tunnel: true,
        host: 'localhost',
        port: 9002,
        logPrefix: 'app_prod'
    }
};

// Очистка папок и файлов
gulp.task('clean', function() {
    return gulp.src(path.clean, {read: false})
        .pipe(clean());
});

// Компиляция sass, сборка стилей
// development
gulp.task('sass:dev', function() {
    console.log('sass...');
    return gulp.src(path.src.sass)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.src.css))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass2:dev', function() {
    return gulp.src(path.src.sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(path.src.css))
        .pipe(browserSync.reload({stream: true}));
});

// production
gulp.task('sass:prod', ['sprite:prod'], function() {
    return gulp.src(path.src.sass)
        .pipe(sass())
        //сохраняем в css
        .pipe(gulp.dest(path.build.css))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        //сохраняем и минифицированную версию
        .pipe(gulp.dest(path.build.css));
});

// Оптимизация изображений
gulp.task('img', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('img:prod', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});

// Склеивание сторонних скриптов
gulp.task('scripts', function() {
    return gulp.src(path.src.scripts)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('js:prod', function() {
    return gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js));
});

gulp.task('vendor:js', function () {
    return gulp.src(path.src.vendor_js)
        .pipe(uglify())
        .pipe(concat('combined.min.js'))
        .pipe(gulp.dest(path.build.vendor_js));
});


gulp.task('vendor:css', function () {
    return gulp.src(path.src.vendor_css)
        .pipe(concat('combined.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.vendor_css));
});


// Препроцессинг html
// development
gulp.task('html:dev', function() {
    gulp.src(path.src.html)
        .pipe(rigger()) //Прогоним через rigger
        .pipe(preprocess({context: {NODE_ENV: 'development', DEBUG: true}}))
        .pipe(gulp.dest(path.src.root))
        .pipe(browserSync.reload({stream: true}));
});

// production
gulp.task('html:prod', function() {
    gulp.src(path.src.html)
        .pipe(rigger()) //Прогоним через rigger
        .pipe(preprocess({context: {NODE_ENV: 'production', DEBUG: true}}))
        .pipe(gulp.dest(path.build.root))
});

gulp.task('fonts:prod', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('sprite:dev', function () {
  var spriteData = gulp.src(path.src.sprites).pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '/assets/template/css/sprites/sprite.png',
    cssName: 'sprite.scss'
  }));
  var imgStream = spriteData.img
    //.pipe(buffer())
    //.pipe(imagemin())
    .pipe(gulp.dest(path.dev.sprites));

  var cssStream = spriteData.css
    //.pipe(csso())
    .pipe(gulp.dest(path.dev.sprites));
  return merge(imgStream, cssStream);
  //return spriteData.pipe(gulp.dest(path.tmp.sprites));
});

gulp.task('sprite:prod', function () {
  var spriteData = gulp.src(path.src.sprites).pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '/assets/template/img/sprites/sprite.png',
    cssName: 'sprite.scss'
  }));
  var imgStream = spriteData.img
    //.pipe(buffer())
    //.pipe(imagemin())
    .pipe(gulp.dest(path.build.sprites));

  var cssStream = spriteData.css
    //.pipe(csso())
    .pipe(gulp.dest(path.dev.sprites));
  return merge(imgStream, cssStream);
  //return spriteData.pipe(gulp.dest(path.tmp.sprites));
});



// watch-таска
gulp.task('watch', function(){
    watch(["design/css/media.scss"], function(event, cb) {
        console.log('изменен');
    });
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:dev');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('sass:dev');
    });
    watch([path.watch.sprites], function(event, cb) {
        gulp.start('sprite:dev');
    });
    watch([path.watch.js, path.watch.tpl]).on('change', browserSync.reload);
});

// Запуск локального веб-сервера
// development
gulp.task('webserver:dev', function () {
    browserSync(webserver.dev);
});

// production
gulp.task('webserver:prod', function () {
    browserSync(webserver.prod);
});


// Режим разработки
gulp.task('develop', gulpsync.sync([
    'clean',
    'sprite:dev',
    [
        'html:dev',
        'sass:dev'
    ],
    'watch',
    'webserver:dev'
]));

gulp.task('develop2', gulpsync.sync([
    'clean',
    'sprite:dev',
    [
        'html:dev',
        'sass2:dev'
    ],
    'watch',
    'webserver:dev'
]));

// Режим production
gulp.task('production', gulpsync.sync([
    'clean',
    [
        'html:prod',
        'fonts:prod',
        'sass:prod',
        'vendor:css',
        'vendor:js',
        'img:prod',
        'js:prod',
        //'scripts:prod'
    ],
    'webserver:prod'

]));

gulp.task('fontgen', function() {
  return gulp.src("src/assets/template/fonts/*.{ttf,otf}")
    .pipe(fontgen({
      dest: "src/assets/template/fonts/"
    }));
});