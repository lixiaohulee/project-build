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
    mounted() {
        const arr = [3,2,3,4,6,5]
        arr.sort((pre,next) => pre - next)
        console.log(arr)

        // arr.forEach((num, index) => console.log(num, index))

        // const findErrorNums = function (nums) {
        //     // Write your code here
        //     let repeatNum
        //     let lackNum
            
        //     nums.sort((pre, next) => pre - next)
            
        //     nums.forEach((num, index) => {
        //         console.log(1111111, num, index)
        //         if (num !== index + 1) {
        //             console.log(num, index + 1)
        //             repeatNum = num
        //             lackNum = index +1
        //             console.log(repeatNum, lackNum, 5555555)
        //             break
        //         }
        //     })
            
        //     return [repeatNum, lackNum]
        // }

        // findErrorNums() ``

        // console.log(findErrorNums(arr))

    },
    methods: {},
    computed: {
    },
    watch: {}
}