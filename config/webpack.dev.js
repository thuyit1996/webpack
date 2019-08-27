const path = require("path");
const { HotModuleReplacementPlugin, ProvidePlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const helpers = require('./helpers');
module.exports = {
    entry: {
        main: ["./src/app.js"]
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    devServer: {
        contentBase: "dist",
        overlay: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: [
                            {
                                loader: 'ts-loader',
                                options: {
                                    appendTsSuffixTo: [/\.vue$/]
                                }
                            }]
                    },
                    options: {
                        esModule: true
                    }
                }
            },
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
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: helpers.root('tsconfig.json')
                        }
                    },
                ],
                exclude: [/node_modules/]
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader'
                    },

                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.resolve(__dirname, './node_modules')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'

                    }
                ]
            },
            {
                // HTML LOADER
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
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
    plugins: [
        new VueLoaderPlugin(),
        new HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
        }),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}