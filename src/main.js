import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../utils/mock'

import './index.less'

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})