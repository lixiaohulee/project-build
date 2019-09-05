/**
 * @file apify.js
 * @author lixiaohu(lixiaohu_neuq@163.com)
 */

import request from './request'

export default function(apis = Object.create(null)) {
    Object.keys(apis).forEach(key => {
        const origin = apis[key]
        apis[key] = reqConf => request(origin, reqConf)
    })
    return apis
}




