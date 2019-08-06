const path = require("path");
const webpack = require('webpack');
module.exports = {
    entry: {
        main: ["./src/main.js"]
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "dist",
        overlay: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                    }
                ]
            },
            {
                // HTML LOADER
                test: /\.html$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].html",
                        },
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ["img:src", "link:href"],
                        }
                    },

                ]
            },
            // image loader
            {
                test: /\.(png|jpg|gif|woff(2)?|ttf|eot|svg)$/,
                exclude: [
                    /\.(js|jsx|mjs)$/,
                    /\.html$/,
                    /\.json$/,
                    /\.(less|config|variables|overrides)$/,
                ],
                use: [
                    {
                        loader: 'file-loader'
                    },
                ],
            },


        ]
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin()
    ]
}