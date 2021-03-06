var gulp = require('gulp');
var runSequence = require('run-sequence');
var merge = require('gulp-merge-json');
var build = require('./tools/data');
var cover = require('./tools/cover');
var serve = require('./tools/serve');


/**
 * Validate the covers inside the data folder
 */
gulp.task('validate-cover', function() {
  return cover(); // The build task handle validation
});


/**
 * Validate the content of all YAML file inside the data folder
 */
gulp.task('validate-data', function() {
  return build(); // The build task handle validation
});


/**
 * Aggregate the content of the YAML file inside a single JSON document
 */
gulp.task('build-cover', function() {
  return cover()
    .pipe(gulp.dest('dist'));
});


/**
 * Aggregate the content of the YAML file inside a single JSON document
 */
gulp.task('build-data', function() {
  return build()
    .pipe(merge('articles.json', false, [], false, false, true))  // use feature concat array
    .pipe(gulp.dest('dist'));
});


/**
 * Serve static files in dist
 */
gulp.task('static-serve', function() {
  return serve();
});


/**
 * Validate the database
 */
gulp.task('validate', function() {
  return runSequence(
    'validate-cover',
    'validate-data'
  );
});


/**
 * Aggregate the content of the YAML file inside a single JSON document
 */
gulp.task('build', function() {
  return runSequence(
    'build-cover',
    'build-data'
  );
});


/**
 * Serve database for development purpose
 */
gulp.task('serve', function() {
  return runSequence(
    'build-cover',
    'build-data',
    'static-serve'
  );
});

gulp.task('default', ['build']);
