const gulp = require('gulp');
const compileLess = require('gulp-less');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const exec = require('child_process').exec;
const logger = console;
const dist = './public/dist';

const paths = {
  less: {
    source: './assets/less/**/*.less',
    main: './assets/less/main.less',
    outputDir: `${dist}/css`,
    outputFilename: 'styles.css'
  },
  libraries: {
    css: [
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/font-awesome/css/font-awesome.min.css'
    ]
  }
};

gulp.task('less', () => {
  const compile = compileLess({compress: false}).on('error', logger.error);
  const prefix = autoprefixer({
    browsers: '> 1%',
    cascade: false
  });

  return gulp.src(paths.less.main)
    .pipe(compile)
    .pipe(concat(paths.less.outputFilename))
    .pipe(prefix)
    .pipe(gulp.dest(paths.less.outputDir))
    .pipe(livereload());
});

gulp.task('js', function (callback) {
  return exec('./node_modules/.bin/webpack', function (err, stdout, stderr) {
    logger.log(stdout);
    logger.error(stderr);
    callback(err);
  });
});

gulp.task('concat-css-lib', () => {
  return gulp.src(paths.libraries.css)
    .pipe(concat('lib.min.css'))
    .pipe(gulp.dest(paths.less.outputDir));
});

gulp.task('copy-font-awesome', (callback) => {
  const cp = `cp -r ./node_modules/font-awesome/fonts ${dist}`;

  return exec(cp, function (err, stdout, stderr) {
    logger.log(stdout);
    logger.error(stderr);
    callback(err);
  });
});

gulp.task('watch-less', () => {
  return gulp.watch(paths.less.source, ['less']);
});

gulp.task('build', [
  'js',
  'less',
  'concat-css-lib',
  'copy-font-awesome'
]);

gulp.task('default', ['build']);

