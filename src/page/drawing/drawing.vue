<!--
@file drawing.value
@author lixiaohu
@since 2019-10-22 10:26:20
-->
<template>
    <section class="drawing-wrapper" @touchmove.prevent>
        <canvas id="canvas" width="300" height="300" style=" position: fixed; left: 0; top: 0;">
            您的浏览器不支持canvas技术,请升级浏览器!
        </canvas>
        <img src="./img/test1.jpg" alt="" width="300" height="300">
        <div style="text-align: center">
            <span id="clear">清空</span>
            <span id="save">保存</span>
        </div>
        <img class="suspension-ball" :class="{'rotate': isRotate}"  src="./img/process.png" @touchmove="handleTouchMove($event)" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @click="handleClick"></img>
        <div class="slide" :class="{'show-slide': showStatus === 1, 'hide-slide': showStatus === 0}"></div>
    </section>
</template>
<script src="./drawing.js" type="text/ecmascript-6"></script>
<style lang="less" src="./drawing.less" rel="stylesheet/less" scoped></style>