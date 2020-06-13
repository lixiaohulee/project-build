<!--
@file login.value
@author 李小虎
@since 2020-6-5 14:39:11
-->
<template>
    <section class="login-wrapper">
        <Card class="card">
            <h3 class="title">欢迎使用左邻右舍</h3>
            <Form ref="loginForm" :model="loginForm" :rules="rulesLogin">
                <FormItem prop="account">
                    <Input type="text" v-model="loginForm.account" placeholder="请输入手机号" size="large">
                        <Icon type="md-phone-portrait" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="loginForm.password" placeholder="请输入密码" size="large">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" long @click="handleLogin">登录</Button>
                </FormItem>
            </Form>
            <p class="no-account" @click="handleNoAccount">还没有账号？快去注册吧！我的邻居<Icon type="md-arrow-round-forward" /></p>
        </Card>
    </section>
</template>
<script src="./login.js" type="text/ecmascript-6"></script>
<style lang="less" src="./login.less" rel="stylesheet/less" scoped></style>