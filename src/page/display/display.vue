<!--
@file display.value
@author lixiaohu
@since 2019-10-22 10:33:35
-->
<template>
    <section class="display-wrapper">
        <canvas id="canvas" width="300" height="300" style="border: 1px solid #ccc; margin: auto; display: block; position: fixed; left: 0; top: 0; right: 0; bottom: 0;">
            您的浏览器不支持canvas技术,请升级浏览器!
        </canvas>
        <img src="./test1.jpg" alt="" width="600" height="600" style="position: fixed; left: 0; top: 0; right: 0; bottom: 0; margin: auto; z-index: -100;">
    </section>
</template>
<script src="./display.js" type="text/ecmascript-6"></script>
<style lang="less" src="./display.less" rel="stylesheet/less" scoped></style>