const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = dir => path.resolve(__dirname, dir)
const devMode = process.env.NODE_ENV !== 'production'
console.log(process.env.NODE_ENV)

const common = {
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
            'lib': resolve('lib')
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
                    'style-loader',
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
                include: resolve('lib')
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

const miniCss = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        hmr: devMode
    }
}

devMode 
    ? common.module.rules.forEach(rule => {
        /\/\\\.less\$\//.test(rule.test)
            ? rule.use.splice(0, 1, miniCss)
            : null
    }) : null

!devMode 
    ? common.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ) : null

module.exports = common