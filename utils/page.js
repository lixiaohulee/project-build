#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const inquirer = require('inquirer')
const handlebars = require('handlebars')

const templateSource = 
    "<!--\n" +
    "@file {{pageName}}.value\n" +
    "@author {{author}}" +
    "@since {{createTime}}\n" +
    "-->\n" +
    "<template>\n" + 
    "    <section class=\"{{pageName}}-wrapper\"></section>\n" +
    "</template>\n" +
    "<script src=\"./{{pageName}}.js\" type=\"text/ecmascript-6\"></script>\n" +
    "<style lang=\"less\" src=\"./{{pageName}}.less\" rel=\"stylesheet/less\" scoped></style>" 

const styleSource = 
    "/**\n" +
    "* @file {{pageName}}.less\n" +
    "* @author {{author}}" +
    "* @since {{createTime}}\n" +
    "*/\n" +
    ".{{pageName}}-wrapper {\n" + 
    "    background-color: red;\n" +
    "}"

const jsSource = 
    "/**\n" +
    "* @file {{pageName}}.js\n" +
    "* @author {{author}}" +
    "* @since {{createTime}}\n" +
    "*/\n" +
    "export default {\n" +
    "    name: '{{pageName}}',\n" +
    "    components: {},\n" +
    "    props: {},\n" +
    "    data() {\n" +
    "        return {}\n" +
    "    },\n" +
    "    created() {},\n" +
    "    mounted() {},\n" +
    "    methods: {},\n" +
    "    computed: {},\n" +
    "    watch: {}\n" +
"}"
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
    const routerPath = path.resolve(__dirname, `../src/router`)

    if(!shell.which('git')) {
        console.error('can not use git')
    }else {
        shell.exec('git config user.email', (code, stdout, stderr) => {
            if (stderr) throw stderr
            answers.userEmail = stdout

            shell.exec('git config user.name', (code, stdout, stderr) => {
                if (stderr) throw stderr
                answers.userName = stdout
                answers.author = answers.userName

                fs.mkdir(pagePath, { recursive: true }, err => {
                    if (err) throw err
                    answers.createTime = new Date().toLocaleString()
                    writeFile(pagePath, `${pageName}.vue`, generateTemplate(templateSource, answers))
                    writeFile(pagePath, `${pageName}.less`, generateTemplate(styleSource, answers))
                    writeFile(pagePath, `${pageName}.js`, generateTemplate(jsSource, answers))

                    readFile(routerPath, 'routerList.js', answers)
                })
            })
        })
    }
})

function writeFile(path, filename, template) {
    fs.writeFile(`${path}/${filename}`, template, err => {
        if (err) throw err
    })
}

function readFile(path, filename, answers) {
    fs.readFile(`${path}/${filename}`, 'utf-8', (err, data) => {
        if (err) throw err
        let comma = ','
        if (/},\n}/.test(data.toString())) {
            comma = ''
        }
        let res = data.toString().replace(/export default {([\s\S]*)(\,)*\n}/, (rs, $1, $2) => {

            return `export default {${$1}${comma}\n` + `    ${answers.description}: {\n` +
                `        baseDir: \'${answers.pageName}\',\n` +
                `        tplName: \'${answers.pageName}\'\n` +
                "    }\n" + "}"
            })

        writeFile(path, filename, res)
    })
}

function generateTemplate(source, data) {
    return handlebars.compile(source)(data)
}