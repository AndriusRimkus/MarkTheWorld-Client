var path = require('path');
var ExtractPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var plugins = [
    new ExtractPlugin('bundle.css'),
    new webpack.optimize.UglifyJsPlugin({
        mangle:   true,
        compress: {
            warnings: false, // Suppress uglification warnings
        },
    }),
];

module.exports = {
    entry:  './public/Scripts/index.js',
    output: {
        path: './public/Scripts/bundles/',
        filename: 'bundle.js',
    },
    devServer: {
        port: 5000,
        contentBase: "./public"
    },
    plugins: plugins,
    module: {
        preLoaders: [
            {
                test: /\.js/,
                loader: 'eslint',
            }
        ],
        loaders: [
            {
                test:   /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bundles)/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test:   /\.scss/,
                loader: ExtractPlugin.extract('style', 'css!sass'),
            },
            {
                test:   /\.html/,
                loader: 'html'
            }
        ]
    }
};