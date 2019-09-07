

function MyPlugin() {}

MyPlugin.prototype.apply = function(compiler) {
    compiler.hooks.emit.tap('MyPlugin', (compilation, callback) => {
        // console.log(compilation.chunks.modules)
        // callback()
        // compilation.chunks.forEach(chunk => {
        //     console.log(chunk)
        // })
        // console.log(compilation.assets)
        // Object.keys(compilation.assets).forEach(key => {
        //     console.log(compilation.assets[key].filename)
        // })
        for(let filename in compilation.assets) {
            // console.log(Object.keys(compilation.assets.))
        }
    })
}


module.exports = MyPlugin