const path = require('path')
const merge = require('webpack-merge')
const WebpackDeepScopePlugin = require('webpack-deep-scope-plugin').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackBuildNotifier = require('webpack-build-notifier')
const { LifeCycleWebpackPlugin } = require('lifecycle-webpack-plugin')

process.env.NODE_ENV = 'production'

const common = require('./webpack.common.config')
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap(merge(common, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 20
                },
                common: {
                    name: 'common',
                    chunks: 'async',
                    minChunks: 2,
                    priority: 10,
                    reuseExistingChunk: true,
                    minSize: 2,
                    enforce: true,
                }
            }
        }
    },
    plugins: [
        // new WebpackDeepScopePlugin(),
        new BundleAnalyzerPlugin({
            generateStatsFile: true,
            analyzerMode: 'disabled'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
        new ProgressBarPlugin({
            clear: false
        }),
        new WebpackBuildNotifier(),
        new LifeCycleWebpackPlugin({
            done: (compiler) => {
                console.log('\n done \n', new Date());
            }
        })
    ]
}))
