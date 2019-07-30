import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/userInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        name: 'lixiaohu'
    },
    modules: {
        userModule
    }
})

export default store