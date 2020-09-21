/**
 * 热更新：在不刷新整个网页情况下做到灵敏试试预览
 * 原理：源码发生变化时，只需监听发生变化的模块，新输出的某块替换点浏览器中的老模块
 * 开启：webpack-dev-server --hot 或通过插件hotmodulereplacementplugin
 * 
 * 
 */

const {
    HotModuleReplacementPlugin
} = require("webpack");

module.exports = {
    plugins: [
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin() // 显示出被模块的名称
    ],
    devServer: {
        hot: true
    }
}