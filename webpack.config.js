const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
    entry: slsw.lib.entries,
    mode: slsw.lib.webpack.isLocal ? 'development': 'production',
    //devtool: "source-map",
    devtool: "source-map",
    externals: [nodeExternals()],
    target: 'node',
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: __dirname,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env"]
                    }
                }
            },
            {
                test: /\.ts$/,
                include: __dirname,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'ts-loader'
                }],
            }
        ]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin()
    ]
};