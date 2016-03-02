var path = require('path');
var gulp = require('gulp');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
 
var src = './src';
var srcLibs = './src/js/vendor/libs/';
var srcApp = './src/js/app/';
var dest = './bin-debug';
var assets = ['img', 'fonts', 'pecas', 'downloads'];
 
 
gulp.task('build', build);

 
gulp.task('default', function() { 
    build(); 

    assets.forEach(watch);
    
    gulp.watch(path.join(src,'/sass/**/*.scss'),generateSass);
    gulp.watch(path.join(src, '/js/**/*.*'), js); 
    gulp.watch(path.join(src, '/js/vendor/**/*.*'), libjs);
    gulp.watch(path.join(dest, '/**/*.*'));
    gulp.watch(path.join(dest, '/*.php'));
    gulp.watch(path.join(dest, '/*.html')).on('change', livereload.changed);

    livereload.listen();
});

  
function build() {
  generateSass();
  assets.forEach(copy);
  js();
  libjs();

} 
 
function copy(name) {
  gutil.log('Copying: ' + name);
  gulp.src(path.join(src, name, '/**/*.*')).pipe(gulp.dest(dest + '/' + name));
}
 
function watch(name) {
  var dir = path.join(src, name, '/**/*.*');
  gulp.watch(dir, function() {
    copy(name);
  }).on('change', livereload.changed);
 }
 
function js() {
  var file = 'application.js';
  gutil.log('Generating: ' + file);

  gulp.src([
    
    path.join(srcApp, 'main.js')

  ]).pipe(concat(file)).pipe(gulp.dest(dest + "/js"));

}
  
function libjs() {
  var file = 'application.lib.js';
  gutil.log('Generating: ' + file);
  gulp.src([
    path.join(srcLibs, 'jquery/dist/jquery.js'),
    path.join(srcLibs, 'modernizr/modernizr.js'),
    // path.join(srcLibs, 'underscore/underscore.js'),
    path.join(srcLibs, 'html5shiv/dist/html5shiv.js'),
    path.join(srcLibs, 'bxslider/jquery.easing.1.3.js'),
    path.join('./src/js/vendor/', 'selectordie.js'), 
    path.join('./src/js/vendor/', 'jquery-ui.min.js') 

  ]).pipe(concat(file)).pipe(gulp.dest(dest + "/js"));
}

function generateSass() {
  gutil.log('Generating Sass...');

 
  gulp.src(path.join(src,'/sass/**/*.scss'))
    .pipe(plumber())
    .pipe(sass({
      onSuccess: function(){
        gutil.log("Sass generated")
        // copy("css");
      },      
      style: 'expanded',
      sourceComments: 'normal'
    
    }))
    .pipe(gulp.dest(path.join(dest,'/css')));
}