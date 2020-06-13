const fs = require('fs')
const path = require('path')
const colors = require('colors')
const shell = require('shelljs')


const UPLOAD_STATIC_FILE_PLUGIN = 'UploadStaticFilePlugin'


function UploadStaticFilePlugin(options) {}

UploadStaticFilePlugin.prototype.apply = function(compiler) {
    compiler.hooks.afterEmit.tapAsync(UPLOAD_STATIC_FILE_PLUGIN, (compilation, callback) => {
        console.log('\nstart to upload files'.yellow)
        const filePath = path.resolve(__dirname, 'dist')
        const command = `scp -r ${filePath}/* root@39.100.51.109:/root/www/`
        shell.exec(command, (code, stdout, stderr) => {
            if (code === 0) {
                console.log('upload files successfully'.green)
            }
        })
        callback()
    })
}


module.exports = UploadStaticFilePlugin



