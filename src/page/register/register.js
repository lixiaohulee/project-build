/**
* @file register.js
* @author 李小虎
* @since 2020-6-5 16:19:53
*/
import api from 'api'
import { Card,Form,FormItem,Input,Icon,Button } from 'view-design'
export default {
    name: 'register',
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
            registerForm: {
                account: '',
                password: '',
                confirmPassword: ''
            },
            rulesRegister: {
                account: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: accountValidator, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
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
         * 判断密码前后输入是否一致  
         * @return {Boolean}
         */
        handleConfirmPassword() {
            const { password, confirmPassword } = this.registerForm
            if (password !== confirmPassword) {
                this.$Message.error('密码不一致，请再次确认')
                return false
            }
            return true
        },
        /**
         * 提交注册信息
         */
        handleRegister() {
            if (!this.handleValidate('registerForm') || !this.handleConfirmPassword()) return 

            const method = 'post'
            const data = {
                ...this.registerForm
            }
            api.register({ method, data }).then(res => {
                const { code, msg } = res
                if (code === 200) {
                    this.$Message.success(msg)
                    //注册成功之后去往登陆页面
                    this.handleAlreadyRegister()
                }else {
                    this.$Message.error(msg)
                }
            })
        },
        /**
         * 已有账号
         * 快去登录吧
         */
        handleAlreadyRegister() {
            const path = 'login'
            this.$router.push({ path })
        }
    },
    computed: {},
    watch: {}
}