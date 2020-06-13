const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const myLoader = require('./myLoader')

const resolve = dir => path.resolve(__dirname, dir)
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: 'none',
    entry: {
        app: './src/main.js',
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: resolve('dist'),

        chunkFilename: '[name].[chunkhash].js',
    },
    resolve: {
        alias: {
            '@': resolve('src'),
            'api': resolve('src/api/api'),
            'utils': resolve('utils')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: [
                    resolve('src'),
                    resolve('node_modules/view-design')
                ]
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                include: [
                    resolve('src'),
                    resolve('node_modules/view-design')
                ]
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader', 
                    'postcss-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
                include: [resolve('node_modules/view-design/dist/styles/iview.css')]
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
                test: /\.(woff|woff2|ttf|eot|otf|mp3)$/,
                use: ['file-loader'],
                include: [
                    resolve('src'), 
                    resolve('node_modules/view-design/dist/styles/fonts')
                ]
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
        new VueLoaderPlugin(),
    ]
}