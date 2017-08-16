# PostCSS Logical Gradients [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Linux Build Status][cli-img]][cli-url]
[![Gitter Chat][git-img]][git-url]

[PostCSS Logical Gradients] lets you use gradients with flow-relative
directions in CSS, following the speculative [Logical Gradients Specification].

```css
header {
  background-image: linear-gradient(to inline-end, yellow 0%, blue 100%);
}

/* used alongside postcss-nesting, postcss-dir-pseudo-class */

[dir="ltr"] header {
  background-image: linear-gradient(to right, yellow 0%, blue 100%);
}

[dir="rtl"] header {
  background-image: linear-gradient(to left, yellow 0%, blue 100%);
}
```

## Usage

Add [PostCSS Logical Gradients] to your build tool:

```bash
npm install postcss-logical-gradients --save-dev
```

#### Node

Use [PostCSS Logical Gradients] to process your CSS:

```js
require('postcss-logical-gradients').process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Use [PostCSS Logical Gradients] as a plugin:

```js
postcss([
  require('postcss-logical-gradients')()
]).process(YOUR_CSS);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Use [PostCSS Logical Gradients] in your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
  return gulp.src('./src/*.css').pipe(
    postcss([
      require('postcss-logical-gradients')()
    ])
  ).pipe(
    gulp.dest('.')
  );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Use [PostCSS Logical Gradients] in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
        require('postcss-logical-gradients')()
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[npm-url]: https://www.npmjs.com/package/postcss-logical-gradients
[npm-img]: https://img.shields.io/npm/v/postcss-logical-gradients.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-logical-gradients
[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-logical-gradients.svg
[git-url]: https://gitter.im/postcss/postcss
[git-img]: https://img.shields.io/badge/chat-gitter-blue.svg

[PostCSS Logical Gradients]: https://github.com/jonathantneal/postcss-logical-gradients
[Logical Gradients Specification]: https://jonathantneal.github.io/logical-gradients-spec/
[PostCSS]: https://github.com/postcss/postcss
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
