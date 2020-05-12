const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const TerserJS = require('terser-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    devServer: {
        port: 8080,
        host: '0.0.0.0'
    },
    devtool: 'eval-source-map',
    entry: {
        index: './src/index.js',
        // design: './src/design.js',
        points: './src/points.js'
    },
    output: {
        filename: './js/[name]_[hash:5].js',
        path: path.resolve(__dirname, './build')
    },
    resolve: {
        extensions: ['.js', '.ts', '.less'],
        alias: {
            '@': 'three/examples/jsm',
        }
    },
    optimization: {
        minimizer: [
            new TerserJS({
                test: /\.js$/,
                include: /src/,
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCss()
        ],
        splitChunks: {
            cacheGroups: {
                commen: {
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2,
                    name: 'commen'
                },
                vendor: {
                    priority: 1,
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    },
    module: {
        noParse: /resource/,
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    corejs: 3
                                }
                            ]
                        ]
                    }
                },
                include: /src/
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.(le|c)ss$/,
                use: [MiniCssExtract.loader, 'css-loader', 'postcss-loader', 'less-loader'],
                include: /src/
            },
            {
                test: /\.jpg|png|gif|bmp|ttf|woff|woff2/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100* 1024,
                        esModule: false,
                        name: '[name]_[hash:5].[ext]',
                        outputPath: './img'
                    }
                },
                include: /src/
            },
            {
                test: /\.html/,
                use: 'html-withimg-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            chunks: ['vendor', 'index']
        }),
        // new HtmlWebpackPlugin({
        //     template: './public/cesium.html',
        //     filename: 'design.html',
        //     chunks: ['vendor', 'design']
        // }),
        new HtmlWebpackPlugin({
            template: './public/points.html',
            filename: 'points.html',
            chunks: ['vendor', 'points']
        }),
        new MiniCssExtract({
            filename: './css/[name].css',
            chunkFilename: './css/[id].css'
        }),
        new webpack.ProvidePlugin({
            THREE: 'three/build/three'
        }),
        new webpack.DefinePlugin({
            ION_TOKEN: JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MjU3Y2Q2OS02NDQwLTRkYTYtOTQzNy1lMWY1OGNjMTAxN2EiLCJpZCI6MTg1MjQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzM5ODExMDB9.l88Kp55RWjKBE7uN-o_ZbjI3P8gexRVfX9omRc5-OUs'),
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: 'resource',
            to: 'resource'
        }]),
        new webpack.BannerPlugin('Made By Herve In 2020/04/18')
    ]
}