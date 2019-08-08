const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './script/main.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [new UglifyJsPlugin()],
    module: {
        rules: [{
            test: /.(js|jsx)$/,
            include: [],
            loader: 'babel-loader',

            options: {
                plugins: ['syntax-dynamic-import'],

                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: false
                        }
                    ]
                ]
            }
        }]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true
        },
        minimizer: [
            new UglifyJsPlugin({
                include: /\.js(\?.*)?$/i,
                exclude: /[\\/]node_modules[\\/]/
            }),
        ],
    },

    devServer: {
        open: true
    }
};