module.exports = {
    "plugins": {
      "postcss-import": {},
      "postcss-url": {},
      "postcss-aspect-ratio-mini": {},
      "postcss-write-svg": {
        utf8: false
      },
      "postcss-cssnext": {},
      "postcss-px-to-viewport": {
        viewportWidth: 360,
        viewportHeight: 640,
        unitPrecision: 3,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines'],
        minPixelValue: 1,
        mediaQuery: false
      },
      "postcss-viewport-units": {},
      "cssnano": {
        "cssnano-preset-advanced": {
          zindex: false,
          autoprefixer: false
        }
      }
    }
  }