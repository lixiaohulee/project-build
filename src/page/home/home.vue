<!--
@file home.value
@author 李小虎
@since 2020-6-12 14:44:27
-->
<template>
    <section class="home-wrapper">
        <template>
            <div class="layout">
                <Layout>
                    <Header>
                        <Menu mode="horizontal" theme="dark" active-name="1">
                            <!-- <div class="layout-logo"></div> -->
                            <div class="layout-nav">
                                <MenuItem name="1">
                                    <Icon type="ios-navigate"></Icon>
                                    Item 1
                                </MenuItem>
                                <MenuItem name="2">
                                    <Icon type="ios-keypad"></Icon>
                                    Item 2
                                </MenuItem>
                                <MenuItem name="3">
                                    <Icon type="ios-analytics"></Icon>
                                    Item 3
                                </MenuItem>
                                <MenuItem name="4">
                                    <Icon type="ios-paper"></Icon>
                                    Item 4
                                </MenuItem>
                            </div>
                        </Menu>
                    </Header>
                    <Content :style="{margin: '20px 20px 0', background: '#fff', flex: 1}">
                        <div class="card-wrapper">
                            <Card style="width:310px" v-for="i in 10" :key="i.toString()" class="card">
                                <div style="text-align:center">
                                    <img src="./img/logo.png">
                                    <h3>A high quality UI Toolkit based on Vue.js</h3>
                                </div>
                            </Card>
                        </div>
                    </Content>
                    <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
                </Layout>
            </div>
        </template>
    </section>
</template>
<script src="./home.js" type="text/ecmascript-6"></script>
<style lang="less" src="./home.less" rel="stylesheet/less" scoped></style>