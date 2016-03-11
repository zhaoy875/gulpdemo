
// gulp-autoprefixer任务模板

//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less');                     //将less转换为css
    autoprefixer = require('gulp-autoprefixer');     //处理css前缀
    cssmin = require('gulp-minify-css');             //css压缩换行 优化选择器等
    cssver = require('gulp-make-css-url-version');   //css 引用文件加MD5后缀
    imagemin = require('gulp-imagemin');             //图片压缩 http://www.ydcss.com/archives/26

//定义一个testLess任务（自定义任务名称）
gulp.task('autorun', function () {
    //所需处理的对象文件
    gulp.src('dev/css/layout.css'),
    gulp.src('dev/css/downapp.css'),
    gulp.src('dev/css/common.css') 

    //下面是具体调用
        .pipe(autoprefixer({           //该任务调用的模块
            browsers: ['last 2 versions', 'Android >= 2.3'],
            cascade: true, //是否美化属性值 默认：true 像这样对齐：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))


        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true //类型：Boolean 默认：false [是否保留换行]
        }))


        .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）

        // .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('dist/css'));  //将会在src/css下生成新处理过后的css文件

        // 下面是任务2
         // gulp.src('src/less/index.less') //该任务针对的文件
        
        // .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
});

/*!
   Important comments included in minified output.
    这里是多段注释
*/

//    gulp-autoprefixer的browsers参数详解 （传送门）：
// ● last 2 versions: 主流浏览器的最新两个版本
// ● last 1 Chrome versions: 谷歌浏览器的最新版本
// ● last 2 Explorer versions: IE的最新两个版本
// ● last 3 Safari versions: 苹果浏览器最新三个版本
// ● Firefox >= 20: 火狐浏览器的版本大于或等于20
// ● iOS 7: IOS7版本
// ● Firefox ESR: 最新ESR版本的火狐
// ● > 5%: 全球统计有超过5%的使用率




// 第二个任务

gulp.task('imagesmini', function () {
    gulp.src('dev/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});



gulp.task('default',['imagesmini,autorun']); //定义默认任务,直接输入gulp就可以运行任务了

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径