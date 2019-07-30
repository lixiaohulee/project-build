<template>
    <div class="stage">
        <div class="wrapper">
            <div class="item" v-for="(item, index) in items" :key="index.toString()" :style="init(index)">{{item}}</div>
        </div>
    </div>
</template>
<script>
import {lee} from '@/math'
// lee()
import test from '@/test'
// test()
const mainFunc = () => console.log(3333)
const arr = [...[12,3,4,56,'lee']]
mainFunc()
export default {
  name: "AboutMe",
  data() {
      return {
          items: [1,2,3,4,5,6,7,8,9]
      }
  },
  created() {
      lee()
      test()
  },
  methods: {
      init(index) {
          const raduis = 360 / this.items.length
          const r = 100 / Math.tan(raduis / 180 * Math.PI) + 170
          return {
            //   background: `#${333333 - index * 50}`,
              transform: `rotateX(${index * raduis}deg) translateZ(${r}px)`
          }
      }
  }
}
</script>
<style lang="less" scoped>
.stage {
    width: 200px;
    height: 200px;
    margin: 400px;
    background: red;
    perspective: 800px;
    .wrapper {
        width: 100%;
        height: 100%;
        background: yellow;
        transform-style: preserve-3d;
        position: relative;
        animation: rotate 4s infinite;
        .item {
            width: 100%;
            height: 100%;
            background: red;
            text-align: center;
            line-height: 200px;
            font-size: 30px;
            position: absolute;
            top: 0;
            left: 0;
            backface-visibility: hidden;
        }
        // & > :nth-child(1) {
        //     transform: rotateX(0deg) translateZ(120px);
        // }
        // & > :nth-child(2) {
        //     background: yellow;
        //     transform: rotateX(90deg) translateZ(120px);
        // }
        // & > :nth-child(3) {
        //     background: blue;
        //     transform: rotateX(180deg) translateZ(120px);
        // }
        // & > :nth-child(4) {
        //     background: green;
        //     transform: rotateX(270deg) translateZ(120px);
        // }
        //  & > :nth-child(5) {
        //     background: green;
        //     transform: rotateX(270deg) translateZ(120px);
        // }
    }
    @keyframes rotate {
        0% {
            transform: rotateX(0deg);
        }
        25% {
            transform: rotateX(90deg);
        }
        50% {
            transform: rotateX(180deg);
        }
        75% {
            transform: rotateX(270deg);
        }
        100% {
            transform: rotateX(360deg);
        }
    }
}
</style>

