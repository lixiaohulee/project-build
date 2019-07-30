const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].[contenthash].js'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                include: path.resolve(__dirname, 'src')
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
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack demo',
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html'),
            inject: true
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}