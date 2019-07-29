/**
 * @file router/index
 * @author lixiaohu(lixiaohu_neuq@163.com)
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routerfy from './routerfy'

Vue.use(VueRouter)

const router = new VueRouter(routerfy)
export default router