var config = require('./gulp/config');

var postcss = require('gulp-postcss');
var gulp = require('gulp');
var rimraf = require('rimraf');
var stylelint = require('stylelint');
var plumber = require('gulp-plumber');
var doiuse = require('doiuse')
var precss = require('precss');
var cssnano = require('cssnano');
var cssnext = require('postcss-cssnext');
var bemLinter = require('postcss-bem-linter');

gulp.task('clean', function(cb) {
    rimraf(config.general.dest, cb);
});

gulp.task('styles', function (done) {
    var browserSupport = {
        browsers: ['ie >= 10'],
        ignoreFiles: ['**/normalize.css']
    };

    var processors = [
        precss(),
        cssnext(),
        stylelint(),
        bemLinter('bem', {
            namespace: 'foo'
        }),
        doiuse(browserSupport),
        cssnano()
    ];

    return gulp.src(config.styles.src)
        .pipe(plumber())
        .pipe(postcss(processors))
        .on('error', done)
        .pipe(gulp.dest(config.styles.dest));
});

gulp.task('watch', function(){
    gulp.watch(config.styles.src, ['styles']);
});

gulp.task('default', ['clean', 'styles', 'watch']);
