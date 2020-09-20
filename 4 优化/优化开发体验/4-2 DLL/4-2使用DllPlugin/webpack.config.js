/**
 * 动态链接库：
 * 将网页依赖的基础模块都抽离出来，打包到一个个单独的动态链接库中。在一个动态链接库中可以包含多个模块。
 * 当需要道路模块存在于摸个动态链接库中，该模块不能再次打包，而是去动态链接库中获取
 * 网页以来的所有动态链接库都需要被加载
 * 
 * 为啥会提升构建速度了：包含大量服用模块的dll秩序被编译一次，之后构建过程中被dll还有的模块不会重新编译，而是直接使用dll中的代码(类似于react，并非是业务代码)
 * 需要两个插件：
 * DllPlugin:打包dll文件
 * DllReferencePlugin：在配置中引入DllPlugin打包好的动态库链接
 */
const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

module.exports = {
  entry: {
    // 定义 入口 Chunk
    main: './main.js'
  },
  output: {
    // 输出文件的名称
    filename: '[name].js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // 项目源码使用了 ES6 和 JSX 语法，需要使用 babel-loader 转换
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ]
  },
  plugins: [
    // 告诉 Webpack 使用了哪些动态链接库
    new DllReferencePlugin({
      // 描述 react 动态链接库的文件内容
      manifest: require('./dist/react.manifest.json'),
    }),
    new DllReferencePlugin({
      // 描述 polyfill 动态链接库的文件内容
      manifest: require('./dist/polyfill.manifest.json'),
    }),
  ],
  devtool: 'source-map'
};
