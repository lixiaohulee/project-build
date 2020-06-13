/**
* @file qrCode.js
* @author lixiaohu
* @since 2019-10-22 10:19:41
*/
export default {
    name: 'qrCode',
    components: {},
    props: {},
    data() {
        return {}
    },
    created() {},
    mounted() {
        const id = parseInt(Math.random() * 1000000)
        const createCodeSrc = `http://qr.liantu.com/api.php?text=`
        const drawingSrc = `http://10.235.206.68:14802/drawing?id=${id}`
        document.querySelector('.qrcode').src = createCodeSrc + drawingSrc

        const socket = new WebSocket(`ws://10.235.206.68:8181?channel=qr&id=${id}`)

        socket.addEventListener('open', e => {
            console.log('connected')
        })
        socket.addEventListener('message', e => {
            const { isReady } = JSON.parse(e.data)
            if (isReady === true) {
                const path = 'display'
                const query = {
                    id
                }
                this.$router.push({
                    path,
                    query
                })
            }
        })
    },
    methods: {},
    computed: {},
    watch: {}
}