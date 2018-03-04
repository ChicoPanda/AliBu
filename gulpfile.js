var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var image = require('gulp-image');

gulp.task('copyHTML', function(){
    gulp.src('source/index.html').pipe(gulp.dest('./build'));
    gulp.src('source/assets/portfolio/login.html').pipe(gulp.dest('build/assets/portfolio'));
});

gulp.task('copyImages', function(){
    gulp.src('source/assets/img/**/*').pipe(gulp.dest('build/assets/img'));
});

gulp.task('copyCSS', function(){
    gulp.src('source/assets/css/custom/*.css').pipe(gulp.dest('build/assets/css/custom/'));
});

gulp.task('copyFonts', function(){
    gulp.src('source/assets/fonts/**/*').pipe(gulp.dest('build/assets/fonts'));
});

gulp.task('babel', function(){
    gulp.src('source/assets/js/custom/*.js').pipe(babel({presets : ['env']}))
    .pipe(gulp.dest('build/assets/js/custom'));
});

gulp.task('watchFiles', function(){
    gulp.watch('source/index.html', ['copyHTML']);
    gulp.watch('source/assets/portfolio/login.html', ['copyHTML']);
    gulp.watch('source/assets/js/custom/*.js', ['babel']);
    gulp.watch('source/assets/img/*', ['copyImages']);
    gulp.watch('source/assets/css/custom/*', ['copyCSS']);
    gulp.watch('source/assets/fonts/*', ['copyFonts']);
});

gulp.task('clean',function(){
    gulp.src('build/index.html', {read:false}).pipe(clean());
    gulp.src('build/assets/portfolio/login.html', {read:false}).pipe(clean());
    gulp.src('build/assets/js/custom/*', {read:false}).pipe(clean());
    gulp.src('build/assets/css/custom/*', {read:false}).pipe(clean());
});

gulp.task('default', ['clean', 'copyHTML', 'copyCSS', 'copyImages', 'copyFonts', 'babel','watchFiles']);