const { AutoWebPlugin } = require("web-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const path = require("path");
// webplugin中 ，自动寻找pages目录下的所有目录，建每个目录看成一个单页应用
const autoWebPlugin = new AutoWebPlugin("pages", {
  template: "./template.html", // html模板文件所在的文件路径
  postEntrys: ["./common.css"], // 所有页面都依赖这份通用的css
  // 提取出所有页面的公共代码
  commonsChunk: {
    name: "common", // 公共代码的名称
  },
});
module.exports = {
  //mode: "production",
  // autowebplugin回味寻找到所有的蛋液引用生成对应的入口文件配置
  // autowebplugin.entry方法可获取所有有autowebplugin生成的入口配置
  entry: autoWebPlugin.entry({
    // 这里其实是这样的
    // "index":["./pages/index/index.js","./common.css"],
    // "login":["./pages/login/index.js","./common.css"]
  }),
  output: {
    filename: `[name]_[chunkhash:8].js`,
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: path.resolve(__dirname, "node_modules"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    autoWebPlugin,
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production 去除 react 代码中的开发时才需要的部分
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};
