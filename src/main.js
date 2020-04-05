import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import PLAYER from '@/common/index.js'

// axios.defaults.baseURL = '/apis'
Vue.config.productionTip = false
// Vue.use(PLAYER)
Vue.prototype.PLAYER = PLAYER
Vue.prototype.axios = axios

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
