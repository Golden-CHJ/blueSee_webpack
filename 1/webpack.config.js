const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
module.exports = {
  // 执行文件入口
  entry: "./main.js",
  output: {
    // 间所有的依赖木块合并输出到一个bundle.js文件
    filename: "bundle.js",
    // 将输出文件都放到dist文件目录下
    path: path.resolve(__dirname, "./dist"),
  },

  module: {
    rules: [
      {
        // 用正则表达式去匹配该loader转换的css文件
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
        // use: ['css-loader', "style-loader"]
        // 逆序：先用css-lader读取css文件，再有style-loader将css注入js里
        //use:是一个有loader组成的数组，loader的执行顺序是有后向前走
        // loader都可以用于URL传入参数，例如css-loader?minimize 开启css压缩
        //注意这里cssloader没有这个参数了
        //     use: ["style-loader",
        //     {
        //         loader: 'css-loader',
        //         options: {
        //             minimize: true
        //         }
        //     },
        // ],
        // 要安装引入的loader
      },
    ],
  },
  plugins: [
    // 这个插件作用是提取js代码中的css文件到单独的文件中
    // 对此可以通过插件彻底filename属性，告诉插件输出的css文件
    // [name]是源文件的名字 [contenthash:8]根据文件内容生成8位hash文件
    new ExtractTextPlugin({
      // filename: `[name]_[contenthash:8].css`, webpack4 包含了contenthash关键字，所以不能用contenthash
      filename: `[name]_[md5:contenthash:hex:8].css`,
    }),
  ],
};
