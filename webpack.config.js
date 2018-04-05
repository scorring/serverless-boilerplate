const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: slsw.lib.entries,
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
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    }
};