const del = require('del');
const gulp = require('gulp');
const header = require('gulp-header');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const package = require('./package.json');

var paths = {
  input: 'src/*',
  output: 'dist/'
};

var banner = {
  full:
    '/*!\n' +
    ' * <%= package.name %> - <%= package.description %>\n' +
    ' * Author: <%= package.author.name %> <<%= package.author.email %>>\n' +
    ' * Version: v<%= package.version %>\n' +
    ' * Url: <%= package.repository.url %>\n' +
    ' * License: <%= package.license %>\n' +
    ' */\n\n',
  min:
    '/*!' +
    ' <%= package.name %> v<%= package.version %>' +
    ' | <%= package.author.name %> <<%= package.author.email %>>' +
    ' | <%= package.license %> License' +
    ' | <%= package.repository.url %>' +
    ' */\n'
};

function clean(resolve) {
  del.sync([paths.output]);
  resolve();
}

function buildScripts() {
  return gulp.src(paths.input)
    .pipe(plumber())
    .pipe(header(banner.full, { package: package }))
    .pipe(gulp.dest(paths.output))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(header(banner.min, { package: package }))
    .pipe(gulp.dest(paths.output))
}

exports.build = gulp.parallel(buildScripts);
exports.watch = function () {
  gulp.watch(paths.input, exports.build);
}
exports.default = gulp.series(clean, exports.build);
