import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import {post} from './api/https'
import {dexGet, dexPost} from './api/dexHttps'

Vue.config.productionTip = false;
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$dexGet = dexGet;
Vue.prototype.$dexPost = dexPost;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
