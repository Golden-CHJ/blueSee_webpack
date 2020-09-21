/**
 * tree shaking用来提出javascript用不上死代码。他依赖es6模块（import export）
 * 正常工作的前提是，webpack的js代码必须采用es6模块，因为es6模块化是静态的
 * 
 * 首先需要配置babel，保留es6 模块块化语句
 * 配置好之后再启动webpack是带上--display-used-exports
 * 之后再使用uglfJS 或者带上--optimize-minimize
 * 
 * 再项目使用大量的第三方库时，我没回达县treeshaking不生效的 因为大部分都是使用comminjs，
 * 现在npm都有两个入口，commonJS 一份采用ES6模块语法
 * 
 */