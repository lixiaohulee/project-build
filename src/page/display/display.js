/**
* @file display.js
* @author lixiaohu
* @since 2019-10-22 10:33:35
*/
import createCanvas from 'utils/canvas'
export default {
    name: 'display',
    components: {},
    props: {},
    data() {
        return {}
    },
    created() {},
    mounted() {
        const { id } = this.$route.query
        const canvas = new createCanvas('canvas', {
          borderWidth: 10,
          canvasWidth: 600,
          canvasHeight: 600,
          writeWidth: 20,
          borderColor: '#ff6666',
          isWriteName: true, //签名模式
        })
      
        console.log('lixiaohu')
        const socket = new WebSocket(`ws://10.235.206.68:8181?channel=stand&id=${id}`)
        socket.addEventListener('open', e => {
            console.log('connected')
        })
        socket.addEventListener('message', e => {
            if (e.data === 'clear') {
                canvas.option.control.clearCanvas()
                return
            }
            const points = JSON.parse(e.data)
            points.forEach((point, index, theArr) => {
                const isLastPoint = index === theArr.length - 1
                point.x = point.x * 2
                point.y = point.y * 2
                canvas.writing(point, isLastPoint)
            })
        })
    },
    methods: {},
    computed: {},
    watch: {}
}