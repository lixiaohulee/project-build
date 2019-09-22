const fs = require('fs')

function MyPlugin() {}

MyPlugin.prototype.apply = function(compiler) {
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, cb) => {
        console.log(Object.keys(compilation.assets))
        const reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)|(\/\*\*\*\*\*\*\/)/g
        Object.keys(compilation.assets).forEach(filename => {
            let content = compilation.assets[filename].source()

            console.log(content)
            content = content.replace(reg, '')

            compilation.assets[filename] = {
                source() {
                    return content
                },

                size() {
                    return content.length
                }
            }
        })
        cb()
    })
}


module.exports = MyPlugin