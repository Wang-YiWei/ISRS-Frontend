var UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: "./src/EditApp/EditApp.js",
    output: {
        path: __dirname,
        filename: "./dist/editBundle.js",
        sourceMapFilename: 'editBundle.map'
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
