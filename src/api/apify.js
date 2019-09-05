/**
 * @file apify.js
 * @author lixiaohu(lixiaohu_neuq@163.com)
 */

import request from './request'

export default function(apis = Object.create(null)) {
    Object.keys(apis).forEach(key => {
        apis[key] = reqConf => request(reqConf)
    })
}




