/**
 * @file mock.js
 * @author lixiaohu(lixiaohu_neuq@163.com)
 */
import Mock from 'mockjs'
import mockMap from '../config/mockMap'

Object.keys(mockMap).forEach(key => {
    if (mockMap[key].enable) {
        let reg = new RegExp(key)
        Mock.mock(reg, mockMap[key].data)
    }
})