const path = require('path')
const merge = require('webpack-merge')
const proxy = require('./config/proxyTable')
const port = require('./config/port')
const DashBoardPlugin = require('webpack-dashboard/plugin')

process.env.NODE_ENV = 'development'

const common = require('./webpack.common.config')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true,
        proxy: proxy,
        port: port
    },
    plugins: [
        new DashBoardPlugin()
    ]
})