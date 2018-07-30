const del = require('del');
const gulp = require('gulp');
const header = require('gulp-header');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const lazypipe = require('lazypipe');
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

gulp.task('clean', function () {
  del.sync([paths.output]);
});

gulp.task('build:scripts', function () {
  const jsTasks = lazypipe()
    .pipe(header, banner.full, { package: package })
    .pipe(gulp.dest, paths.output)
    .pipe(rename, { suffix: '.min' })
    .pipe(uglify)
    .pipe(header, banner.min, { package: package })
    .pipe(gulp.dest, paths.output)

  return gulp.src(paths.input)
    .pipe(plumber())
    .pipe(jsTasks());
});

gulp.task('watch', function () {
  gulp.watch(paths.input).on('change', function () {
    gulp.start('default');
  });
});

gulp.task('build', ['build:scripts'])

gulp.task('default', ['clean', 'build']);