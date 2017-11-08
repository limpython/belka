var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    buffer = require('vinyl-buffer'),
    imagemin = require('gulp-imagemin'),
    spritesmith = require('gulp.spritesmith'),
    path = require('path'),
    merge = require('merge-stream'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('js', function () {
    return gulp.src(['./js/jquery-3.2.1.min.js', './js/slick.min.js', './js/index.js'])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('sprite', function () {
    // Generate our spritesheet
    var spriteData = gulp.src('./img/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../img/sprite.png',
        cssName: '_sprite.scss',
        cssTemplate: 'scss/scss.template.handlebars'
    }));

    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('./img'));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
        .pipe(gulp.dest('./scss'));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['scss']);
    gulp.watch('./js/**/*.js', ['js']);
    gulp.watch('./img/icons/**/*.png', ['sprite']);
});
