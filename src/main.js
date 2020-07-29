import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { Form,Field,Button,NavBar,Notify,
Search,Sidebar, SidebarItem,Col,
 Row,SwipeCell,Cell, CellGroup,Icon,Dialog } from 'vant';
 
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Button);
Vue.use(Form);
Vue.use(Notify);
Vue.use(Search);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(SwipeCell);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Dialog);
// 全局注册
import webDav from '@/common/webDav.js';
Vue.use(webDav);

var md5 = require('md5');
Vue.prototype.md5=md5;
import { EventBus } from '@/common/EventBus.js';
Vue.prototype.EventBus=EventBus;

//复制到剪切板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


//加载全局常量
import '@/common/global.js';






Vue.config.productionTip = false
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
