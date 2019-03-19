var gulp = require("gulp");
var fileInline = require("gulp-file-inline");
var htmlmin = require("gulp-htmlmin");
var gzip = require("gulp-gzip");

function build() {
  return gulp
    .src("src/index.html")
    .pipe(fileInline())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"))
    .pipe(gzip())
    .pipe(gulp.dest("dist"));
}

gulp.task("default", build);

gulp.task("watch", function() {
  gulp.watch("src/*.html", build);
  gulp.watch("src/*.css", build);
  gulp.watch("src/*.js", build);
});
