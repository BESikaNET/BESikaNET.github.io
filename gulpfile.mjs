import { deleteSync } from "del";
import gulp from "gulp";

import include from "gulp-file-include";
import formatHtml from "gulp-format-html";

import autoprefixer from "autoprefixer";
import minify from "gulp-csso";
import less from "gulp-less";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import rename from "gulp-rename";
import sortMediaQueries from "postcss-sort-media-queries";

import terser from "gulp-terser";

import imagemin from "gulp-imagemin";
import imagemin_gifsicle from "imagemin-gifsicle";
import imagemin_mozjpeg from "imagemin-mozjpeg";
import imagemin_optipng from "imagemin-optipng";

import svgmin from "gulp-svgmin";
import svgstore from "gulp-svgstore";

import server from "browser-sync";

const resources = {
  html: "src/html/**/*.html",
  jsDev: "src/scripts/dev/**/*.js",
  jsVendor: "src/scripts/vendor/**/*.js",
  images: "src/assets/images/**/*.{png,jpg,jpeg,webp,gif,svg}",
  less: "src/styles/**/*.less",
  svgSprite: "src/assets/svg-sprite/*.svg",
  static: [
    "src/assets/favicons/**/*.*",
    "src/assets/fonts/**/*.{woff,woff2}",
    "src/assets/icons/**/*.*",
    // "src/assets/video/**/*.{mp4,webm}",
    // "src/assets/audio/**/*.{mp3,ogg,wav,aac}",
    // "src/json/**/*.json",
    // "src/php/**/*.php"
  ],
};

// Gulp Tasks:

function clean(done) {
  deleteSync(["dist"]);
  done();
}

function includeHtml() {
  return gulp
    .src("src/html/**/*.html")  // Изменено: добавлено ** для всех вложенных файлов
    .pipe(plumber())
    .pipe(
      include({
        prefix: "@@",
        basepath: "@file",
        context: {
          env: process.env.NODE_ENV || 'development'
        },
        indent: true
      })
    )
    .on('error', function(err) {
      console.error('HTML include error:', err.message);
      this.emit('end');
    })
    .pipe(formatHtml())
    .pipe(gulp.dest("dist"));  // Все HTML файлы попадут в dist с сохранением структуры
}

function style() {
  return gulp
    .src("src/styles/styles.less")
    .pipe(plumber())
    .pipe(less())
    .on('error', function(err) {
      console.error('Less compilation error:', err.message);
      this.emit('end');
    })
    .pipe(
      postcss([
        autoprefixer({ overrideBrowserslist: ["last 4 version"] }),
        sortMediaQueries({
          sort: "desktop-first",
        }),
      ])
    )
    .pipe(gulp.dest("dist/styles"))
    .pipe(minify())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("dist/styles"))
    .pipe(server.stream());
}

function js() {
  return gulp
    .src("src/scripts/dev/**/*.js")
    .pipe(plumber())
    .pipe(
      include({
        prefix: "//@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("dist/scripts"))
    .pipe(terser())
    .pipe(
      rename(function (path) {
        path.basename += ".min";
      })
    )
    .pipe(gulp.dest("dist/scripts"));
}

function jsCopy() {
  return gulp
    .src(resources.jsVendor)
    .pipe(plumber())
    .pipe(gulp.dest("dist/scripts"));
}

function copy() {
  return gulp
    .src(resources.static, {
      base: "src",
      encoding: false,
    })
    .pipe(gulp.dest("dist/"));
}

function images() {
  return gulp
    .src(resources.images, { encoding: false })
    .pipe(
      imagemin([
        imagemin_gifsicle({ interlaced: true }),
        imagemin_mozjpeg({ quality: 100, progressive: true }),
        imagemin_optipng({ optimizationLevel: 3 }),
      ])
    )
    .pipe(gulp.dest("dist/assets/images"));
}

function svgSprite() {
  return gulp
    .src(resources.svgSprite)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("dist/assets/icons"));
}

// Проверка HTML структуры
function checkHtml(done) {
  console.log('Checking HTML structure...');
  console.log('Looking for events.html...');
  const fs = require('fs');
  const path = require('path');
  
  const eventsPath = path.join(process.cwd(), 'src/html/events.html');
  if (fs.existsSync(eventsPath)) {
    console.log('✓ events.html found at:', eventsPath);
    const content = fs.readFileSync(eventsPath, 'utf8');
    const hasTableInclude = content.includes('@include("blocks/table.html")') || 
                           content.includes("@include('blocks/table.html')");
    console.log(hasTableInclude ? '✓ Table include found' : '✗ Table include NOT found');
    
    // Check if table.html exists
    const tablePath = path.join(process.cwd(), 'src/html/blocks/table.html');
    if (fs.existsSync(tablePath)) {
      console.log('✓ table.html found at:', tablePath);
    } else {
      console.log('✗ table.html NOT found at:', tablePath);
      console.log('Looking for table.html in other locations...');
      const searchPaths = [
        'src/html/blocks/table.html',
        'src/blocks/table.html',
        'src/html/table.html',
        'blocks/table.html'
      ];
      
      for (const searchPath of searchPaths) {
        const fullPath = path.join(process.cwd(), searchPath);
        if (fs.existsSync(fullPath)) {
          console.log(`✓ Found at: ${searchPath}`);
          break;
        }
      }
    }
  } else {
    console.log('✗ events.html NOT found at:', eventsPath);
    console.log('Looking in other locations...');
    
    const searchPaths = [
      'src/html/events.html',
      'src/events.html',
      'events.html',
      'html/events.html'
    ];
    
    for (const searchPath of searchPaths) {
      const fullPath = path.join(process.cwd(), searchPath);
      if (fs.existsSync(fullPath)) {
        console.log(`✓ Found at: ${searchPath}`);
        break;
      }
    }
  }
  
  done();
}

const build = gulp.series(
  clean,
  checkHtml,
  gulp.parallel(
    copy,
    includeHtml,
    style,
    js,
    jsCopy,
    images,
    svgSprite
  )
);

function reloadServer(done) {
  server.reload();
  done();
}

function serve() {
  server.init({
    server: "dist",
    notify: false,
    open: true,
    cors: true,
    ui: false,
    port: 3000
  });
  
  gulp.watch(resources.html, gulp.series(includeHtml, reloadServer));
  gulp.watch(resources.less, gulp.series(style, reloadServer));
  gulp.watch(resources.jsDev, gulp.series(js, reloadServer));
  gulp.watch(resources.jsVendor, gulp.series(jsCopy, reloadServer));
  gulp.watch(resources.static, { delay: 500 }, gulp.series(copy, reloadServer));
  gulp.watch(
    resources.images,
    { delay: 500 },
    gulp.series(images, reloadServer)
  );
  gulp.watch(resources.svgSprite, gulp.series(svgSprite, reloadServer));
  
  // Показать доступные URL
  setTimeout(() => {
    console.log('\n=== Доступные страницы ===');
    console.log('Главная: http://localhost:3000/');
    console.log('Мероприятия: http://localhost:3000/events.html');
    console.log('===========================\n');
  }, 1000);
}

const start = gulp.series(build, serve);

export {
  build, checkHtml, clean, copy, images, includeHtml, js,
  jsCopy, serve,
  start, style, svgSprite
};

// Дефолтная задача
export default start;