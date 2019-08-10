const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = dir => path.resolve(__dirname, dir)
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: 'none',
    entry: {
        app: './src/main.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: resolve('dist'),
        chunkFilename: '[name].[contenthash].js'
    },
    resolve: {
        alias: {
            '@': resolve('src'),
            'lib': resolve('lib'),
            'js-lib': resolve('src/lib/js'),
            'api': resolve('src/lib/js/request/api'),
            '~': resolve('src/components')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: resolve('src')
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                include: resolve('src')
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader', 
                    'postcss-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        } 
                    }
                ],
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)$/,
                use: ['file-loader'],
                include: resolve('src')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack demo',
            filename: 'index.html',
            template:  resolve('index.html'),
            inject: true
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}