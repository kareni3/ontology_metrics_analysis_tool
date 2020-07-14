import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import Clipboard from 'v-clipboard'
Vue.use(Clipboard)
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false
Vue.config.devtools = true;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
