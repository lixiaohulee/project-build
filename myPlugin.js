const fs = require('fs')

function MyPlugin() {}

MyPlugin.prototype.apply = function(compiler) {
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, cb) => {
        // console.log(compilation.assets)
        // compilation.chunks.forEach(chunk => {
        //     console.log(1111, chunk.files)
            // debugger
            // chunk.files.forEach(filename => {
                // if (filename.endsWith('.css')) {
                //     let source = compilation.assets[filename].source()
                //     console.log(source)
                // }
                // compilation.assets[filename] = {
                //     source: () => 'hello world',
                //     size: () => Buffer.byteLength('hello world', 'utf-8')
                // }
            // })
        // })
        compilation.options.module.rules.forEach(rule => {
            // console.log(rule.use[])
            if (Array.isArray(rule.use)) {
                // console.log(rule.use)
                rule.use.forEach(loader => {
                    console.error(loader.loader)
                    
                })
            }
        })
        // console.log(compilation.options.module.rules)
        cb()
    })
}


module.exports = MyPlugin