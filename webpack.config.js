var UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: "./src/ResultApp/ResultApp.js",
    output: {
        path: __dirname,
        filename: "./dist/resultBundle.js",
        sourceMapFilename: 'resultBundle.map'
    },
    devtool: "#source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    }
}
