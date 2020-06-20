/**
* @file home.js
* @author 李小虎
* @since 2020-6-12 14:44:27
*/
import { Layout, Header, Menu, MenuItem, Content, Card, Icon, Modal } from 'view-design'
import { Form, FormItem, Input, Button, Select, Option, Row, Col, Upload  } from 'view-design'

import api from 'api'
export default {
    name: 'home',
    components: {
        Layout, Header, Menu, MenuItem, Content, Card, Icon, Modal,
        Form, FormItem, Input, Button, Select, Option, Row, Col, Upload
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
            createShow: true,
            goodsForm: {
                name: '',
                type: '',
                mode: '',
                description: '',
                prize: '',
                contact: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: 'Mailbox cannot be empty', trigger: 'change' },
                ],
                mode: [
                    { required: true, message: 'Please select the city', trigger: 'change' }
                ],
                prize: [
                    { required: true, message: 'Please select gender', trigger: 'blur' }
                ],
                contact: [
                    { required: true, type: 'string', min: 1, message: 'Choose at least one hobby', trigger: 'blur' },
                ],
                description: [
                    { required: true, type: 'string', message: 'Please select time', trigger: 'blur' }
                ]
            },
            defaultList: [],
            imgName: '',
            visible: false,
            uploadList: [],
            uploadHeaders: {
                token: localStorage.getItem('token')
            }
        }
    },
    created() {},
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
        createDoods() {
            console.log(this.goodsForm, this.uploadList)
            const images = this.uploadList.map(image => image.url).join(';')
            const uuid = localStorage.getItem('uuid')
            const goods = {
                ...this.goodsForm,
                images,
                uuid
            }
            const data = { goods }
            const method = 'post'
            api.createGoods({ data, method }).then(res => {
                console.log(res)
            })
        },
        /**
         * 选择导航
         * @param {Number} name 
         */
        onMenuSelect(name) {
            if (+name === 1) {
                this.handleShowModal()
            }
        },
        /**
         * 
         */
        onModalOk () {
            this.createDoods()
            this.$Message.info('Clicked ok');
        },
        onModalCancel () {
            this.$Message.info('Clicked cancel');
        },
        handleShowModal() {
            this.createShow = true
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
            const { response } = file
            file.url = response.data.url
            file.name = response.data.url
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload () {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        },
    },
    computed: {},
    watch: {}
}