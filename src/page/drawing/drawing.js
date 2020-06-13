/**
* @file drawing.js
* @author lixiaohu
* @since 2019-10-22 10:26:20
*/
import createCanvas from 'utils/canvas'
export default {
    name: 'drawing',
    components: {},
    props: {},
    data() {
        return {
            showStatus: -1,
            isRotate: false,
            clientWidth: document.documentElement.clientWidth || document.body.clientWidth,
            clientHeight: document.documentElement.clientHeight || document.body.clientHeight
        }
    },
    created() {},
    mounted() {

        const { id } = this.$route.query      
        const socket = new WebSocket(`ws://10.235.206.68:8181?channel=board&id=${id}`)
        socket.addEventListener('open', () => {
          console.log('connected')
        })

        var canvas = new createCanvas('canvas', {
            borderWidth: 10,
            writeWidth: 10,
            canvasWidth: 300,
            canvasHeight: 300,
            borderColor: '#ff6666',
            isWriteName: true //签名模式
        }, socket)
        
        const clearBtn = document.querySelector('#clear')
        const saveBtn = document.querySelector('#save')

        clearBtn.addEventListener('click', e => {
            canvas.option.control.clearCanvas()
            socket.send('clear')
        }, false)
        saveBtn.addEventListener('click', e => {
            canvas.saveAsImg()
        }, false)
    },
    methods: {
        handleTouchStart() {
            this.isRotate = true
        },
        handleTouchEnd() {
            this.isRotate = false
        },
        handleTouchMove(e) {
            const touch = e.changedTouches[0]

            let clientX = touch.clientX
            let clientY = touch.clientY

            
            const target = e.target
            console.log(clientX, clientY, target.offsetWidth, this.clientWidth)

            clientX = clientX <= 0 
                          ? 0 : clientX + target.offsetWidth >= this.clientWidth 
                                    ? this.clientWidth - target.offsetWidth
                                    : clientX
            
            clientY = clientY <= 0 
                          ? 0 : clientY + target.offsetHeight >= this.clientHeight
                                    ? this.clientHeight - target.offsetHeight
                                    : clientY

            target.style.left = clientX  +'px'
            target.style.top = clientY + 'px'
        },
        handleClick() {
            const status = this.showStatus
            if (status === 0 || status === -1) {
                this.showStatus = 1
            }else {
                this.showStatus = 0
            }
        }
    },
    computed: {},
    watch: {}
}