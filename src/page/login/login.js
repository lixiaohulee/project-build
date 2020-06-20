/**
* @file login.js
* @author 李小虎
* @since 2020-6-5 14:39:11
*/ 
import api from 'api'
import { Card,Form,FormItem,Input,Icon,Button } from 'view-design'
export default {
    name: 'login',
    components: {
        Card,Form,FormItem,Input,Icon,Button
    },
    props: {},
    data() {
        const accountValidator = (rule, value, callback) => {
            const phoneReg = /^1(3|4|5|7|8|9)\d{9}$/
            if (phoneReg.test(value)) {
                callback()
            }else {
                callback(new Error('请输入正确的手机号')) 
            }
        }
        return {
            loginForm: {
                account: '',
                password: '',
            },
            rulesLogin: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { validator: accountValidator, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        }
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * 检验表单信息
         * @param {String} formName 
         * @returns {Boolean} 
         */
        handleValidate(formName) {
            if (typeof formName !== 'string') {
                throw new TypeError('formName must be a string')
            }
            let defaultValid = true
            this.$refs[formName].validate(valid => {
                defaultValid = defaultValid && valid
            })

            return defaultValid
        },
        /**
         * 提交登录信息
         */
        handleLogin() {
            if (!this.handleValidate('loginForm')) return 

            const method = 'post'
            const data = {
                ...this.loginForm
            }
            api.login({ method, data }).then(res => {
                const { code, msg, data } = res
                if (code === 200) {
                    console.log(data)
                    const { token, account } = data
                    localStorage.setItem('token', token)
                    localStorage.setItem('account', account)
                    this.$Message.success(msg)

                    const path = 'userInfo'
                    this.$router.push({ path })
                }else {
                    this.$Message.error(msg)
                }
            })
        },
        /**
         * 还没有注册账号
         * 去往注册页面注册账号
         */
        handleNoAccount() {            
            const path = 'register'
            this.$router.push({ path })
        }
    },
    computed: {},
    watch: {}
}