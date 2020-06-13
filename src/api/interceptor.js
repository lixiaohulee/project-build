/**
 * @file interceptor.js
 * @author lixiaohu(lixiaohu_neuq@163.com)
 */

import axios from 'axios'
import router from 'vue-router'

//请求前置拦截器
axios.interceptors.request.use(config => {
    const method = config.method
    const headers = {
        token: localStorage.getItem('token')
    }
    if (method === 'get') {
        let params = {
            ...config.params
        }
        config.params = params
    }

    if (method === 'post') {
        let data = {
            ...config.data
        }
        config.data = data
    }

    config.headers = headers

    return config
}, error => {
    return Promise.reject(error)
})

//请求后置拦截器
axios.interceptors.response.use(response => {
    if (response.status === 200) {
        if (response.data.code === 401) {
            window.location.href = window.location.origin + '/login'
        }
        return response.data
    }
}, error => {
    return Promise.reject(error)
})
