const plugins = [
    require('autoprefixer'),
    require('postcss-preset-env'),
    require('cssnano'),
    require('postcss-px-to-viewport')({
        viewportWidth: 360,
        viewportHeight: 640,
        unitPrecision: 3,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines'],
        minPixelValue: 1,
        mediaQuery: false,
        exclude: [ /[\\/]node_modules[\\/]/ ]
    })
]

module.exports = {
    plugins
}