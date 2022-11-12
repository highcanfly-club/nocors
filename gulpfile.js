/*!
=========================================================
* © 2022 Ronan LE MEILLAT for SCTG Développement
=========================================================
This website use:
- Vite, Vue3, TailwindCss 3
- And many others
*/
import gulp from 'gulp'
import gap from 'gulp-append-prepend'

gulp.task("licensesSrc", async function () {
  // this is to add Copyright in the production mode for the minified js
  gulp
    .src(["*.cjs", "*.js", "*.ts", "src/**/*.js", "functions/**/*.js", "functions/**/*.ts", "src/**/*.ts"], { base: "./" })
    .pipe(
      gap.prependText(`/*!
=========================================================
* © 2022 Ronan LE MEILLAT for SCTG Développement
=========================================================
This website use:
- Vite, Vue3, TailwindCss 3
- And many others
*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));


  // this is to add Copyright in the production mode for the minified html
  gulp
    .src("src/**/*.vue", { base: "./" })
    .pipe(
      gap.prependText(`<!--
=========================================================
* © 2022 Ronan LE MEILLAT for SCTG Développement
=========================================================
This website use:
- Vite, Vue3, TailwindCss 3
- And many others
-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
});

gulp.task("licenses", async function () {
  // this is to add Copyright in the production mode for the minified js
  gulp
    .src("dist/js/*.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!
=========================================================
* © 2022 Ronan LE MEILLAT for SCTG Développement
=========================================================
This website use:
- Vite, Vue3, TailwindCss 3
- And many others
*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  // this is to add Copyright in the production mode for the minified html
  gulp
    .src("dist/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--
=========================================================
* © 2022 Ronan LE MEILLAT for SCTG Développement
=========================================================
This website use:
- Vite, Vue3, TailwindCss 3
- And many others
-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Copyright in the production mode for the minified css
  gulp
    .src("dist/css/*.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!
=========================================================
* © 2022 Ronan LE MEILLAT for SCTG Développement
=========================================================
This website use:
- Vite, Vue3, TailwindCss 3
- And many others
*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});