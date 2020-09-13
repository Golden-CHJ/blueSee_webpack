const path = require("path");
const terserplugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const {
    WebPlugin
} = require("web-webpack-plugin");
module.exports = {
    entry: {
        app: "./main.js",
    },
    output: {
        filename: `[name]_[chunkhash:8].js`,
        path: path.resolve(__dirname, "./dist"),
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: ["babel-loader"],
                // 排除node_modules下的文件，
                exclude: path.resolve(__dirname, "node_modules"),
            },
            {
                test: /\.css/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                ],
            },
        ],
    },
    plugins: [
        new WebPlugin({
            template: "./tempale.html",
            filename: "index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name]_[chunkhash:8]..css",
        }),
        new DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new terserplugin({
            //   uglifyJs 已经被废弃
            // 最紧凑的输出
            //   beautify: false,
            // 删除所有的注释
            extractComments: false,
            terserOptions: {
                compress: {
                    //  删除没有用到的代码是不警告
                    warnings: false,
                    // 删除所有console
                    drop_console: true,
                    // 内嵌定义但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                },
            },
        }),
    ],
};