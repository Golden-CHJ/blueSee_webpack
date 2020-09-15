// const path = require('path');
// const nodeExternals = require('webpack-node-externals');

// module.exports = {
//   // JS 执行入口文件
//   entry: './main_server.js',
//   // 为了不打包进 Nodejs 内置的模块，例如 fs net 模块等
//   target: 'node',
//   // 为了不打包进 node_modules 目录下的第三方模块
//   externals: [nodeExternals()],
//   output: {
//     // 为了以 CommonJS2 规范导出渲染函数，以给采用 Nodejs 编写的 HTTP 服务调用
//     libraryTarget: 'commonjs2',
//     // 把最终可在 Nodejs 中运行的代码输出到一个 bundle.js 文件
//     filename: 'bundle_server.js',
//     // 输出文件都放到 dist 目录下
//     path: path.resolve(__dirname, './dist'),
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: ['babel-loader'],
//         exclude: path.resolve(__dirname, 'node_modules'),
//       },
//       {
//         // CSS 代码不能被打包进用于服务端的代码中去，忽略掉 CSS 文件
//         test: /\.css/,
//         use: ['ignore-loader'],
//       },
//     ]
//   },
//   devtool: 'source-map' // 输出 source-map 方便直接调试 ES6 源码
// };
/**
 * 构建同构应用的最终目的是从一份项目源码中构建出2份 JavaScript 代码，一份用于在浏览器端运行，一份用于在 Node.js 环境中运行渲染出 HTML。 
 * 其中用于在 Node.js 环境中运行的 JavaScript 代码需要注意以下几点：
 * 不能包含浏览器环境提供的 API，例如使用 document 进行 DOM 操作， 　因为 Node.js 不支持这些 API；
 * 不能包含 CSS 代码，因为服务端渲染的目的是渲染出 HTML 内容，渲染出 CSS 代码会增加额外的计算量，影响服务端渲染性能；
 * 不能像用于浏览器环境的输出代码那样把 node_modules 里的第三方模块和 Node.js 原生模块(例如 fs 模块)打包进去，而是需要通过 CommonJS 规范去引入这些模块。
 * 需要通过 CommonJS 规范导出一个渲染函数，以用于在 HTTP 服务器中去执行这个渲染函数，渲染出 HTML 内容返回。
 * 
 * 
 */
const path = require('path');
const nodeExternals = require('webpack-node-externals') //  和externals配合
const DefinePlugin = require("webpack/lib/DefinePlugin");
module.exports = {
  entry: './main_server.js',
  //  JavaScript 即可以编写服务端代码也可以编写浏览器代码，所以 webpack 提供了多种部署 target，你可以在 webpack 的配置选项中进行设置。
  //在上述示例中，target 设置为 node，webpack 将在类 Node.js 环境编译代码。(使用 Node.js 的 require 加载 chunk，而不加载任何内置模块，如 fs 或 path)。
  target: 'node',
  // 为了不教NOde.js 内置的目录下的第三方模块打包进输出文件中
  externals: [nodeExternals()],
  output: {
    // 为了一CommonJs2规范导出渲染函数，已被采用NODEJS编写的HTTP服务调用
    libraryTarget: 'commonjs2',
    filename: 'bundle_server.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production 去除 react 代码中的开发时才需要的部分
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: path.resolve(__dirname, 'node_modules')
    }, {
      // css 代码不能被导报到服务端代码，忽略css文件
      test: /\.css$/,
      use: 'ignore-loader'
    }]
  },
  devtool: 'source-map'
}