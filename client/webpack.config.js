const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const environment = require('./environment.js');

const PROD = process.env.NODE_ENV === 'production';
const DEV = !PROD;

const config = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:15000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './index.js' // Your appʼs entry point
    ],
    output: {
        path: path.join(__dirname, 'dist/'),
        publicPath: DEV ? '' : '',
        filename: '[name]-[hash:6].js',
        chunkname: '[name]-[hash:6].js'
    },
    __prod: PROD,
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: DEV
                    ? ExtractTextPlugin.extract('style-loader',
                        'css?localIdentName=[name]_[local]_[hash:base64:6]&modules!postcss')
                    : ExtractTextPlugin.extract('css?localIdentName=[hash:base64:6]&modules!postcss')
            },
            {
                test: /\.js$/,
                loaders: DEV
                    ? ['react-hot', 'babel']
                    : ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'url?limit=3000&name=[name]_[hash:6].[ext]'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url?limit=1000&name=[name]_[hash:6].[ext]'
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars'
            }
        ]
    },
    postcss: [
        require('postcss-cssnext')({
            browsers: ['Chrome >= 31', 'Firefox >= 31', 'IE >= 9'],
            url: false
        }),
        require('postcss-nested')
    ],
    resolve: {
        root: [
            path.resolve(__dirname)
        ],
        alias: {
            apps: environment.apps,
            components: environment.components,
            home: environment.home
        },
        extensions: ['', '.js']
    },
    plugins: [
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
            fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new HtmlWebpackPlugin({
            template: 'index.hbs',
            title: 'asckai',
            inject: 'body',
            filename: 'index.html'
        })
    ]
};

if (PROD) {
    config.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false,
                conditionals: false,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                properties: true
            }
        }),
        new CompressionPlugin({
            asset: '[path][query]',
            test: /\.js$|\.css/
        })
    ]);
}

if (DEV) {
    config.devtool = 'source-map';
}

module.exports = config;
