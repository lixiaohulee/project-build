/**
 * @file interceptor.js
 * @author lixiaohu(lixiaohu_neuq@163.com)
 */

import axios from 'axios'

//请求前置拦截器
axios.interceptors.request.use(config => {
    const method = config.method
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
        config.data = JSON.stringify(data)
    }

    return config
}, error => {
    return Promise.reject(error)
})

//请求后置拦截器
axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})
