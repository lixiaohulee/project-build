const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.config')
const WebpackDeepScopePlugin = require('webpack-deep-scope-plugin').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        usedExports: true
    },
    devtool: 'cheap-module-source-map',
    optimization: {
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
        })
    ]
})
