const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

function html() {
  return src("./src/*.html").pipe(dest("./dist"));
}

function scss() {
  return src("./src/styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("./dist/styles"));
}

function img() {
  return src("./src/images/*.png").pipe(dest("./dist/images"));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  watch("./src/*.html", html).on("change", browserSync.reload);
  watch("./src/styles/*.scss", scss).on("change", browserSync.reload);
  watch("./src/images", img).on("change", browserSync.reload);
}

exports.default = series(html, scss, img, [serve]);
