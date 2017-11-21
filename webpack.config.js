const path = require('path');
module.exports = {
    entry: {
        virtualDOM: './src/index.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].min.js'
    },
    devtool: '#source-map',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader?cacheDirectory=true',
            exclude: /node_modules/,
            query: {
                presets: ['env']
            }
        }]
    },
    resolve: {
        alias: {},
        extensions: ['.js']
    }
}