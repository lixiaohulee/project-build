const fs = require('fs')

function MyPlugin() {}

MyPlugin.prototype.apply = function(compiler) {
    // compiler.hooks.emit.tapAsync('MyPlugin', (compilation, cb) => {
    //     let filelist = 'In this build:\n\n'

    //     for (let filename in compilation.assets) {
    //         filelist += '-' + filename + '\n'
    //     }

    //     compilation.assets['filelist.md'] = {
    //         source: () => filelist,
    //         size: () => filelist.length
    //     }
    //     cb()
    // })

    // compiler.hooks.entryOption.tap('')
}


module.exports = MyPlugin



