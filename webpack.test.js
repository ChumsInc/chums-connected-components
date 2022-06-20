const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
            '/images/': {...localProxy},
        },
        watchFiles: ['src/**/*', 'test/**/*'],
    },
    devtool: 'inline-source-map',
    plugins: [new WebpackBundleAnalyzer()]
});
