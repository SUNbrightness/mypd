import Vue from 'vue'
import App from './App.vue'

import { Form,Field,Button,NavBar,Notify } from 'vant';
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Button);
Vue.use(Form);
// 全局注册
Vue.use(Notify);

import webDav from '@/common/webDav.js';
Vue.use(webDav);

var md5 = require('md5');
Vue.prototype.md5=md5;

//加载全局常量
import '@/common/global.js';




Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
