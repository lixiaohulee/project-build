/**
* @file userInfo.js
* @author 李小虎
* @since 2020-6-7 20:11:01
*/
import api from 'api'
export default {
    name: 'userInfo',
    components: {},
    props: {},
    data() {
        return {}
    },
    created() {
        this.getUserInfo()
    },
    mounted() {},
    methods: {
        getUserInfo() {
            const method = 'post'
            const account = localStorage.getItem('account')
            const data = { account }
            api.getUserInfo({ method, data }).then(res => {
                const { code, msg, data } = res
                if (code === 200) {
                    this.$Message.success(msg)
                    console.log(data)
                    const { userInfo: { uuid } } = data
                    localStorage.setItem('uuid', uuid)
                }else {
                    this.$Message.error(msg)
                }
            })
        }
    },
    computed: {},
    watch: {}
}