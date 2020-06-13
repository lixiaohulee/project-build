<!--
@file register.value
@author 李小虎
@since 2020-6-5 16:19:53
-->
<template>
    <section class="register-wrapper">
        <Card class="card">
            <h3 class="title">欢迎使用左邻右舍</h3>
            <Form ref="registerForm" :model="registerForm" :rules="rulesRegister">
                <FormItem prop="account">
                    <Input type="text" v-model="registerForm.account" placeholder="请输入手机号" size="large">
                        <Icon type="md-phone-portrait" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="registerForm.password" placeholder="请输入密码" size="large">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="confirmPassword">
                    <Input type="password" v-model="registerForm.confirmPassword" placeholder="请再次输入密码" size="large">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" long @click="handleRegister">注册</Button>
                </FormItem>
            </Form>
            <p class="already-register" @click="handleAlreadyRegister">已有账号？快去登录吧！我的邻居<Icon type="md-arrow-round-forward" /></p>
        </Card>
    </section>
</template>
<script src="./register.js" type="text/ecmascript-6"></script>
<style lang="less" src="./register.less" rel="stylesheet/less" scoped></style>