/**
 * HappyPack 多进程打包loader
 * 
 * 原理：最好是就是loader对文件的转换处理，happypack将这些任务分解到多个进程去并行处理
 * 
 */

 const path = reqiure('path');
 const HappyPack = require('happypack'); // npm i -D happpypack


 module.exports = {
     modules:{
         rules:[
             {
                 test:/\.js/,
                 use:['happypack/loader?id=babel'],
                 exclude:path.resolve(__dirname,'node_modules')
             },
             {
                test:/\.css$/,
                use:['happypack/loader?id=css'],
                include:path.resolve(__dirname,'css')
             }
         ]
     },
     plugins:[
         new HappyPack({
             // id要一一对应
             id:'babel',
             loaders:['babel-loader?cacheDirectory']
         }),
         new HappyPack({
             id:'css',
             loaders:['css-loader']
         })
     ]
 }