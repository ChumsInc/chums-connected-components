const {merge} = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');

const localProxy = {
    target: {
        host: 'localhost',
        protocol: 'http:',
        port: 8081
    },
    ignorePath: false,
    changeOrigin: true,
    secure: false,
};

module.exports = merge(common, {
    entry: './tests/index.tsx',
    mode: 'development',
    devServer: {
        port: 8000,
        static: [
            {directory: path.join(process.cwd(), 'public'), watch: false},
            {directory: process.cwd(), watch: false}
        ],
        hot: true,
        proxy: {
            '/api': {...localProxy},
            '/images/': {...localProxy},
        },
        watchFiles: ['src/**/*', 'test/**/*'],
    },
    devtool: 'inline-source-map',
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
    ]
});
