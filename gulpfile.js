var gulp = require('gulp');
var bs = require('browser-sync').create();
var tsc = require("gulp-typescript");
var tsProject = tsc.createProject('tsconfig.json');

var config = {
    source: './src/'
};

config.tsOutputPath = config.source + '/js';
config.allJavaScript = config.source + '/js/**/*.js';
config.allTypeScript = config.source + '/ts/**/*.ts';
config.allHTML = config.source + '/**/*.html';
config.allCSS = config.source + '/**/*.css';
gulp.task('compile-ts', function() {

    var tsResult = gulp.src(config.allTypeScript)
                    .pipe(tsProject());
    tsResult.js.pipe(gulp.dest(config.tsOutputPath ))
});

//compiles typescript on change
gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['compile-ts']);
});

//https://browsersync.io/docs/options

gulp.task('serve', ['compile-ts', 'watch'], function(cb) {
    bs.init({
        port: 8080,
         files: [config.allHTML, config.allJavaScript, config.allCSS],
        server: {
            baseDir: "./src/",
            directory: true
        }
    });

});


gulp.task('default', ['serve']);
