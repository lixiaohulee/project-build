<!--
@file aboutMe.value
@author lixiaohu
@since 2019-10-11 15:53:57
-->
<template>
    <section class="aboutMe-wrapper">
        <img src="./img/back.png" alt="back" @click="handleBack" class="back">
        <div class="form-wrapper">
            <input type="text" v-model="username" class="username" placeholder="请输入您的姓名">
            <textarea type="text" v-model="blessing" class="blessing" placeholder="请输入您的祝福语"></textarea>
            <div class="send" @click="handleSend">送祝福</div>
        </div>
    </section>
</template>
<script src="./aboutMe.js" type="text/ecmascript-6"></script>
<style lang="less" src="./aboutMe.less" rel="stylesheet/less" scoped></style>