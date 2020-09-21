/**
 * 文件监听是在发现远吗文件发生变化是，自动重新构建出新的文件
 * 两种方法：
 *  1. webpack.config.js watch:true
 *  2. webpack 带上--watch参数
 * 原理：定时获取这个文件的最后编辑时间，对于多个文件来说，只不过会对（列表）中的每一个文件都定时执行检检查
 *          列表就是webpack从entry文件所依赖的文件，将这些文件都加入监听列表
 */
/**
 * 文件监听下一步是刷新浏览器，webpack负责监听文件，webpack-dev-serve木块负责刷新浏览器
 * 控制浏览器刷新：
 * 1、浏览器拓展接口
 * 2、想开发网页注入代理客户端代码，通过代理客户端去刷新整个页面（webpack默认）
 * 3、将开发的网页装入一个iframe中（webpack支持 可以使用--inline false ）
 * 
 * inline：devserve想每个输出的chunk注入代理客户端的代码，羡慕chunk很多事，就会导致构建慌忙。
 * 自动刷新只需要一个代理客户端，关闭inline值注入一个代理客户端
 * 入口变为
 * loaclhost：8080/wenpack-dev-serve
 * bundle.js中不在行代理客户端的代码
 * 
 */
module.exports = {
    watch: true,
    watchOptions: {
        // 不监听node——modules文件下
        ignore: /node_modules/,
        // 检测到变化后等300ms在执行动作，防止文件更新太快（越大越好）
        aggregateTimeout: 300,
        // 询问文件是佛变化的次数
        //   每秒1000次
        poll: 1000
    }
}