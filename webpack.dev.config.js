const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.config')


module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true
    }
})