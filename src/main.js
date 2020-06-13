import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'view-design/dist/styles/iview.css'
import { Message } from 'view-design'
// import '../utils/mock'
// import 'utils/eruda'
import './index.less'

Vue.prototype.$Message = Message
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})