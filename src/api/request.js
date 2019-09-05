/**
 * @file request.js
 * @author lixiaohu(lixiaohu_neuq@163.com)
 */

import axios from 'axios'
import interceptor from './interceptor'

axios.defaults.baseURL = ''
axios.defaults.method = 'post'
axios.defaults.timeout = 1000 * 60

export default function(url, reqConf = Object.create(null)) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            ...reqConf
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
