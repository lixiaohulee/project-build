/**
 * @file mockMap.js
 * @author lixiaohu(lixiaohu_neuq@163.com)
 */

export default {
    '/api/testApi': {
        enable: true,
        data: {
            "code": 200,
            "msg": 'success',
            "list|20": [
                {
                    "nickname": 'lixiaohu',
                    "age|+1": 1
                }
            ]
        }
    }
}