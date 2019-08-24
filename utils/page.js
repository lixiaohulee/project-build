#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const inquirer = require('inquirer')
const handlebars = require('handlebars')

const templateSource = 
    "<template>\n" + 
    "    <section class=\"wrapper\"></section>\n" +
    "</template>\n" +
    "<script src=\"./{{pageName}}.js\" type=\"text/ecmascript-6\"></script>\n" +
    "<style lang=\"less\" src=\"./{{pageName}}.less\" rel=\"stylesheet/less\" scoped></style>" 

inquirer.prompt([
    {
        type: 'input',
        name: 'description',
        message: '请输入页面描述，用于routerList的key值，例如：我的首页',
        validate: receive => {
            if (/^[\u4e00-\u9fa5]+$/.test(receive)) {
                return true
            }
            return '请输入中文'
        }
    },
    {
        type: 'input',
        name: 'pageName',
        message: '请输入页面名称，命名遵循驼峰命名法，例如：myHome',
        validate: receive => {
            if (/^[a-zA-Z]+$/.test(receive)) {
                return true
            }
            return '请输入英文，格式遵循驼峰命名法'
        }
    },
    {
        type: 'confirm',
        name: 'needInitial',
        message: '是否需要页面初始内容 例如展示：hello world'
    },
    {
        type: 'checkbox',
        name: 'lifeCycle',
        message: '请选择需要用到的生命周期函数',
        choices: ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destoryed']
    }
]).then(answers => {
    const { pageName } = answers
    const pagePath = path.resolve(__dirname, `../src/page/${pageName}`)

    fs.mkdir(pagePath, { recursive: true }, err => {
        if (err) throw err

        ['.vue'].forEach(suffix => {      
            writeFile(pagePath, `${pageName}${suffix}`, generateTemplate(templateSource, answers))
        })
    })
})

function writeFile(path, filename, template) {
    fs.writeFile(`${path}/${filename}`, template, err => {
        if (err) throw err
    })
}

function generateTemplate(source, data) {
    return handlebars.compile(source)(data)
}