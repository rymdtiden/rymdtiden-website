var gulp = require("gulp");
var fileInline = require("gulp-file-inline");
var htmlmin = require("gulp-htmlmin");
var gzip = require("gulp-gzip");
var connect = require("gulp-connect");

var outputFolder = "dist";

function build() {
  return gulp
    .src("src/index.html")
    .pipe(fileInline())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(outputFolder))
    .pipe(gzip())
    .pipe(gulp.dest(outputFolder));
}

function watch(done) {
  gulp.watch(
    ["src/*.html", "src/*.css", "src/*.js"],
    gulp.series(build, reload)
  );
  done();
}

function server(done) {
  connect.server(
    {
      root: outputFolder,
      livereload: true
    },
    function() {
      this.server.on("close", done);
    }
  );
}

function reload() {
  return gulp.src(outputFolder).pipe(connect.reload());
}

gulp.task("default", gulp.parallel(build, server, watch));
gulp.task("build", build);
