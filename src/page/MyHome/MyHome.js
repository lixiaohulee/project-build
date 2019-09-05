/**
* @file MyHome.js
* @author lixiaohu
* @since 2019-8-25 16:55:08
*/
import api from 'api'
export default {
    name: 'MyHome',
    components: {},
    props: {},
    data() {
        return {}
    },
    created() {
        api.testApi().then(res => {
            console.log(res)
        })
    },
    mounted() {},
    methods: {},
    computed: {},
    watch: {}
}