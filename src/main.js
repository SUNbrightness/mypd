import Vue from 'vue'
import App from './App.vue'

import { Form,Field,Button,NavBar } from 'vant';
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Button);
Vue.use(Form);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
