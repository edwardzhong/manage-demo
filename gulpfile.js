var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var concatCss = require('gulp-concat-css');// 合并css
var cleanCSS = require('gulp-clean-css');// 压缩css
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concatJS = require('gulp-concat'); //合并js
var uglify =require('gulp-uglify');//压缩js
var rename = require('gulp-rename');
var swig = require('gulp-swig');

//清除输出文件夹
gulp.task('clean', function(cb) {
    return del(['./dist'], cb);
});

//复制公共库目录下的所有内容
gulp.task('copy',function(){
    return gulp.src('./lib/**')
        .pipe(gulp.dest('./dist/lib/'));
});
gulp.task('img',function(){
    return gulp.src('./img/**').pipe(gulp.dest('./dist/img'));
});
gulp.task('index',function(){
    return gulp.src('./index.html').pipe(gulp.dest('./dist/'));
});

//编译css，添加兼容后缀，压缩
gulp.task('css', function() {
    return gulp.src('./less/*.less')
        .pipe(less())
        // .pipe(concatCss("index.css"))
        .pipe(postcss([ autoprefixer({
                "browsers": ["last 2 version", "> 0.5%", "ie 6-8","Firefox < 20"]
                // "browsers": ["last 2 version", "> 0.1%"]
            })
        ]))
        .pipe(cleanCSS())
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'));
});

// gulp.task('js',function(){
//     return gulp.src('./js/*.js')
//         .pipe(concatJS('index.js'))
//         .pipe(uglify())
//         .pipe(rename({suffix: '.min'}))
//         // .pipe(gulp.dest('./dist/js'));

//         .pipe(rev())
//         .pipe(gulp.dest('./dist/js'))
//         .pipe(rev.manifest())
//         .pipe(gulp.dest('./rev/js'));
// });

//swig编译输出html
gulp.task('html', function() {
    //!表示排除匹配到的内容
  return gulp.src(['./pages/*.html','!./pages/layout.html'])
    .pipe(swig({
        defaults: {cache: false }
    }))
    .pipe(gulp.dest('./dist/pages'))
});

gulp.task("default", ['copy','img','index','css','html']);
