/**
 * 压缩代码，要将代码解析成object抽象便是ast语法树，导致计算量巨大
 * 
 * ParallelUglifyPlugin使用多进程压缩代码
 * 
 */
const path = require('path')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin') // npm i -D webpack-parallel-uglify-plugin
const { module } = require('../4-1 缩小文件的搜索范围/webpack.config')
module.exports={
    plugins:[
        new ParallelUglifyPlugin({
            uglifyJS:{
                output:{
                    beautify:false,
                    comments:false
                },
                compress:{
                    warnings:false,
                    drop_console:true,
                    collapse_vars:true,
                    redece_vars:true
                }
            }
        })
    ]
}