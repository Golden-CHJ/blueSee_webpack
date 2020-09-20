/*webpack启动后会从entry出发,解析出文件的导入语句,在递归解析.
	遇到导入语句后:
		1.根据导入语句去寻找对应的文件(require)
		2.根据找到的文件后缀,使用loader.
    需要尽量通过与减少以上两件事的发生. */


    module.exports = {
        module:{
            // 4.1.1 优化loader配置 使用test include exclude
            rules:[
                {
                    test:/\.js$/,
                    use:['babel-loader?cacheDirectory'],
                    include:path.resolve(__dirname, "src") // 只命中src文件夹
                }
            ]

        },
        resolve:{
            // 4.1.2 resolve.modules
            /**resolve.module. 用于配置webpack去下泄目录下寻找第三方模块
             resolve 默认值是['node_modules']去当前目录寻找，没有就去上一层，一直循环。
            指定项目目录就没必要去一层一层寻找 */
            modules:[path.resolve(__dirname,"node_modules")],
            // 4.1.3 优化resolve.mainFields， 它用于第三方模块使用哪个路口文件
            /**优化resolve.mainFields， 它用于第三方模块使用哪个入口文件
            存在多入口原因：默写模块可以同时用于多个环境，根据不同的运行环境需要使用不同大代码（可以在模块的package.json中找到入口文件描述字段） */
            mainFields:['main'],
            // 4.1.4 resolve.alias配置
            /**通过别名将原道路路径映射成一个新的导入路径 
             * 以来一些庞大的第三方模块中，一般有两套打包好的代码，一个是commonhJS的模块话代码（/lib）
             * 一个是所有以来都打包好完整代码放到一个单独文件中，这些代码并没有模块划（/dist）
             * 牧人是从入口文件递归解析，使用alias，可以直接使用单独，完整的react.min.js文件,跳过递归步骤
             * 注意：可能使用treesharking对于整体性较强的react.min.js永远用不上
            */
           alias:{
               react:path.resolve(__dirname,'./node_modules/react/dist/react.min.js')
           },
           // 4.1.5 resolve.extensions 导入文件没带文件后缀名是，webpack会在自动带上后缀与，去尝试访问文件石佛存在
           /** 
            * extension在尝试的后缀列表
            * 1。后缀尝试列表要尽可能小
            * 2.频率出现最高的出现在最前面
            * 3.导入文件要写后缀啊混蛋
           */
           extensions:['.js','.json'],
           // 4.1.6 modules.noParse 忽略让没有模块话的文件不递归处理（JQ react.min.js），
           /** 这些忽略解析的文件不能有import require define 模块化语句
            */
           noParse:[/react\.min\.js$/]
        }
    }