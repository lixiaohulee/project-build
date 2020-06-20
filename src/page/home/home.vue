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
                        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="onMenuSelect">
                            <!-- <div class="layout-logo"></div> -->
                            <div class="layout-nav">
                                <MenuItem name="1">
                                    <Icon type="ios-navigate"></Icon>
                                    发布
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
             <Modal
                v-model="createShow"
                title="创建交易信息"
                width="750"
                @on-ok="onModalOk"
                @on-cancel="onModalCancel">
                <Form ref="goodsForm" :model="goodsForm" :rules="ruleValidate" :label-width="80">
                    <FormItem label="名称" prop="name">
                        <Input v-model="goodsForm.name" placeholder="请输入物品名称"></Input>
                    </FormItem>
                    <FormItem label="类型" prop="type">
                        <Select v-model="goodsForm.type" placeholder="请选择物品类型">
                            <Option value="furniture">家具家电</Option>
                            <Option value="digital">数码电子</Option>
                            <Option value="clothing">箱包服饰</Option>
                            <Option value="sports">运动图书</Option>
                            <Option value="other">其他</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="形式" prop="mode">
                        <Select v-model="goodsForm.mode" placeholder="请选择交易形式">
                            <Option value="sell">转让</Option>
                            <Option value="bug">求购</Option>
                            <Option value="exchange">交换</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="价格" prop="prize">
                        <Input v-model="goodsForm.prize" placeholder="请输入物品价格"></Input>
                    </FormItem>
                    <FormItem label="联系方式" prop="contact">
                        <Input v-model="goodsForm.contact" placeholder="请输入联系方式"></Input>
                    </FormItem>
                    <FormItem label="描述" prop="desc">
                        <Input v-model="goodsForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入物品的详情"></Input>
                    </FormItem>
                    <FormItem>
                        <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index.toString()">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload
                            ref="upload"
                            :headers="uploadHeaders"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            action="http://localhost:3000/upload"
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal title="View Image" v-model="visible">
                            <img :src="imgName" v-if="visible" style="width: 100%">
                        </Modal>
                    </FormItem>
                </Form>
            </Modal>
        </template>
    </section>
</template>
<script src="./home.js" type="text/ecmascript-6"></script>
<style lang="less" src="./home.less" rel="stylesheet/less"></style>
<style lang="less">
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
